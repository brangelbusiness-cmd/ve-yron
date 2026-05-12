import { useAuthStore } from "@/stores/auth";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type LoginMethod = "phone" | "email";
type LoginStep = "choose" | "input" | "otp";

function maskPhone(phone: string): string {
  if (phone.length <= 4) return `+91 ${phone}`;
  return `+91 ****${phone.slice(-4)}`;
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const maskedUser =
    user.length <= 2
      ? user
      : `${user.slice(0, 2)}${"*".repeat(Math.min(user.length - 2, 4))}`;
  return `${maskedUser}@${domain}`;
}

/* ── 6-Box OTP Input ────────────────────────────────── */
function OtpBoxes({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function handleKey(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !refs.current[idx]?.value && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  }

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = value.split("").slice(0, 6);
    arr[idx] = char;
    const next = arr.join("").slice(0, 6);
    onChange(next);
    if (char && idx < 5) {
      refs.current[idx + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      onChange(pasted);
      refs.current[5]?.focus();
    }
    e.preventDefault();
  }

  return (
    <div className="flex gap-2 justify-center">
      {["d0", "d1", "d2", "d3", "d4", "d5"].map((key, idx) => (
        <input
          key={key}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] ?? ""}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKey(idx, e)}
          onPaste={handlePaste}
          className="w-11 h-12 text-center text-lg font-mono font-bold bg-background border border-border rounded-sm text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card focus:border-primary
            transition-colors duration-150 caret-transparent select-none min-h-[44px]"
          data-ocid={`login.otp_box.${idx + 1}`}
        />
      ))}
    </div>
  );
}

/* ── Resend Timer ───────────────────────────────────── */
function ResendTimer({ onResend }: { onResend: () => void }) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  if (seconds > 0) {
    return (
      <p className="text-center text-xs text-muted-foreground">
        Resend code in{" "}
        <span className="font-semibold text-foreground tabular-nums">
          00:{String(seconds).padStart(2, "0")}
        </span>
      </p>
    );
  }

  return (
    <p className="text-center text-xs text-muted-foreground">
      Didn't receive it?{" "}
      <button
        type="button"
        onClick={() => {
          setSeconds(30);
          onResend();
        }}
        className="text-primary font-semibold hover:underline focus-visible:underline"
        data-ocid="login.resend_code_button"
      >
        Resend OTP
      </button>
    </p>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { returnUrl?: string };
  const returnUrl = search.returnUrl ?? "/checkout";

  const { isLoggedIn, sendOTP, verifyOTP, sendEmailOTP, verifyEmailOTP } =
    useAuthStore();

  const [step, setStep] = useState<LoginStep>("choose");
  const [method, setMethod] = useState<LoginMethod>("phone");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate({ to: returnUrl as "/" });
  }, [isLoggedIn, navigate, returnUrl]);

  function selectMethod(m: LoginMethod) {
    setMethod(m);
    setStep("input");
    setPhone("");
    setEmail("");
    setPhoneError("");
    setEmailError("");
    setOtp("");
    setOtpError("");
    setOtpSent(false);
  }

  function goBack() {
    if (step === "otp") {
      setStep("input");
      setOtp("");
      setOtpError("");
    } else {
      setStep("choose");
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (phoneError) setPhoneError("");
  }

  function handleSendPhoneOTP(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }
    sendOTP(phone);
    setOtpSent(true);
    setOtp("");
    setStep("otp");
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.trim());
    if (emailError) setEmailError("");
  }

  function handleSendEmailOTP(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    sendEmailOTP(email);
    setOtpSent(true);
    setOtp("");
    setStep("otp");
  }

  function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }
    const success =
      method === "phone" ? verifyOTP(phone, otp) : verifyEmailOTP(email, otp);
    if (success) {
      navigate({ to: returnUrl as "/" });
    } else {
      setOtpError("Invalid code. Please try again.");
    }
  }

  function handleResend() {
    setOtpError("");
    setOtp("");
    if (method === "phone") {
      sendOTP(phone);
    } else {
      sendEmailOTP(email);
    }
  }

  const maskedIdentifier =
    method === "phone" ? maskPhone(phone) : maskEmail(email);

  useEffect(() => {
    document.title = "Sign In | VE YRON";
  }, []);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
      data-ocid="login.page"
    >
      <div className="w-full max-w-sm">
        {/* Brand Mark */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display font-black uppercase tracking-[0.3em] text-2xl text-foreground">
            VE YRON
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Premium Activewear
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-card border border-border rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {/* Gold accent bar */}
          <div className="h-[3px] w-full bg-primary" />

          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {/* ── STEP: CHOOSE METHOD ───────────────────────────── */}
              {step === "choose" && (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  <div className="text-center mb-8">
                    <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                      Sign In
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Sign in to place your order
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Mobile */}
                    <button
                      type="button"
                      onClick={() => selectMethod("phone")}
                      className="btn-luxury w-full flex items-center justify-center gap-3 min-h-[52px] text-sm"
                      data-ocid="login.choose_phone_button"
                    >
                      <Phone size={16} />
                      MOBILE NUMBER
                    </button>

                    {/* Email */}
                    <button
                      type="button"
                      onClick={() => selectMethod("email")}
                      className="w-full flex items-center justify-center gap-3 min-h-[52px] text-sm font-bold uppercase tracking-widest
                        border border-border rounded-sm text-foreground bg-background
                        hover:border-primary/60 hover:bg-muted/30 transition-all duration-200"
                      data-ocid="login.choose_email_button"
                    >
                      <Mail size={16} />
                      EMAIL ADDRESS
                    </button>
                  </div>

                  <p className="mt-8 text-center text-[11px] text-muted-foreground leading-relaxed">
                    By continuing, you agree to our{" "}
                    <a
                      href="/policies"
                      className="text-foreground/70 underline underline-offset-2 hover:text-foreground transition-colors"
                    >
                      Policies
                    </a>
                  </p>
                </motion.div>
              )}

              {/* ── STEP: INPUT ───────────────────────────────────── */}
              {step === "input" && (
                <motion.div
                  key={`input-${method}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
                    data-ocid="login.back_button"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  {method === "phone" ? (
                    <>
                      <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                        Mobile Number
                      </h2>
                      <p className="text-sm text-muted-foreground mb-8">
                        Enter your 10-digit mobile number
                      </p>

                      <form onSubmit={handleSendPhoneOTP} noValidate>
                        <div className="mb-6">
                          <label
                            htmlFor="phone-input"
                            className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2"
                          >
                            Mobile Number
                          </label>
                          <div
                            className="flex items-stretch border border-border rounded-sm overflow-hidden
                              focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
                              focus-within:ring-offset-card transition-all duration-150"
                          >
                            <span
                              className="flex items-center gap-1.5 pl-3 pr-3 bg-muted text-muted-foreground
                              text-sm font-semibold border-r border-border shrink-0 select-none"
                            >
                              <Phone size={14} />
                              +91
                            </span>
                            <input
                              id="phone-input"
                              type="tel"
                              inputMode="numeric"
                              placeholder="10-digit number"
                              value={phone}
                              onChange={handlePhoneChange}
                              className="flex-1 bg-transparent text-foreground px-3 py-3 text-sm outline-none min-h-[44px] placeholder:text-muted-foreground"
                              data-ocid="login.phone_input"
                            />
                          </div>
                          {phoneError && (
                            <p
                              className="mt-2 text-xs text-destructive-foreground bg-destructive/10 px-3 py-1.5 rounded-sm"
                              data-ocid="login.phone_field_error"
                            >
                              {phoneError}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn-luxury w-full flex items-center justify-center min-h-[48px] text-sm"
                          data-ocid="login.send_otp_button"
                        >
                          SEND OTP
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                        Email Address
                      </h2>
                      <p className="text-sm text-muted-foreground mb-8">
                        Enter your email to receive a login code
                      </p>

                      <form onSubmit={handleSendEmailOTP} noValidate>
                        <div className="mb-6">
                          <label
                            htmlFor="email-input"
                            className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2"
                          >
                            Email Address
                          </label>
                          <div
                            className="flex items-stretch border border-border rounded-sm overflow-hidden
                              focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
                              focus-within:ring-offset-card transition-all duration-150"
                          >
                            <span
                              className="flex items-center gap-1.5 pl-3 pr-3 bg-muted text-muted-foreground
                              text-sm font-semibold border-r border-border shrink-0 select-none"
                            >
                              <Mail size={14} />
                            </span>
                            <input
                              id="email-input"
                              type="email"
                              inputMode="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={handleEmailChange}
                              className="flex-1 bg-transparent text-foreground px-3 py-3 text-sm outline-none min-h-[44px] placeholder:text-muted-foreground"
                              data-ocid="login.email_input"
                            />
                          </div>
                          {emailError && (
                            <p
                              className="mt-2 text-xs text-destructive-foreground bg-destructive/10 px-3 py-1.5 rounded-sm"
                              data-ocid="login.email_field_error"
                            >
                              {emailError}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn-luxury w-full flex items-center justify-center min-h-[48px] text-sm"
                          data-ocid="login.send_email_otp_button"
                        >
                          SEND CODE
                        </button>
                      </form>
                    </>
                  )}
                </motion.div>
              )}

              {/* ── STEP: OTP VERIFY ─────────────────────────────── */}
              {step === "otp" && (
                <motion.div
                  key={`otp-${method}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
                    data-ocid="login.back_button"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  <div className="text-center mb-8">
                    <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                      Verify Code
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Enter the 6-digit code sent to
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-1 truncate">
                      {maskedIdentifier}
                    </p>
                  </div>

                  {otpSent && (
                    <div
                      className="mb-5 flex items-center gap-2 bg-success/10 text-success px-3 py-2.5 rounded-sm text-xs justify-center"
                      data-ocid="login.otp_sent_success"
                    >
                      <span className="font-bold">&#10003;</span>
                      <span>Code sent successfully</span>
                    </div>
                  )}

                  <form onSubmit={handleVerifyOTP} noValidate>
                    <div className="mb-6">
                      <OtpBoxes value={otp} onChange={setOtp} />
                      {otpError && (
                        <p
                          className="mt-3 text-xs text-destructive-foreground bg-destructive/10 px-3 py-1.5 rounded-sm text-center"
                          data-ocid="login.otp_field_error"
                        >
                          {otpError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-luxury w-full flex items-center justify-center min-h-[48px] text-sm mb-4"
                      data-ocid="login.verify_otp_button"
                    >
                      VERIFY &amp; SIGN IN
                    </button>
                  </form>

                  <ResendTimer onResend={handleResend} />

                  {/* Demo note */}
                  <p className="mt-5 text-center text-[11px] text-muted-foreground/60 leading-relaxed">
                    Demo mode: enter any 6-digit code to continue
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} VE YRON. All rights reserved.
        </p>
      </div>
    </div>
  );
}
