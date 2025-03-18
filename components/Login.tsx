import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "@/assets/icons/google.svg";
import EmailIcon from "@/assets/icons/sms.svg";
import VisibilityToggleIcon from "@/components/VisibilityToggle";
import { AuthenticationProps } from "@/types/interfaces";
import { Link } from "expo-router";
import Button from "./Button";
import tw from "twrnc";

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
    <SafeAreaView style={tw`bg-[#F7F7F7] h-full text-[#00A082]`}>
      <ScrollView>
        <View style={tw`w-full justify-center h-full px-5 my-6`}>
          <Text
            style={tw`text-center text-4xl  text-[#00A082] font-bold leading-10 `}
          >
            Login
          </Text>

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Email
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isEmailFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                selectionColor="transparent"
              />
              <EmailIcon />
            </View>
          </View>

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Password
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isPassowrdFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPassowrdFocused(true)}
                onBlur={() => setIsPassowrdFocused(false)}
                selectionColor="transparent"
              />
              <VisibilityToggleIcon
                visible={passwordVisible}
                onToggle={togglePassordVisibility}
              />
            </View>
          </View>

          <View style={tw`mt-[208px] mx-3`}>
            <Button fullWidth={true} onPress={handleLogin}>
              Login With Biometrics
            </Button>

            <Text style={tw`text-center text-[#696969] mt-1 text-sm`}>
              Don't have an account?{" "}
              <Link href={href}>
                <Text style={tw`text-[#FF9400]`}>Sign Up</Text>
              </Link>
            </Text>

            <View style={tw`flex-row items-center my-8`}>
              <View style={tw`flex-1 h-px bg-[#777777] `} />

              <Text style={tw`mx-4 text-center text-[#5D5D5D] font-normal`}>
                OR CONTINUE WITH
              </Text>

              <View style={tw`flex-1 h-px bg-[#777777] `} />
            </View>

            <TouchableOpacity
              style={tw`mt-4 p-3 flex flex-row items-center justify-center border border-[0.5px] border-[#5D5D5D] rounded-lg h-10`}
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
