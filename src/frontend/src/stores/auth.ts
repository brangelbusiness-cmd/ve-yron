import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OTPSession {
  identifier: string;
  code: string;
  sentAt: number;
  type: "phone" | "email";
}

interface AuthStore {
  isLoggedIn: boolean;
  phone: string | null;
  email: string | null;
  loginMethod: "phone" | "email" | null;
  otpSession: OTPSession | null;
  sendOTP: (phone: string) => void;
  verifyOTP: (phone: string, code: string) => boolean;
  sendEmailOTP: (email: string) => void;
  verifyEmailOTP: (email: string, code: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      phone: null,
      email: null,
      loginMethod: null,
      otpSession: null,

      sendOTP: (phone) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        console.info(`[VE YRON] OTP for ${phone}: ${code}`);
        set({
          otpSession: {
            identifier: phone,
            code,
            sentAt: Date.now(),
            type: "phone",
          },
        });
      },

      verifyOTP: (phone, code) => {
        const session = get().otpSession;
        const valid =
          code.length === 6 &&
          /^\d{6}$/.test(code) &&
          (!session || session.identifier === phone);
        if (valid) {
          set({
            isLoggedIn: true,
            phone,
            loginMethod: "phone",
            otpSession: null,
          });
          return true;
        }
        return false;
      },

      sendEmailOTP: (email) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        console.info(`[VE YRON] Email OTP for ${email}: ${code}`);
        set({
          otpSession: {
            identifier: email,
            code,
            sentAt: Date.now(),
            type: "email",
          },
        });
      },

      verifyEmailOTP: (email, code) => {
        const session = get().otpSession;
        const valid =
          code.length === 6 &&
          /^\d{6}$/.test(code) &&
          (!session || session.identifier === email);
        if (valid) {
          set({
            isLoggedIn: true,
            email,
            loginMethod: "email",
            otpSession: null,
          });
          return true;
        }
        return false;
      },

      logout: () =>
        set({
          isLoggedIn: false,
          phone: null,
          email: null,
          loginMethod: null,
          otpSession: null,
        }),
    }),
    {
      name: "veyron-auth",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        phone: state.phone,
        email: state.email,
        loginMethod: state.loginMethod,
      }),
    },
  ),
);
