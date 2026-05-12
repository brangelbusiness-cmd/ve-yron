import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as useNavigate, u as useSearch, E as useAuthStore, H as Mail } from "./index-DctbPH3p.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-Cno1h6QO.js";
import { A as ArrowLeft } from "./arrow-left-B8B3Fy54.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function maskPhone(phone) {
  if (phone.length <= 4) return `+91 ${phone}`;
  return `+91 ****${phone.slice(-4)}`;
}
function maskEmail(email) {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const maskedUser = user.length <= 2 ? user : `${user.slice(0, 2)}${"*".repeat(Math.min(user.length - 2, 4))}`;
  return `${maskedUser}@${domain}`;
}
function OtpBoxes({
  value,
  onChange
}) {
  const refs = reactExports.useRef([]);
  function handleKey(idx, e) {
    var _a, _b;
    if (e.key === "Backspace" && !((_a = refs.current[idx]) == null ? void 0 : _a.value) && idx > 0) {
      (_b = refs.current[idx - 1]) == null ? void 0 : _b.focus();
    }
  }
  function handleChange(idx, e) {
    var _a;
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = value.split("").slice(0, 6);
    arr[idx] = char;
    const next = arr.join("").slice(0, 6);
    onChange(next);
    if (char && idx < 5) {
      (_a = refs.current[idx + 1]) == null ? void 0 : _a.focus();
    }
  }
  function handlePaste(e) {
    var _a;
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      onChange(pasted);
      (_a = refs.current[5]) == null ? void 0 : _a.focus();
    }
    e.preventDefault();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center", children: ["d0", "d1", "d2", "d3", "d4", "d5"].map((key, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref: (el) => {
        refs.current[idx] = el;
      },
      type: "text",
      inputMode: "numeric",
      maxLength: 1,
      value: value[idx] ?? "",
      onChange: (e) => handleChange(idx, e),
      onKeyDown: (e) => handleKey(idx, e),
      onPaste: handlePaste,
      className: "w-11 h-12 text-center text-lg font-mono font-bold bg-background border border-border rounded-sm text-foreground\n            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card focus:border-primary\n            transition-colors duration-150 caret-transparent select-none min-h-[44px]",
      "data-ocid": `login.otp_box.${idx + 1}`
    },
    key
  )) });
}
function ResendTimer({ onResend }) {
  const [seconds, setSeconds] = reactExports.useState(30);
  reactExports.useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1e3);
    return () => clearTimeout(id);
  }, [seconds]);
  if (seconds > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
      "Resend code in",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground tabular-nums", children: [
        "00:",
        String(seconds).padStart(2, "0")
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
    "Didn't receive it?",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          setSeconds(30);
          onResend();
        },
        className: "text-primary font-semibold hover:underline focus-visible:underline",
        "data-ocid": "login.resend_code_button",
        children: "Resend OTP"
      }
    )
  ] });
}
function Login() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const returnUrl = search.returnUrl ?? "/checkout";
  const { isLoggedIn, sendOTP, verifyOTP, sendEmailOTP, verifyEmailOTP } = useAuthStore();
  const [step, setStep] = reactExports.useState("choose");
  const [method, setMethod] = reactExports.useState("phone");
  const [phone, setPhone] = reactExports.useState("");
  const [phoneError, setPhoneError] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [otpError, setOtpError] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isLoggedIn) navigate({ to: returnUrl });
  }, [isLoggedIn, navigate, returnUrl]);
  function selectMethod(m) {
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
  function handlePhoneChange(e) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (phoneError) setPhoneError("");
  }
  function handleSendPhoneOTP(e) {
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
  function handleEmailChange(e) {
    setEmail(e.target.value.trim());
    if (emailError) setEmailError("");
  }
  function handleSendEmailOTP(e) {
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
  function handleVerifyOTP(e) {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }
    const success = method === "phone" ? verifyOTP(phone, otp) : verifyEmailOTP(email, otp);
    if (success) {
      navigate({ to: returnUrl });
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
  const maskedIdentifier = method === "phone" ? maskPhone(phone) : maskEmail(email);
  reactExports.useEffect(() => {
    document.title = "Sign In | VE YRON";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center px-4 py-12",
      "data-ocid": "login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-10",
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black uppercase tracking-[0.3em] text-2xl text-foreground", children: "VE YRON" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Premium Activewear" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "bg-card border border-border rounded-lg shadow-xl overflow-hidden",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[3px] w-full bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 sm:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                step === "choose" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -10 },
                    transition: { duration: 0.22, ease: "easeInOut" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Sign In" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to place your order" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => selectMethod("phone"),
                            className: "btn-luxury w-full flex items-center justify-center gap-3 min-h-[52px] text-sm",
                            "data-ocid": "login.choose_phone_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
                              "MOBILE NUMBER"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => selectMethod("email"),
                            className: "w-full flex items-center justify-center gap-3 min-h-[52px] text-sm font-bold uppercase tracking-widest\n                        border border-border rounded-sm text-foreground bg-background\n                        hover:border-primary/60 hover:bg-muted/30 transition-all duration-200",
                            "data-ocid": "login.choose_email_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 }),
                              "EMAIL ADDRESS"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-center text-[11px] text-muted-foreground leading-relaxed", children: [
                        "By continuing, you agree to our",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: "/policies",
                            className: "text-foreground/70 underline underline-offset-2 hover:text-foreground transition-colors",
                            children: "Policies"
                          }
                        )
                      ] })
                    ]
                  },
                  "choose"
                ),
                step === "input" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 16 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -16 },
                    transition: { duration: 0.22, ease: "easeInOut" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: goBack,
                          className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6",
                          "data-ocid": "login.back_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                            "Back"
                          ]
                        }
                      ),
                      method === "phone" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Mobile Number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Enter your 10-digit mobile number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendPhoneOTP, noValidate: true, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "label",
                              {
                                htmlFor: "phone-input",
                                className: "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2",
                                children: "Mobile Number"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "flex items-stretch border border-border rounded-sm overflow-hidden\n                              focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2\n                              focus-within:ring-offset-card transition-all duration-150",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "flex items-center gap-1.5 pl-3 pr-3 bg-muted text-muted-foreground\n                              text-sm font-semibold border-r border-border shrink-0 select-none",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                                        "+91"
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "phone-input",
                                      type: "tel",
                                      inputMode: "numeric",
                                      placeholder: "10-digit number",
                                      value: phone,
                                      onChange: handlePhoneChange,
                                      className: "flex-1 bg-transparent text-foreground px-3 py-3 text-sm outline-none min-h-[44px] placeholder:text-muted-foreground",
                                      "data-ocid": "login.phone_input"
                                    }
                                  )
                                ]
                              }
                            ),
                            phoneError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "mt-2 text-xs text-destructive-foreground bg-destructive/10 px-3 py-1.5 rounded-sm",
                                "data-ocid": "login.phone_field_error",
                                children: phoneError
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "submit",
                              className: "btn-luxury w-full flex items-center justify-center min-h-[48px] text-sm",
                              "data-ocid": "login.send_otp_button",
                              children: "SEND OTP"
                            }
                          )
                        ] })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Email Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Enter your email to receive a login code" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendEmailOTP, noValidate: true, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "label",
                              {
                                htmlFor: "email-input",
                                className: "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2",
                                children: "Email Address"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "flex items-stretch border border-border rounded-sm overflow-hidden\n                              focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2\n                              focus-within:ring-offset-card transition-all duration-150",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "flex items-center gap-1.5 pl-3 pr-3 bg-muted text-muted-foreground\n                              text-sm font-semibold border-r border-border shrink-0 select-none",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14 })
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "email-input",
                                      type: "email",
                                      inputMode: "email",
                                      placeholder: "you@example.com",
                                      value: email,
                                      onChange: handleEmailChange,
                                      className: "flex-1 bg-transparent text-foreground px-3 py-3 text-sm outline-none min-h-[44px] placeholder:text-muted-foreground",
                                      "data-ocid": "login.email_input"
                                    }
                                  )
                                ]
                              }
                            ),
                            emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "mt-2 text-xs text-destructive-foreground bg-destructive/10 px-3 py-1.5 rounded-sm",
                                "data-ocid": "login.email_field_error",
                                children: emailError
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "submit",
                              className: "btn-luxury w-full flex items-center justify-center min-h-[48px] text-sm",
                              "data-ocid": "login.send_email_otp_button",
                              children: "SEND CODE"
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  `input-${method}`
                ),
                step === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 16 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -16 },
                    transition: { duration: 0.22, ease: "easeInOut" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: goBack,
                          className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6",
                          "data-ocid": "login.back_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                            "Back"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Verify Code" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter the 6-digit code sent to" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-1 truncate", children: maskedIdentifier })
                      ] }),
                      otpSent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "mb-5 flex items-center gap-2 bg-success/10 text-success px-3 py-2.5 rounded-sm text-xs justify-center",
                          "data-ocid": "login.otp_sent_success",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "✓" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Code sent successfully" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleVerifyOTP, noValidate: true, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(OtpBoxes, { value: otp, onChange: setOtp }),
                          otpError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "mt-3 text-xs text-destructive-foreground bg-destructive/10 px-3 py-1.5 rounded-sm text-center",
                              "data-ocid": "login.otp_field_error",
                              children: otpError
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "submit",
                            className: "btn-luxury w-full flex items-center justify-center min-h-[48px] text-sm mb-4",
                            "data-ocid": "login.verify_otp_button",
                            children: "VERIFY & SIGN IN"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ResendTimer, { onResend: handleResend }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-center text-[11px] text-muted-foreground/60 leading-relaxed", children: "Demo mode: enter any 6-digit code to continue" })
                    ]
                  },
                  `otp-${method}`
                )
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-8", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " VE YRON. All rights reserved."
        ] })
      ] })
    }
  );
}
export {
  Login as default
};
