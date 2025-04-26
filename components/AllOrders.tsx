import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "@/components/Button";
import { AvailableOrder } from "@/constants/constants";
import OrderIcon from "@/assets/icons/box.svg";
import tw from "twrnc";

interface AllOrdersProps {
  setPage: (page: number) => void;
}
const AllOrders: React.FC<AllOrdersProps> = ({ setPage }) => {
  const handlePress = () => {
    setPage(1);
  };

  return (
    <View style={tw`flex-1 flex-col gap-4 bg-[#F7F7F7] max-w-[375px]`}>
      <View style={tw`flex flex-row gap-1 mx-auto`}>
        <Button
          fontWeight="medium"
          textColor="[#00A082]"
          bgColor="bg-transparent"
          borderStyling="border border-[#00A082]"
          width="w-[160px]"
        >
          Refresh
        </Button>
        <Button width="w-[160px]" fontWeight="medium">
          Go Offline
        </Button>
      </View>

      <View style={tw`flex-1 flex-col gap-2`}>
        <Text style={tw`text-base font-medium text-[#2A2A2A]`}>
          Available Orders Near You
        </Text>

        <ScrollView style={tw`min-h-[700px] flex-1`}>
          <View
            style={tw`flex flex-col gap-6 text-[#5D5D5D] font-sm font-normal `}
          >
            {AvailableOrder.map((order) => (
              <View
                style={tw`flex flex-col gap-3 bg-white border-[#5D5D5D] border-[0.5px] px-3 py-4 rounded-lg`}
              >
                <Text
                  style={tw`flex flex-row justify-between text-[#5D5D5D] font-sm font-normal items-center`}
                >
                  <Text>Order #{order.orderNo}</Text>
                  <OrderIcon />
                </Text>
                <Text
                  style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
                >
                  <Text style={tw`text-[#2A2A2A]`}>Supermarket:</Text>
                  <Text>{order.superMarket}</Text>
                </Text>
                <Text
                  style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
                >
                  <Text style={tw`text-[#2A2A2A]`}>Delivery location:</Text>
                  <Text>{order.deliveryLocation}</Text>
                </Text>
                <Button fullWidth={true} onPress={handlePress}>
                  Accept Order
                </Button>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllOrders;
