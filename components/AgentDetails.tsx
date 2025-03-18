import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "@/assets/icons/arrow-down.svg";
import EmailIcon from "@/assets/icons/sms.svg";
import VisibilityToggleIcon from "@/components/VisibilityToggle";
import { DetailsProps } from "@/types/interfaces";
import DocumentUploadSection from "./DocumentUploadSection";
import { Link } from "expo-router";
import tw from "twrnc";

const AgentDetails: React.FC<DetailsProps> = ({ href }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralPhoneNumber, setReferralPhoneNumber] = useState("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [nin, setNin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [market, setMarket] = useState("");
  const [referral, setReferral] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [isFirstNameFocused, setIsFirstNameFocused] = useState<boolean>(false);
  const [isMarketFocused, setIsMarketFocused] = useState<boolean>(false);
  const [isReferralFocused, setIsReferralFocused] = useState<boolean>(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isAddressFocused, setIsAddressFocused] = useState<boolean>(false);
  const [isNINFocused, setIsNINFocused] = useState<boolean>(false);
  const [isStateFocused, setIsStateFocused] = useState<boolean>(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] =
    useState<boolean>(false);
  const [isReferralPhoneNumberFocused, setIsReferralPhoneNumberFocused] =
    useState<boolean>(false);
  const [isPassowrdFocused, setIsPassowrdFocused] = useState<boolean>(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState<boolean>(false);

  const togglePassordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPassordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={tw`twbg-[#F7F7F7] h-full text-primaryText`}>
      <ScrollView>
        <View style={tw`w-full justify-center h-full px-5 my-6`}>
          <Text className="text-center text-4xl  text-primaryText font-bold leading-10 ">
            Personal Details
          </Text>

          <Text style={tw`text-center text-sm font-normal text-[#434343]`}>
            Fill in your details to continue
          </Text>

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              First Name
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isFirstNameFocused ? "border-primaryText" : "border-gray-300"
              } `}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter First Name"
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setIsFirstNameFocused(true)}
                onBlur={() => setIsFirstNameFocused(false)}
              />
            </View>
          </View>
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Last Name
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isLastNameFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Last Name"
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setIsLastNameFocused(true)}
                onBlur={() => setIsLastNameFocused(false)}
              />
            </View>
          </View>
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Phone Number
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isPhoneNumberFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={() => setIsPhoneNumberFocused(true)}
                onBlur={() => setIsPhoneNumberFocused(false)}
              />
            </View>
          </View>
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Email
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isEmailFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
              <EmailIcon />
            </View>
          </View>

          <View style={tw`px-3 mt-7tw`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Password
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isPassowrdFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
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

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              State
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isStateFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Lagos"
                value={state}
                onChangeText={setState}
                onFocus={() => setIsStateFocused(true)}
                onBlur={() => setIsStateFocused(false)}
              />
              <Dropdown />
            </View>
          </View>
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Address
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isAddressFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Lagos"
                value={address}
                onChangeText={setAddress}
                onFocus={() => setIsAddressFocused(true)}
                onBlur={() => setIsAddressFocused(false)}
              />
            </View>
          </View>
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              NIN
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isNINFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Lagos"
                value={nin}
                onChangeText={setNin}
                onFocus={() => setIsNINFocused(true)}
                onBlur={() => setIsNINFocused(false)}
              />
            </View>
          </View>

          <DocumentUploadSection />

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Market
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isMarketFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Select a Market"
                value={market}
                onChangeText={setMarket}
                onFocus={() => setIsMarketFocused(true)}
                onBlur={() => setIsMarketFocused(false)}
              />
              <Dropdown />
            </View>
          </View>

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Referrals Name
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isReferralFocused ? "border-primaryText" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Referrals Name"
                value={referral}
                onChangeText={setReferral}
                onFocus={() => setIsReferralFocused(true)}
                onBlur={() => setIsReferralFocused(false)}
              />
            </View>
          </View>

          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Referrals Phone Number
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isReferralPhoneNumberFocused
                  ? "border-primaryText"
                  : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Referrals Phone Number"
                value={referralPhoneNumber}
                onChangeText={setReferralPhoneNumber}
                onFocus={() => setIsReferralPhoneNumberFocused(true)}
                onBlur={() => setIsReferralPhoneNumberFocused(false)}
              />
            </View>
          </View>

          <View style={tw`mt-[62px] mx-3`}>
            <TouchableOpacity
              style={tw`bg-primaryText p-3 rounded-lg mt-7 flex-row justify-center items-center`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white text-center font-medium `}>
                Submit
              </Text>
            </TouchableOpacity>
            <Text style={tw`text-center text-[#696969] mt-1 text-sm mb-10`}>
              Already have an account?{" "}
              <Link href={href} asChild>
                <Text style={tw`text-[#FF9400]`}>Login</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AgentDetails;
