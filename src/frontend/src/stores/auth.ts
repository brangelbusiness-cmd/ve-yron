import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── OTP Session (stored in sessionStorage only — ephemeral) ─────────────────

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

interface OTPSession {
  identifier: string;
  hashedCode: string; // SHA-256 hex of the real code
  sentAt: number;
  type: "phone" | "email";
  attempts: number;
}

// ─── User Registry (stored in localStorage) ──────────────────────────────────

interface UserProfile {
  name: string;
  identifier: string; // phone or email
  type: "phone" | "email";
  createdAt: string;
}

type UserRegistry = Record<string, UserProfile>; // key = identifier

function getRegistry(): UserRegistry {
  try {
    return JSON.parse(
      localStorage.getItem("veyron-users") ?? "{}",
    ) as UserRegistry;
  } catch {
    return {};
  }
}

function saveToRegistry(profile: UserProfile) {
  const reg = getRegistry();
  reg[profile.identifier] = profile;
  localStorage.setItem("veyron-users", JSON.stringify(reg));
}

function isReturningUser(identifier: string): boolean {
  return !!getRegistry()[identifier];
}

function getUserName(identifier: string): string {
  return getRegistry()[identifier]?.name ?? "";
}

// ─── Cryptographic OTP ───────────────────────────────────────────────────────

async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateOTP(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(100000 + (arr[0] % 900000));
}

function saveOTPSession(session: OTPSession) {
  sessionStorage.setItem("veyron-otp", JSON.stringify(session));
}

function loadOTPSession(): OTPSession | null {
  try {
    const raw = sessionStorage.getItem("veyron-otp");
    if (!raw) return null;
    return JSON.parse(raw) as OTPSession;
  } catch {
    return null;
  }
}

function clearOTPSession() {
  sessionStorage.removeItem("veyron-otp");
}

// ─── Store Interface ──────────────────────────────────────────────────────────

interface AuthStore {
  isLoggedIn: boolean;
  phone: string | null;
  email: string | null;
  name: string | null;
  loginMethod: "phone" | "email" | null;
  /** Resolves to the plaintext OTP code (for display as toast simulation) */
  sendOTP: (phone: string) => Promise<string>;
  /** Returns 'ok' | 'invalid' | 'expired' | 'max_attempts' */
  verifyOTP: (
    phone: string,
    code: string,
    name?: string,
  ) => Promise<"ok" | "invalid" | "expired" | "max_attempts">;
  sendEmailOTP: (email: string) => Promise<string>;
  verifyEmailOTP: (
    email: string,
    code: string,
    name?: string,
  ) => Promise<"ok" | "invalid" | "expired" | "max_attempts">;
  isReturningUser: (identifier: string) => boolean;
  getUserName: (identifier: string) => string;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      phone: null,
      email: null,
      name: null,
      loginMethod: null,

      sendOTP: async (phone) => {
        const code = generateOTP();
        const hashedCode = await sha256Hex(code);
        const session: OTPSession = {
          identifier: phone,
          hashedCode,
          sentAt: Date.now(),
          type: "phone",
          attempts: 0,
        };
        saveOTPSession(session);
        return code; // returned to UI to show as toast
      },

      verifyOTP: async (phone, code, name) => {
        const session = loadOTPSession();
        if (
          !session ||
          session.identifier !== phone ||
          session.type !== "phone"
        ) {
          return "invalid";
        }
        if (Date.now() - session.sentAt > OTP_EXPIRY_MS) {
          clearOTPSession();
          return "expired";
        }
        if (session.attempts >= 5) {
          return "max_attempts";
        }
        const inputHash = await sha256Hex(code);
        if (inputHash !== session.hashedCode) {
          session.attempts += 1;
          saveOTPSession(session);
          return "invalid";
        }
        // Valid — register/update user
        const userName = name ?? getUserName(phone);
        saveToRegistry({
          name: userName,
          identifier: phone,
          type: "phone",
          createdAt: new Date().toISOString(),
        });
        clearOTPSession();
        set({
          isLoggedIn: true,
          phone,
          name: userName,
          loginMethod: "phone",
          email: null,
        });
        return "ok";
      },

      sendEmailOTP: async (email) => {
        const code = generateOTP();
        const hashedCode = await sha256Hex(code);
        const session: OTPSession = {
          identifier: email,
          hashedCode,
          sentAt: Date.now(),
          type: "email",
          attempts: 0,
        };
        saveOTPSession(session);
        return code;
      },

      verifyEmailOTP: async (email, code, name) => {
        const session = loadOTPSession();
        if (
          !session ||
          session.identifier !== email ||
          session.type !== "email"
        ) {
          return "invalid";
        }
        if (Date.now() - session.sentAt > OTP_EXPIRY_MS) {
          clearOTPSession();
          return "expired";
        }
        if (session.attempts >= 5) {
          return "max_attempts";
        }
        const inputHash = await sha256Hex(code);
        if (inputHash !== session.hashedCode) {
          session.attempts += 1;
          saveOTPSession(session);
          return "invalid";
        }
        const userName = name ?? getUserName(email);
        saveToRegistry({
          name: userName,
          identifier: email,
          type: "email",
          createdAt: new Date().toISOString(),
        });
        clearOTPSession();
        set({
          isLoggedIn: true,
          email,
          name: userName,
          loginMethod: "email",
          phone: null,
        });
        return "ok";
      },

      isReturningUser,
      getUserName,

      logout: () =>
        set({
          isLoggedIn: false,
          phone: null,
          email: null,
          name: null,
          loginMethod: null,
        }),
    }),
    {
      name: "veyron-auth",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        phone: state.phone,
        email: state.email,
        name: state.name,
        loginMethod: state.loginMethod,
      }),
    },
  ),
);
