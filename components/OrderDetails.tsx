import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "@/components/Button";
import { AvailableOrder } from "@/constants/constants";
import tw from "twrnc";

import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import MessagesIcon from "@/assets/icons/messages.svg";
import ShoppingCartIcon from "@/assets/icons/shopping-cart.svg";
import OrderSummary from "./OrderReview";
import DetailsNavbar from "./OrderDetailsNav";

interface SingleOrderProps {
  setOrderPage: (page: number) => void;
  setSingleOrderPage: (page: number) => void;
}

const OrderDetails: React.FC<SingleOrderProps> = ({
  setOrderPage,
  setSingleOrderPage,
}) => {
  const singleOrder = AvailableOrder[0];
  const [activeButton, setActiveButton] = useState<string>("Review Order");

  const handlePage = () => {
    setOrderPage(0);
  };

  const handleSingleOrderPage = () => {
    setSingleOrderPage(1);
  };

  return (
    <View style={tw`flex-1 bg-[#F7F7F7] max-w-[375px]`}>
      <TouchableOpacity style={tw`h-6 w-6 mb-2`} onPress={handlePage}>
        <LeftArrowIcon />
      </TouchableOpacity>

      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={tw`pb-8 gap-4`}
      >
        <View
          style={tw`flex flex-col p-3 gap-[10px] border-[0.5px] rounded-lg border-[#5D5D5D]`}
        >
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text style={tw`text-xl font-semibold `}>
              Order #{singleOrder.orderNo}
            </Text>
            <TouchableOpacity style={tw`h-6 w-6 `}>
              <MessagesIcon />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-col items-start gap-4`}>
            <View style={tw`flex flex-col items-start font-medium`}>
              <Text style={tw`flex gap-1 items-start text-[#5D5D5D] text-sm`}>
                <Text>Customer:</Text>
                <Text>Jane Smith</Text>
              </Text>
              <Text style={tw`flex gap-1 items-start text-[#5D5D5D] text-sm`}>
                {singleOrder.deliveryLocation}
              </Text>
              <Text style={tw`flex gap-1 items-start text-[#5D5D5D] text-sm`}>
                <Text>Phone Number:</Text>
                <Text>{singleOrder.phoneNumber}</Text>
              </Text>
            </View>
            <View
              style={tw`flex flex-row gap-1 items-center justify-center py-[2px] px-1 bg-[#5D5D5D] w-[98px] h-6 text-[#F7F7F7] rounded-lg`}
            >
              <View style={tw`h-[14px] w-[14px]`}>
                <ShoppingCartIcon />
              </View>
              <Text style={tw` text-[#F7F7F7] text-xs font-medium`}>
                Reviewing
              </Text>
            </View>
          </View>
        </View>

        <DetailsNavbar
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        <OrderSummary singleOrder={singleOrder} />

        <View style={tw`mt-4 mb-14`}>
          <Button fullWidth fontWeight="medium" onPress={handleSingleOrderPage}>
            Navigate to Store
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
