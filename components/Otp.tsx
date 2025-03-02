import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationProps } from "@/types/interfaces";
import OTPTextInput from "react-native-otp-textinput";

import { router } from "expo-router";

const OTPPage: React.FC<AuthenticationProps> = ({ href }) => {
  const [otp, setOtp] = useState<string>("");

  const emailAddress = "lucy@gmail.com";

  const handleSubmit = () => {
    router.push(href);
  };

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full text-primaryText">
      <ScrollView>
        <View className="w-full justify-center h-full px-5 my-6">
          <Text className="text-center text-4xl  text-primaryText font-bold leading-10 ">
            OTP
          </Text>
          <View className="items-center text-sm">
            <Text className="text-[#5D5D5D]">
              Please enter the code we sent to{" "}
            </Text>
            <Text className="text-[#FB4F00] underline ">{emailAddress}</Text>
          </View>

          <View className="w-[80px] mt-[52px] self-center flex-1 justify-center items-center p-4">
            <OTPTextInput
              inputCount={4}
              handleTextChange={setOtp}
              tintColor="#00A082"
              offTintColor="#D1D5DB"
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#00A082",
                borderRadius: 8,
              }}
            />
          </View>
          <Text className="text-[#FB4F00] text-center mt-3">Resend OTP</Text>

          <View className="mt-[412px] mx-3">
            <TouchableOpacity
              className="bg-primaryText p-3 rounded-lg mt-7 flex-row justify-center items-center"
              onPress={handleSubmit}
            >
              <Text className="text-[#F7F7F7] text-center font-medium ">
                Submit
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center text-[#6B6B6B] mt-3">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPPage;
