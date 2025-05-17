import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import NavigationIcon from "@/assets/icons/navigation.svg";
import ArrivedIcon from "@/assets/icons/arrived.svg";

const ShoppingNavigation = () => {
  return (
    <View>
      <View
        style={tw`flex-1 bg-white flex min-h-[437px] flex-1 items-center justify-center flex-col p-3 gap-3 border-[0.5px] rounded-lg border-[#5D5D5D] mb-4 shadow-md`}
      >
        <View style={tw`h-[60px] w-[60px] flex items-center`}>
          <NavigationIcon />
        </View>

        <View style={tw`flex flex-col items-center justify-center`}>
          <Text style={tw`text-xl font-semibold `}>Navigation to Store</Text>
          <Text style={tw`text-xs text-center font-medium text-[#5D5D5D]`}>
            Follow the In-app directions to reach shoprite Market at Lekki Phase
            1, Lagos
          </Text>
        </View>

        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center h-10 w-[195px] rounded-lg text-xs gap-1 bg-[#00A082] border-[0.5px] border-[#5D5D5D] rounded-lg`}
        >
          <View style={tw`h-5 w-5`}>
            <ArrivedIcon />
          </View>
          <Text style={tw`text-center text-base font-medium text-white `}>
            Mark as Arrived
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingNavigation;
