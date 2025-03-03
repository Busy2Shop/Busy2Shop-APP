import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "@/assets/icons/google.svg";
import EmailIcon from "@/assets/icons/sms.svg";
import VisibilityToggleIcon from "@/components/VisibilityToggle";
import { AuthenticationProps } from "@/types/interfaces";
import { Link } from "expo-router";

const LoginPage: React.FC<AuthenticationProps> = ({ href }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPassowrdFocused, setIsPassowrdFocused] = useState<boolean>(false);

  const togglePassordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {};

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full text-primaryText">
      <ScrollView>
        <View className="w-full justify-center h-full px-5 my-6">
          <Text className="text-center text-4xl  text-primaryText font-bold leading-10 ">
            Login
          </Text>

          <View className="px-3 mt-7">
            <Text className="text-base font-medium text-[#434343] px-3">
              Email
            </Text>
            <View
              className={`flex-row items-center border rounded-lg px-3 bg-white ${
                isEmailFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                className="flex-1 py-3 px-3 text-base"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
              <EmailIcon />
            </View>
          </View>

          <View className="px-3 mt-7">
            <Text className="text-base font-medium text-[#434343] px-3">
              Password
            </Text>
            <View
              className={`flex-row items-center border rounded-lg px-3 bg-white ${
                isPassowrdFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                className="flex-1 py-3 px-3 text-base"
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPassowrdFocused(true)}
                onBlur={() => setIsPassowrdFocused(false)}
              />
              <VisibilityToggleIcon
                visible={passwordVisible}
                onToggle={togglePassordVisibility}
              />
            </View>
          </View>

          <View className="mt-[208px] mx-3">
            <TouchableOpacity
              className="bg-primaryText p-3 rounded-lg mt-7 flex-row justify-center items-center"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-medium ">Login</Text>
            </TouchableOpacity>

            <Text className="text-center text-[#696969] mt-1 text-sm">
              Don't have an account?{" "}
              <Link href={href}>
                <Text className="text-[#FF9400]">Sign Up</Text>
              </Link>
            </Text>

            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-[#777777]" />

              <Text className="mx-4 text-center text-[#5D5D5D] font-normal">
                OR CONTINUE WITH
              </Text>

              <View className="flex-1 h-px bg-[#777777]" />
            </View>

            <TouchableOpacity className="mt-4 p-3 border border-[#5D5D5D] rounded-lg flex-row justify-center items-center">
              <GoogleIcon />
              <Text className="ml-2 text-gray-700 font-medium">Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
