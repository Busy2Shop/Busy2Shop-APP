import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationProps } from "@/types/interfaces";
import OTPTextInput from "react-native-otp-textinput";
import tw from "twrnc";

import { router } from "expo-router";

const OTPPage: React.FC<AuthenticationProps> = ({ href }) => {
  const [otp, setOtp] = useState<string>("");

  const emailAddress = "lucy@gmail.com";

  const handleSubmit = () => {
    router.push(href);
  };

  return (
    <SafeAreaView style={tw`bg-[#F7F7F7] h-full text-[#00A082]`}>
      <ScrollView>
        <View style={tw`w-full justify-center h-full px-5 my-6`}>
          <Text
            style={tw`text-center text-4xl  text-[#00A082] font-bold leading-10 `}
          >
            OTP
          </Text>
          <View style={tw`items-center text-sm`}>
            <Text style={tw`text-[#5D5D5D]`}>
              Please enter the code we sent to{" "}
            </Text>
            <Text style={tw`text-[#FB4F00] underline`}>{emailAddress}</Text>
          </View>

          <View
            style={tw`w-[80px] mt-6  self-center flex-1 justify-center items-center`}
          >
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
          <Text style={tw`text-[#FB4F00] text-center `}>Resend OTP</Text>

          <View style={tw`mt-20 mx-3`}>
            <TouchableOpacity
              style={tw`bg-[#00A082] p-3 rounded-lg mt-7 flex-row justify-center items-center`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-[#F7F7F7] text-center font-medium `}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={tw`text-center text-[#6B6B6B] mt-3`}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPPage;
