import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSubmitNinMutation } from "@/app/store/api/userApiSlice";
import tw from "twrnc";

interface NinInputSectionProps {
  onSubmitSuccess: () => void;
  onSkip: () => void;
}

const NinInputSection: React.FC<NinInputSectionProps> = ({
  onSubmitSuccess,
  onSkip,
}) => {
  const [ninNumber, setNinNumber] = useState("");
  const [submitNin, { isLoading, error }] = useSubmitNinMutation();

  const handleSubmitNin = async () => {
    // Basic validation
    if (!ninNumber.trim()) {
      Alert.alert("Error", "Please enter your NIN number");
      return;
    }

    // NIN should be 11 digits
    if (ninNumber.length !== 11 || !/^\d+$/.test(ninNumber)) {
      Alert.alert("Error", "NIN must be exactly 11 digits");
      return;
    }

    try {
      const result = await submitNin({ nin: ninNumber }).unwrap();

      if (result.verified) {
        Alert.alert("Success", "NIN verified and submitted successfully!");
      } else {
        Alert.alert(
          "Success",
          "NIN submitted successfully and is being processed!"
        );
      }

      onSubmitSuccess();
    } catch (error: any) {
      console.error("NIN submission error:", error);

      let errorMessage = "Failed to submit NIN. Please try again.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      Alert.alert("Submission Failed", errorMessage);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip NIN Verification",
      "You can add your NIN later from your profile settings. Continue to document upload?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: onSkip,
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 px-5 py-8`}>
      {/* Header */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>
          NIN Verification
        </Text>
        <Text style={tw`text-gray-600 text-base leading-6`}>
          Please enter your National Identification Number (NIN) to verify your
          identity.
        </Text>
      </View>

      {/* NIN Input */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-base font-medium text-gray-700 mb-2`}>
          NIN Number
        </Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base bg-white shadow-sm`}
          placeholder="Enter your 11-digit NIN"
          value={ninNumber}
          onChangeText={setNinNumber}
          keyboardType="numeric"
          maxLength={11}
          editable={!isLoading}
          autoComplete="off"
          placeholderTextColor="#9CA3AF"
        />
        <Text style={tw`text-xs text-gray-500 mt-1`}>
          Your NIN is an 11-digit number found on your National ID card
        </Text>
      </View>

      {/* Error Display */}
      {error && (
        <View style={tw`mb-4 p-3 bg-red-50 border border-red-200 rounded-lg`}>
          <Text style={tw`text-red-600 text-sm`}>
            {"data" in (error as any) && (error as any).data?.message
              ? (error as any).data.message
              : typeof error === "object" && "message" in error && error.message
              ? (error as { message: string }).message
              : "An error occurred. Please try again."}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={tw`space-y-4 mt-8`}>
        {/* Submit Button */}
        <TouchableOpacity
          style={tw`w-full py-4 rounded-lg ${
            isLoading || !ninNumber.trim() ? "bg-gray-400" : "bg-blue-600"
          } shadow-sm`}
          onPress={handleSubmitNin}
          disabled={isLoading || !ninNumber.trim()}
        >
          {isLoading ? (
            <View style={tw`flex-row items-center justify-center`}>
              <ActivityIndicator color="white" size="small" />
              <Text style={tw`text-white font-semibold ml-2`}>
                Verifying NIN...
              </Text>
            </View>
          ) : (
            <Text style={tw`text-white text-center font-semibold text-base`}>
              Verify & Submit NIN
            </Text>
          )}
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          style={tw`w-full py-4 rounded-lg border border-gray-300 bg-[#00A082]`}
          onPress={handleSkip}
          disabled={isLoading}
        >
          <Text style={tw`text-gray-700 text-center font-semibold text-base`}>
            Skip for Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={tw`mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg`}>
        <Text style={tw`text-blue-800 font-medium text-sm mb-2`}>
          Why do we need your NIN?
        </Text>
        <Text style={tw`text-blue-700 text-xs leading-5`}>
          Your NIN helps us verify your identity and comply with regulatory
          requirements. This ensures secure transactions and protects your
          account.
        </Text>
      </View>
    </View>
  );
};

export default NinInputSection;
