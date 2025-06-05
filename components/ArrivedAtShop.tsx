import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import ArrivedIcon from "@/assets/icons/arrived-store.svg";
import ShoppingIcon from "@/assets/icons/shopping-bag.svg";

const ArrivedStore = () => {
  return (
    <View>
      <View
        style={tw`flex-1 bg-white flex min-h-[437px] flex-1 items-center justify-center flex-col p-3 gap-3 border-[0.5px] rounded-lg border-[#5D5D5D] mb-4 shadow-md`}
      >
        <View style={tw`h-[60px] w-[60px] flex items-center`}>
          <ArrivedIcon />
        </View>

        <View style={tw`flex flex-col items-center justify-center`}>
          <Text style={tw`text-xl font-semibold `}>Arrived at Store</Text>
          <Text style={tw`text-xs text-center font-medium text-[#5D5D5D]`}>
            You’ve arrived at Shoprite Market. Ready to start shopping?
          </Text>
        </View>

        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center h-10 w-[195px] rounded-lg text-xs gap-1 bg-[#00A082] border-[0.5px] border-[#5D5D5D] rounded-lg`}
        >
          <View style={tw`h-5 w-5 text-white`}>
            <ShoppingIcon />
          </View>
          <Text style={tw`text-center text-base font-medium text-white `}>
            Start Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArrivedStore;
