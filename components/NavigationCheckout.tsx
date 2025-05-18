import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const NavigationCheckout = () => {
  return (
    <View>
      <View
        style={tw`flex-1 bg-white flex min-h-[373px] flex-1 justify-center flex-col p-3 gap-4 border-[0.5px] rounded-lg border-[#5D5D5D] mb-4 shadow-md`}
      >
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-xl font-semibold `}>Checkout Summary</Text>
          <Text style={tw`text-xs text-start font-medium text-[#5D5D5D]`}>
            Review the items and complete the order
          </Text>
        </View>

        <View style={tw`flex flex-col gap-3`}>
          <Text style={tw`text-base font-medium `}>Items Found (0)</Text>
          <View
            style={tw`flex-1 bg-[#F7F7F7] flex min-h-[247px] flex-1 items-center justify-center flex-col p-3 gap-3 border-[0.5px] rounded-lg border-[#5D5D5D] shadow-md`}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default NavigationCheckout;
