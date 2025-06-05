import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmailIcon from "@/assets/icons/sms.svg";
import VisibilityToggleIcon from "@/components/VisibilityToggle";
import { SignupProps } from "@/types/interfaces";
import { Link, router } from "expo-router";
import Button from "./Button";
import tw from "twrnc";
import { useRegisterAgentMutation } from "@/app/store/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/store/slices/authSlice";
import ErrorModal from "./ErrorModal";
import FeedbackBanner from "./FeedbackBanner";
// Import individual country flag data
import CountryPicker, { Country } from "react-native-country-picker-modal";

const AgentSignup: React.FC<SignupProps> = ({ href, otpRoute }) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [countryCode, setCountryCode] = useState<Country["cca2"]>("NG");
  const [callingCode, setCallingCode] = useState<string>("234");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState<boolean>(false);
  const [countryPickerVisible, setCountryPickerVisible] =
    useState<boolean>(false);

  // Form validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Error modal state
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Add feedback banner state
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<
    "success" | "error" | "info"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // RTK Query hook for registering an agent
  const [registerAgent, { isLoading }] = useRegisterAgentMutation();
  const dispatch = useDispatch();

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountryPickerVisible(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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

  // Basic phone number validation with regex
  const isValidPhoneNumber = (phoneNumber: string) => {
    // This is a basic validation - you might want to use a more sophisticated library
    // for production use cases
    const phoneRegex = /^\d{6,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      // Show error feedback instead of modal for validation errors
      showFeedback("error", "Please fill in all fields.");
      return;
    }

    try {
      // Format the phone number with country code
      const formattedPhone = `+${callingCode}${phone}`;

      const userData = {
        email,
        password,
        role: "agent" as const,
      };

      const result = await registerAgent(userData).unwrap();

      // Store user credentials in Redux
      dispatch(
        setCredentials({
          user: result.user,
          accessToken: result.accessToken,
        })
      );

      // Show success feedback
      showFeedback(
        "success",
        "Registration successful! Please verify your email."
      );

      // Navigate to OTP verification with email parameter
      setTimeout(() => {
        router.push({
          pathname: otpRoute,
          params: { email: email },
        });
      }, 1500);
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Show error feedback
      showFeedback(
        "error",
        error.data?.message || "Registration failed. Please try again."
      );

      // Or show in modal for more serious errors
      if (error.status >= 500) {
        showError(
          "Registration Failed",
          error.data?.message || "Server error. Please try again later."
        );
      }
    }
  };

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
            Agent Sign Up
          </Text>

          {/* Email Input Field */}
          <View style={tw`px-3 mt-5`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Email
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isEmailFocused
                  ? "border-[#00A082]"
                  : errors.email
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
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                selectionColor="#00A082"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <EmailIcon />
            </View>
            {errors.email ? (
              <Text style={tw`text-red-500 text-xs mt-1 px-3`}>
                {errors.email}
              </Text>
            ) : null}
          </View>

          {/* Password Input Field */}
          <View style={tw`px-3 mt-5`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Password
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isPasswordFocused
                  ? "border-[#00A082]"
                  : errors.password
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
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                selectionColor="#00A082"
              />
              <VisibilityToggleIcon
                visible={passwordVisible}
                onToggle={togglePasswordVisibility}
              />
            </View>
            {errors.password ? (
              <Text style={tw`text-red-500 text-xs mt-1 px-3`}>
                {errors.password}
              </Text>
            ) : null}
          </View>

          {/* Confirm Password Input Field */}
          <View style={tw`px-3 mt-5`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Confirm Password
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isConfirmPasswordFocused
                  ? "border-[#00A082]"
                  : errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                placeholder="Confirm Password"
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: "" });
                  }
                }}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                selectionColor="#00A082"
              />
              <VisibilityToggleIcon
                visible={confirmPasswordVisible}
                onToggle={toggleConfirmPasswordVisibility}
              />
            </View>
            {errors.confirmPassword ? (
              <Text style={tw`text-red-500 text-xs mt-1 px-3`}>
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          <View style={tw`mt-12 mx-3`}>
            <Button
              fullWidth={true}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={tw`flex-row items-center justify-center`}>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={tw`text-white font-medium ml-2`}>
                    Signing Up...
                  </Text>
                </View>
              ) : (
                "Sign Up"
              )}
            </Button>

            <Text style={tw`text-center text-[#696969] mt-2 text-sm`}>
              Already have an account?{" "}
              <Link href={href} asChild>
                <Text style={tw`text-[#FF9400]`}>Login</Text>
              </Link>
            </Text>

            <View style={tw`flex-row items-center my-6`}>
              <View style={tw`flex-1 h-px bg-[#777777]`} />
              <Text style={tw`mx-4 text-center text-[#5D5D5D] font-normal`}>
                OR CONTINUE WITH
              </Text>
              <View style={tw`flex-1 h-px bg-[#777777] `} />
            </View>

            <TouchableOpacity
              style={tw`mt-2 p-3 flex flex-row items-center justify-center border border-[0.5px] border-[#5D5D5D] rounded-lg h-10`}
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

export default AgentSignup;
