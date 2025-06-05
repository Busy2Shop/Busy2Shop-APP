import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "@/assets/icons/google.svg";
import EmailIcon from "@/assets/icons/sms.svg";
import VisibilityToggleIcon from "@/components/VisibilityToggle";
import { AuthenticationProps } from "@/types/interfaces";
import { Link, router } from "expo-router";
import Button from "./Button";
import tw from "twrnc";
import { useLoginMutation } from "@/app/store/api/userApiSlice";

interface FeedbackBannerProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  visible: boolean;
  onClose: () => void;
}

const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  type,
  message,
  visible,
  onClose,
}) => {
  if (!visible) return null;

  const getBannerStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-500";
      case "error":
        return "bg-red-100 border-red-500";
      case "warning":
        return "bg-yellow-100 border-yellow-500";
      case "info":
        return "bg-blue-100 border-blue-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <View style={tw`mx-3 mb-4 p-3 rounded-lg border-l-4 ${getBannerStyles()}`}>
      <View style={tw`flex-row justify-between items-start`}>
        <Text style={tw`flex-1 ${getTextColor()} text-sm font-medium`}>
          {message}
        </Text>
        <TouchableOpacity onPress={onClose} style={tw`ml-2`}>
          <Text style={tw`${getTextColor()} text-lg font-bold`}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoginPage: React.FC<AuthenticationProps> = ({ href }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  // Error and feedback states
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "warning" | "info";
    message: string;
    visible: boolean;
  }>({
    type: "info",
    message: "",
    visible: false,
  });

  // RTK Query mutation hook
  const [login, { isLoading }] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setFeedback((prev) => ({ ...prev, visible: false }));

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const showFeedback = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    setFeedback({
      type,
      message,
      visible: true,
    });

    // Auto hide after 5 seconds for success messages
    if (type === "success") {
      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, visible: false }));
      }, 5000);
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      showFeedback("error", "Please fix the errors above to continue");
      return;
    }

    try {
      const result = await login({
        email: email.trim(),
        password: password.trim(),
      }).unwrap();

      // Store tokens if needed (depending on your auth setup)
      // You might want to store these in AsyncStorage or secure storage
      console.log("Login successful:", result);

      showFeedback("success", "Login successful! Redirecting...");

      // Navigate to dashboard after a brief delay
      setTimeout(() => {
        router.push("/home/dashboard/page");
      }, 1500);
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle different types of errors
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status) {
        switch (error.status) {
          case 400:
            errorMessage = "Invalid email or password";
            break;
          case 401:
            errorMessage =
              "Invalid credentials. Please check your email and password.";
            break;
          case 404:
            errorMessage =
              "Account not found. Please check your email or sign up.";
            break;
          case 429:
            errorMessage = "Too many login attempts. Please try again later.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = `Login failed with status: ${error.status}`;
        }
      }

      showFeedback("error", errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    showFeedback("info", "Google login is not implemented yet");
  };

  const closeFeedback = () => {
    setFeedback((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SafeAreaView style={tw`bg-[#F7F7F7] h-full text-[#00A082]`}>
      <ScrollView>
        <View style={tw`w-full justify-center h-full px-5 my-6`}>
          <Text
            style={tw`text-center text-4xl text-[#00A082] font-bold leading-10`}
          >
            Login
          </Text>

          {/* Feedback Banner */}
          <FeedbackBanner
            type={feedback.type}
            message={feedback.message}
            visible={feedback.visible}
            onClose={closeFeedback}
          />

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343]`}>Email</Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isEmailFocused
                  ? "border-[#00A082]"
                  : emailError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError("");
                }}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                selectionColor="transparent"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              <EmailIcon />
            </View>
            {emailError ? (
              <Text style={tw`text-red-500 text-sm mt-1`}>{emailError}</Text>
            ) : null}
          </View>

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343]`}>
              Password
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isPasswordFocused
                  ? "border-[#00A082]"
                  : passwordError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                selectionColor="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              <VisibilityToggleIcon
                visible={passwordVisible}
                onToggle={togglePasswordVisibility}
              />
            </View>
            {passwordError ? (
              <Text style={tw`text-red-500 text-sm mt-1`}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity disabled={isLoading}>
              <Text style={tw`text-[#FF9400] mt-2`}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`mt-32 mx-3`}>
            <Button fullWidth={true} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <View style={tw`flex-row items-center justify-center`}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={tw`text-white ml-2 font-medium`}>
                    Logging in...
                  </Text>
                </View>
              ) : (
                "Login With Biometrics"
              )}
            </Button>

            <Text style={tw`text-center text-[#696969] mt-1 text-sm`}>
              Don't have an account?{" "}
              <Link href={href}>
                <Text style={tw`text-[#FF9400]`}>Sign Up</Text>
              </Link>
            </Text>

            <View style={tw`flex-row items-center my-8`}>
              <View style={tw`flex-1 h-px bg-[#777777]`} />
              <Text style={tw`mx-4 text-center text-[#5D5D5D] font-normal`}>
                OR CONTINUE WITH
              </Text>
              <View style={tw`flex-1 h-px bg-[#777777]`} />
            </View>

            <TouchableOpacity
              style={tw`mt-4 p-3 flex flex-row items-center justify-center border border-[0.5px] border-[#5D5D5D] rounded-lg h-10 ${
                isLoading ? "opacity-50" : ""
              }`}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              <Image
                source={require("../assets/images/google.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={tw`ml-2 text-gray-700 font-medium`}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
