import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "@/components/Button";
import { AvailableOrder } from "@/constants/constants";
import tw from "twrnc";

import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import MessagesIcon from "@/assets/icons/messages.svg";
import CheckoutIcon from "@/assets/icons/checkout-card.svg";
import OrderSummary from "./OrderReview";
import DetailsNavbar from "./OrderDetailsNav";
import CompleteCheckout from "./CompleteCheckout";
import CheckCircle from "@/assets/icons/check-circle.svg";

interface SingleOrderProps {
  setSingleOrderPage: (page: number) => void;
}

const CheckoutPage: React.FC<SingleOrderProps> = ({ setSingleOrderPage }) => {
  const singleOrder = AvailableOrder[0];
  const [activeButton, setActiveButton] = useState<string>("Review Order");
  const [buttonTitle, setButtonTitle] = useState<string>("Complete Order");
  const [flag, setFlag] = useState<string>("Checkout");

  const handlePage = () => {
    if (flag === "Completed") {
      setFlag("Checkout");
      setButtonTitle("Complete Order");
    } else {
      setSingleOrderPage(3);
    }
  };

  const handleClick = () => {
    setButtonTitle("Proceed to Disptach");
    setFlag("Completed");
  };

  return (
    <View style={tw`flex-1 flex-col gap-4 bg-[#F7F7F7] max-w-[375px]`}>
      <TouchableOpacity style={tw`h-6 w-6 `} onPress={handlePage}>
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
              style={tw`flex flex-row gap-1 items-center px-4 justify-between py-[2px] px-1 ${
                flag === "Checkout" ? "bg-[#F97216]" : "bg-[#1FC16B]"
              } h-6 text-[#F7F7F7] rounded-lg`}
            >
              {flag === "Checkout" ? (
                <View style={tw`h-[14px] w-[14px] text-white`}>
                  <CheckoutIcon />
                </View>
              ) : (
                <View style={tw`h-[14px] w-[14px] text-white`}>
                  <CheckCircle />
                </View>
              )}

              <Text style={tw` text-[#F7F7F7] text-xs font-medium`}>
                {flag}
              </Text>
            </View>
          </View>
        </View>

        <DetailsNavbar
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        {activeButton === "Review Order" && (
          <OrderSummary singleOrder={singleOrder} />
        )}

        {activeButton === "Checkout" && (
          <CompleteCheckout singleOrder={singleOrder} />
        )}

        {activeButton !== "Shopping" && (
          <View style={tw`mt-4 mb-14`}>
            <Button fullWidth fontWeight="medium" onPress={handleClick}>
              {buttonTitle}
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CheckoutPage;
