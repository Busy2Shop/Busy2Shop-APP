import React from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { Order } from "@/types/interfaces";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";

interface SingleOrderProps {
  singleOrder: Order;
}

const CompleteCheckout: React.FC<SingleOrderProps> = ({ singleOrder }) => {
  return (
    <View>
      <View
        style={tw`flex flex-1 flex-col p-3 gap-4 border-[0.5px] bg-white rounded-lg border-[#5D5D5D] mb-4`}
      >
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-xl font-semibold `}>Checkout Summary</Text>
          <Text style={tw`text-xs font-medium text-[#5D5D5D]`}>
            0 of 8 items found (0% complete)
          </Text>
        </View>

        <Text style={tw`text-base font-medium text-[#434343] `}>
          Items Found (18)
        </Text>

        <View style={tw`flex flex-col gap-3`}>
          <ScrollView
            style={tw`flex flex-1 flex-col p-3 gap-4 bg-[#5D5D5D11] border-[0.5px] rounded-lg border-[#5D5D5D]`}
          >
            <Text style={tw`flex flex-col gap-1`}>
              {singleOrder.shoppingList.map((item, index) => (
                <View style={tw`flex flex-col gap-[0.5px]`} key={index}>
                  <View style={tw`flex flex-row items-center gap-1`}>
                    <CheckCircleIcon
                      style={tw` text-[#1FC16B]
                        `}
                    />

                    <Text style={tw`text-base font-medium text-[#434343]`}>
                      {item.name}
                    </Text>
                  </View>

                  <Text
                    style={tw`text-normal font-medium text-[#5D5D5D] pl-[18px]`}
                  >
                    {item.quantity} x {item.unit}
                  </Text>

                  <View style={tw`flex-row items-center my-2`}>
                    <View style={tw`flex-1 h-[0.5px] bg-[#777777] `} />
                  </View>
                </View>
              ))}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CompleteCheckout;
