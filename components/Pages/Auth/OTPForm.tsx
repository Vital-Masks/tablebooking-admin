import React from "react";
import { verifyOTP, resendOTP } from "@/lib/actions/auth.action";
import { useOTP } from "@/lib/hooks/useOTP";
import { OTPResponse, OTPErrorResponse } from "@/types/auth";
import toast from "react-hot-toast";

interface OTPFormProps {
  userId: string;
  otpMessage: string;
  onBackToLogin: () => void;
  onVerifySuccess: () => void;
  purpose: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  userId,
  otpMessage,
  onBackToLogin,
  onVerifySuccess,
  purpose,
}) => {
  const {
    otp,
    timeLeft,
    otpInputRefs,
    formatTime,
    handleOTPChange,
    handleOTPKeyDown,
    handleOTPPaste,
    resetOTP,
    getOTPString,
  } = useOTP({
    onVerifySuccess,
    onResendSuccess: () => {},
  });

  const handleOTPSubmit = async () => {
    const otpString = getOTPString();
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    if (timeLeft === 0) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }

    try {
      const verifyOTPDetails: OTPResponse | OTPErrorResponse = await verifyOTP({
        userId,
        otp: otpString,
        purpose: purpose,
      });

      if ('success' in verifyOTPDetails && verifyOTPDetails.success && verifyOTPDetails.result?.success) {
        onVerifySuccess();
      } else {
        const errorMessage = 'error' in verifyOTPDetails ? verifyOTPDetails.error : "Invalid OTP. Please try again.";
        toast.error(errorMessage || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const resendOTPDetails: OTPResponse | OTPErrorResponse = await resendOTP({
        userId,
        purpose: purpose,
      });

      if ('success' in resendOTPDetails && resendOTPDetails.success && resendOTPDetails.result?.success) {
        resetOTP();
        toast.success("OTP has been resent!");
      } else {
        const errorMessage = 'error' in resendOTPDetails ? resendOTPDetails.error : "Failed to resend OTP. Please try again.";
        toast.error(errorMessage || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="space-y-6 w-full text-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-black mb-2">
          Enter Verification Code
        </h3>
        <p className="text-white-dark text-sm">
          {otpMessage ||
            "We've sent a 6-digit verification code to your mobile number"}
        </p>
      </div>

      <div className="flex justify-center space-x-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              otpInputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            onKeyDown={(e) => handleOTPKeyDown(index, e)}
            onPaste={handleOTPPaste}
            className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-gray-900"
            autoComplete="off"
          />
        ))}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleOTPSubmit}
          className="btn btn-gradient w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
        >
          Verify OTP
        </button>
      </div>
      
      <small
        className={`mt-1 ${timeLeft <= 60 ? "text-red-500" : "text-gray-600"}`}
      >
        {timeLeft > 0 ? `${formatTime(timeLeft)} left` : "OTP expired"}
      </small>

      <div className="text-center flex items-center gap-3 justify-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-primary hover:text-primary/80 text-sm"
        >
          Back to Login
        </button>
        {timeLeft === 0 && (
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-primary hover:text-primary/80 text-sm"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPForm;
