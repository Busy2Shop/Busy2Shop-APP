import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import tw from "twrnc";
import { useRouter } from "expo-router";

import WhatsAppIcon from "@/assets/icons/whatsapp.svg";
import SMSIcon from "@/assets/icons/sms.svg";

const Help = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <View style={tw`flex-1 bg-white  pt-10`}>
      <View style={tw`flex flex-row items-center my-[24px] px-5`}>
        <TouchableOpacity onPress={handleGoBack}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-500 text-[#2A2A2A] ml-2`}>Help</Text>
      </View>

      <View
        style={{
          ...tw`mx-5 px-[12px] rounded-lg`,
          borderWidth: 0.5,
          borderColor: "#5D5D5D",
        }}
      >
        <View
          style={{
            ...tw`flex flex-row justify-between items-center  py-4`,
            borderBottomWidth: 0.5,
            borderBottomColor: "#5D5D5D",
            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <WhatsAppIcon />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Send us a message through Whatsapp
            </Text>
          </View>
        </View>

        <View
          style={{
            ...tw`flex flex-row justify-between items-center  py-4`,

            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <SMSIcon />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Send us a message through Email
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Help;
