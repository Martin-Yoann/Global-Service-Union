"use client";

import { useSignIn, useSignUp, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type Mode = "signIn" | "signUp" | "forgot";

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { openSignIn } = useClerk();
  const router = useRouter(); // ✅ 引入 router

  const [mode, setMode] = useState<Mode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        onClose();
        reset();

        // ✅ 登录后刷新页面，确保 <SignedIn> 正确显示
        router.refresh();
      } else {
        setError("More verification steps required.");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Sign in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setSuccess("Verification email sent. Please check your inbox.");
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Sign up failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccess("Password reset email sent.");
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Reset failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async () => {
    await openSignIn({ redirectUrl: "/", strategy: "oauth_google" });
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white w-[800px] h-[500px] rounded-2xl shadow-lg flex overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Left: Image */}
            <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center">
              <img
                src="https://n1image.hjfile.cn/hj-mh/2021/06/25/3e8e36e59ce2f2de4fa61b6466c35afb.jpg"
                alt="login"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Form */}
            <div className="w-1/2 p-10 relative flex flex-col justify-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 
             hover:text-black 
             cursor-pointer 
             transition-transform duration-500 ease-in-out 
             hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center capitalize">
                {mode === "signIn"
                  ? "Sign In"
                  : mode === "signUp"
                    ? "Sign Up"
                    : "Forgot Password"}
              </h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
              />
              {mode !== "forgot" && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
                />
              )}
              {mode === "signUp" && <div id="clerk-captcha" className="mb-4" />}

              {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
              {success && (
                <p className="text-green-500 mb-3 text-sm">{success}</p>
              )}

              <button
              
                onClick={
                  mode === "signIn"
                    ? handleSignIn
                    : mode === "signUp"
                      ? handleSignUp
                      : handleResetPassword
                }
                disabled={isLoading}
                className={`w-full py-3 cursor-pointer  rounded font-semibold transition ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading
                  ? "Please wait..."
                  : mode === "signIn"
                    ? "Sign In"
                    : mode === "signUp"
                      ? "Create Account"
                      : "Send Reset Link"}
              </button>

              {mode === "signIn" && (
                <button
                  onClick={handleOAuth}
                  className="mt-3 flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 rounded w-full transition cursor-pointer "
                >
                  <img
                    src="/google-icon.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
              )}
              {/* Switch Mode */}
              <div className="text-sm text-center mt-4 text-gray-600 space-y-1 cursor-pointer ">
                {mode === "signIn" && (
                  <>
                    <p>
                      No account?{" "}
                      <button
                        onClick={() => {
                          setMode("signUp");
                          reset();
                        }}
                        className="text-blue-600 hover:underline cursor-pointer "
                      >
                        Register
                      </button>
                    </p>
                    <p>
                      Forgot password?{" "}
                      <button
                        onClick={() => {
                          setMode("forgot");
                          reset();
                        }}
                        className="text-blue-600 hover:underline cursor-pointer "
                      >
                        Reset
                      </button>
                    </p>
                  </>
                )}
                {(mode === "signUp" || mode === "forgot") && (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setMode("signIn");
                        reset();
                      }}
                      className="text-blue-600 hover:underline cursor-pointer "
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
