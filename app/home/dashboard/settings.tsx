import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import tw from "twrnc";
import { useRouter } from "expo-router";
import { Feather as Icon } from "@expo/vector-icons";

const Settings = () => {
  const router = useRouter();

  const handleOpenMap = () => {
    router.push("/home/dashboard/OpenInMap");
  };

  const handleAgentOrderPreferences = () => {
    router.push("/home/dashboard/agentOrderPreferences");
  };

  const handleHelp = () => {
    router.push("/home/dashboard/help");
  };

  const handleFAQ = () => {
    router.push("/home/dashboard/faq");
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
  };

  return (
    <View style={tw`flex-1 bg-[#F7F7F7]`}>
      <View style={tw`flex flex-row items-center my-[24px] px-5 mt-14`}>
        <TouchableOpacity onPress={() => router.back()}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-[500] text-[#2A2A2A] ml-2`}>
          Settings
        </Text>
      </View>

      {/* First section with multiple options */}
      <View
        style={tw`mx-5 bg-white rounded-lg overflow-hidden mb-4 border border-[#5D5D5D]`}
      >
        {/* Open in Map */}
        <TouchableOpacity
          onPress={handleOpenMap}
          style={tw`flex-row justify-between items-center px-4 py-4 border-b border-gray-200`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon name="map-pin" size={24} color="#5D5D5D" style={tw`mr-3`} />
            <Text style={tw`text-base text-[#5D5D5D] font-normal`}>
              Open in Map
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="#5D5D5D" />
        </TouchableOpacity>

        {/* Agent Order Preferences */}
        <TouchableOpacity
          onPress={handleAgentOrderPreferences}
          style={tw`flex-row justify-between items-center px-4 py-4 border-b border-gray-200`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon name="users" size={24} color="#5D5D5D" style={tw`mr-3`} />
            <Text style={tw`text-base text-[#5D5D5D] font-normal`}>
              Agent Order Preferences
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="#5D5D5D" />
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity
          onPress={handleHelp}
          style={tw`flex-row justify-between items-center px-4 py-4 border-b border-gray-200`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon
              name="help-circle"
              size={24}
              color="#5D5D5D"
              style={tw`mr-3`}
            />
            <Text style={tw`text-base text-[#5D5D5D] font-normal`}>Help</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#5D5D5D" />
        </TouchableOpacity>

        {/* FAQ */}
        <TouchableOpacity
          onPress={handleFAQ}
          style={tw`flex-row justify-between items-center px-4 py-4`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon name="file-text" size={24} color="#5D5D5D" style={tw`mr-3`} />
            <Text style={tw`text-base text-[#5D5D5D] font-normal`}>FAQ</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#5D5D5D" />
        </TouchableOpacity>
      </View>

      {/* Delete Account Section */}
      <View
        style={tw`mx-5 bg-white rounded-lg overflow-hidden border border-[#5D5D5D]`}
      >
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={tw`flex-row justify-between items-center px-4 py-4`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon name="trash-2" size={24} color="#D00416" style={tw`mr-3`} />
            <Text style={tw`text-base text-[#D00416] font-normal`}>
              Delete account
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="#5D5D5D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
