import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import tw from "twrnc";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();

  const handleOpenMap = () => {
    router.push("/home/dashboard/OpenInMap");
  };

  return (
    <View>
      <View style={tw`flex flex-row items-center my-[24px] px-5 mt-14`}>
        <TouchableOpacity onPress={() => router.push("/home/dashboard/page")}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-[500] text-[#2A2A2A] ml-2`}>
          Settings
        </Text>
      </View>

      <View
        style={tw`flex flex-row justify-between items-center border border-[#5D5D5D] mx-5 px-[12px] rounded-lg`}
      >
        <TouchableOpacity
          onPress={handleOpenMap}
          style={tw`flex-1 flex-row justify-between items-center py-4`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={require("../../../assets/images/routing.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Open in Map
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/arrow-right.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={tw`flex flex-row justify-between items-center border border-[#5D5D5D] mx-5 px-[12px] mt-6 rounded-lg`}
      >
        <View style={tw`flex flex-row items-center py-4`}>
          <Image
            source={require("../../../assets/images/trash.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
            Delete Account
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/arrow-right.png")}
          style={{ width: 30, height: 30 }}
        />
      </View>

      <View>
        <TouchableOpacity
          style={tw`bg-[#FED7DA] mx-5 px-[12px] mt-[52px] rounded-lg py-4`}
        >
          <Text style={tw`text-sm text-[#D00416] font-normal text-center`}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
