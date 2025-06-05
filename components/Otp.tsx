import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationProps } from "@/types/interfaces";
import OTPTextInput from "react-native-otp-textinput";
import tw from "twrnc";
import { router, useLocalSearchParams } from "expo-router";
import {
  useVerifyAgentMutation,
  useResendAgentOTPMutation,
} from "@/app/store/api/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setVerificationToken } from "@/app/store/slices/authSlice"; // Import the new action
import FeedbackBanner from "@/components/FeedbackBanner";
import ErrorModal from "@/components/ErrorModal";

const OTPPage: React.FC<AuthenticationProps> = ({ href }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Get email from route params or Redux store
  const { email } = useLocalSearchParams<{ email: string }>();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const emailAddress = email || userEmail || "";

  // Feedback states
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<
    "success" | "error" | "info"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // Error modal states
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // RTK Query hooks
  const [verifyAgent] = useVerifyAgentMutation();
  const [resendOTP] = useResendAgentOTPMutation();

  // Timer for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Auto-hide feedback banner after 3 seconds
  useEffect(() => {
    if (feedbackVisible) {
      const timeout = setTimeout(() => {
        setFeedbackVisible(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [feedbackVisible]);

  // Show feedback banner
  const showFeedback = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackVisible(true);
  };

  // Show error modal
  const showError = (title: string, message: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  // Handle OTP input change
  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
    // Clear any previous error feedback when user starts typing
    if (feedbackType === "error" && feedbackVisible) {
      setFeedbackVisible(false);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      showFeedback("error", "Please enter the complete 6-digit OTP code.");
      return;
    }

    if (!emailAddress) {
      showError(
        "Email Missing",
        "Unable to verify OTP. Email address not found."
      );
      return;
    }

    setIsLoading(true);

    try {
      const verificationData = {
        email: emailAddress,
        otpCode: otp,
      };

      const result = await verifyAgent(verificationData).unwrap();

      // Store the verification token in Redux
      dispatch(
        setVerificationToken({
          email: result.email,
          accessToken: result.accessToken,
        })
      );

      showFeedback("success", "Email verified successfully! Redirecting...");

      // Navigate to agent details page to complete profile
      setTimeout(() => {
        router.push("/agent/details");
      }, 1500);
    } catch (error: any) {
      console.error("OTP verification failed:", error);

      // Clear the OTP input on error
      setOtp("");

      const errorMsg =
        error.data?.message || "OTP verification failed. Please try again.";

      if (error.status === 400) {
        showFeedback("error", "Invalid or expired OTP code. Please try again.");
      } else if (error.status === 401) {
        showFeedback("error", "OTP has expired. Please request a new one.");
      } else if (error.status >= 500) {
        showError(
          "Verification Failed",
          "Server error. Please try again later."
        );
      } else {
        showFeedback("error", errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || !emailAddress) {
      return;
    }

    setResendLoading(true);

    try {
      const resendData = {
        email: emailAddress,
      };

      await resendOTP(resendData).unwrap();

      showFeedback("info", "New OTP sent to your email address.");

      // Reset timer and states
      setTimer(60);
      setCanResend(false);
      setOtp("");
    } catch (error: any) {
      console.error("Resend OTP failed:", error);

      const errorMsg =
        error.data?.message || "Failed to resend OTP. Please try again.";

      if (error.status >= 500) {
        showError("Resend Failed", "Server error. Please try again later.");
      } else {
        showFeedback("error", errorMsg);
      }
    } finally {
      setResendLoading(false);
    }
  };

  // Format timer display
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Validate if form can be submitted
  const canSubmit = otp.length === 6 && !isLoading;

  return (
    <SafeAreaView style={tw`bg-[#F7F7F7] h-full text-[#00A082]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Feedback Banner */}
        {feedbackVisible && (
          <View style={tw`px-5 pt-2`}>
            <FeedbackBanner
              type={feedbackType}
              message={feedbackMessage}
              onClose={() => setFeedbackVisible(false)}
              visible={feedbackVisible}
              autoHide={true}
              duration={3000}
            />
          </View>
        )}

        <View style={tw`w-full justify-center h-full px-5 my-6`}>
          <Text
            style={tw`text-center text-4xl text-[#00A082] font-bold leading-10`}
          >
            OTP
          </Text>

          <View style={tw`items-center text-sm mt-4`}>
            <Text style={tw`text-[#5D5D5D] text-center`}>
              Please enter the 6-digit code we sent to
            </Text>
            <Text style={tw`text-[#FB4F00] underline font-medium mt-1`}>
              {emailAddress || "your email"}
            </Text>
          </View>

          <View
            style={tw`mt-8 self-center  flex-1 justify-center items-center`}
          >
            <OTPTextInput
              inputCount={6}
              handleTextChange={handleOTPChange}
              tintColor="#00A082"
              offTintColor="#D1D5DB"
              textInputStyle={{
                borderWidth: 1,
                borderColor: otp.length === 6 ? "#00A082" : "#D1D5DB",
                borderRadius: 8,
                backgroundColor: "#ffffff",
              }}
              containerStyle={tw`w-full`}
              defaultValue={otp}
            />
          </View>

          {/* Resend OTP Section */}
          <View style={tw`mt-6 items-center`}>
            {canResend ? (
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={resendLoading}
                style={tw`flex-row items-center py-2`}
                activeOpacity={0.7}
              >
                {resendLoading ? (
                  <ActivityIndicator size="small" color="#FB4F00" />
                ) : null}
                <Text
                  style={tw`text-[#FB4F00] font-medium ${
                    resendLoading ? "ml-2" : ""
                  }`}
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={tw`text-[#5D5D5D]`}>
                Resend OTP in {formatTimer(timer)}
              </Text>
            )}
          </View>

          <View style={tw`mt-12 mx-3`}>
            <TouchableOpacity
              style={tw`bg-[#00A082] p-4 rounded-lg flex-row justify-center items-center ${
                !canSubmit ? "opacity-50" : ""
              }`}
              onPress={handleSubmit}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <View style={tw`flex-row items-center`}>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={tw`text-[#F7F7F7] font-medium ml-2 text-base`}>
                    Verifying...
                  </Text>
                </View>
              ) : (
                <Text
                  style={tw`text-[#F7F7F7] text-center font-medium text-base`}
                >
                  Verify OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={tw`text-center text-[#6B6B6B] mt-6 text-sm px-4 leading-5`}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>

      {/* Error Modal */}
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        title={errorTitle}
        message={errorMessage}
      />
    </SafeAreaView>
  );
};

export default OTPPage;
