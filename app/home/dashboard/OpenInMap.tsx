import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useRouter } from "expo-router";

import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import AppleMapIcon from "@/assets/icons/direct-up.svg";
import GoogleMapIcon from "@/assets/icons/location.svg";

const OpenInMap = () => {
  const router = useRouter();
  const [selectedMap, setSelectedMap] = useState("apple");
  const handleGoBack = () => {
    router.back();
  };

  const handleAppleMaps = () => {
    setSelectedMap("apple");
    console.log("Opening Apple Maps");

    router.back();
  };

  const handleGoogleMaps = () => {
    setSelectedMap("google");
    console.log("Opening Google Maps");

    router.back();
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center my-6 px-5`}>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={tw`text-xl font-medium ml-4 text-[#2A2A2A]`}>
          Open in Map
        </Text>
      </View>

      <View
        style={tw`bg-white rounded-lg border border-[#5D5D5D] overflow-hidden mx-5`}
      >
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 px-4 border-b border-gray-200`}
          onPress={handleAppleMaps}
        >
          <View style={tw`flex-row items-center`}>
            <AppleMapIcon width={24} height={24} />
            <Text style={tw`ml-4 text-gray-700`}>Switch to Apple Maps</Text>
          </View>
          <View
            style={tw`h-5 w-5 rounded-full border border-[#00A082] justify-center items-center`}
          >
            {selectedMap === "apple" && (
              <View style={tw`h-3 w-3 rounded-full bg-[#00A082]`} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 px-4`}
          onPress={handleGoogleMaps}
        >
          <View style={tw`flex-row items-center`}>
            <GoogleMapIcon width={24} height={24} />
            <Text style={tw`ml-4 text-gray-700`}>Switch to Google Maps</Text>
          </View>
          <View
            style={tw`h-5 w-5 rounded-full border border-[#00A082] justify-center items-center`}
          >
            {selectedMap === "google" && (
              <View style={tw`h-3 w-3 rounded-full bg-[#00A082]`} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OpenInMap;
