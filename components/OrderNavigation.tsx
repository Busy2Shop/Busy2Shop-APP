import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "@/components/Button";
import { AvailableOrder } from "@/constants/constants";
import tw from "twrnc";

import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import MessagesIcon from "@/assets/icons/messages.svg";
import NavigationIcon from "@/assets/icons/direct-up-white.svg";

interface SingleOrderProps {
  setSingleOrderPage: (page: number) => void;
}

const OrderNavigation: React.FC<SingleOrderProps> = ({
  setSingleOrderPage,
}) => {
  const singleOrder = AvailableOrder[0];
  const [activeButton, setActiveButton] = useState<string>("Review Order");

  const handlePage = () => {
    setSingleOrderPage(0);
  };

  const handleSingleOrderPage = () => {
    setSingleOrderPage(2);
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
              style={tw`flex flex-row gap-1 items-center justify-center py-[2px] px-1 bg-[#0069CC] w-[102px] h-6 text-[#F7F7F7] rounded-lg`}
            >
              <View style={tw`h-[14px] w-[14px]`}>
                <NavigationIcon />
              </View>
              <Text style={tw` text-[#F7F7F7] text-xs font-medium`}>
                Navigating
              </Text>
            </View>

            <TouchableOpacity
              style={tw`flex items-center justify-center h-10 w-[150px] rounded-lg text-xs bg-white border-[0.5px] border-[#5D5D5D] rounded-lg`}
              onPress={() => setActiveButton("Review Order")}
            >
              <Text style={tw` text-base font-medium text-[#434343] `}>
                Mark as Arrived
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={tw`flex flex-row items-center justify-between bg-[#EBF9F6] border-[0.5px] border-[#00A082] rounded-lg h-10 p-1`}
        >
          <TouchableOpacity
            style={tw`flex items-center justify-center h-8 w-[100px] rounded-lg text-xs ${
              activeButton === "Review Order" ? "bg-[#00A082]" : "bg-[#EBF9F6]"
            }`}
            onPress={() => setActiveButton("Review Order")}
          >
            <Text
              style={tw` ${
                activeButton === "Review Order"
                  ? "text-[#F7F7F7]"
                  : "text-[#5D5D5D]"
              }`}
            >
              Review Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex items-center justify-center h-8 w-[100px] rounded-lg text-xs ${
              activeButton === "Shopping" ? "bg-[#00A082]" : "bg-[#EBF9F6]"
            } `}
            onPress={() => setActiveButton("Shopping")}
          >
            <Text
              style={tw` ${
                activeButton === "Shopping"
                  ? "text-[#F7F7F7]"
                  : "text-[#5D5D5D]"
              }`}
            >
              Shopping
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex items-center justify-center h-8 w-[100px] rounded-lg text-xs ${
              activeButton === "Checkout" ? "bg-[#00A082]" : "bg-[#EBF9F6]"
            }`}
            onPress={() => setActiveButton("Checkout")}
          >
            <Text
              style={tw` ${
                activeButton === "Checkout"
                  ? "text-[#F7F7F7]"
                  : "text-[#5D5D5D]"
              }`}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={tw`flex flex-col p-3 gap-4 border-[0.5px] rounded-lg border-[#5D5D5D]`}
        >
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-xl font-semibold `}>Order Review</Text>
            <Text style={tw`text-xs font-medium text-[#5D5D5D]`}>
              Review the complete Shopping list and customer instructions before
              starting.
            </Text>
          </View>
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-base text-[#434343] font-medium`}>
              Customer Instructions
            </Text>
            <Text style={tw`text-xs text-[#5D5D5D] font-medium`}>{`Hi! Good day,
pls make sure the milk is not expired and if you can find them at that store, you check Globus Supermarket. 
Thanks.`}</Text>
          </View>

          <View style={tw`flex flex-col gap-3`}>
            <Text style={tw`text-base text-[#434343] font-medium`}>
              Shopping List (8 Items)
            </Text>
            <View
              style={tw`flex flex-col p-3 gap-4 bg-[#5D5D5D11] border-[0.5px] rounded-lg border-[#5D5D5D]`}
            >
              <Text style={tw`flex flex-col gap-1`}>
                {singleOrder.shoppingList.map((item) => (
                  <View style={tw`flex flex-col gap-[0.5px]`} key={item.name}>
                    <Text style={tw`text-base font-medium text-[#434343]`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-normal font-medium text-[#5D5D5D]`}>
                      {item.quantity} x {item.unit}
                    </Text>
                    <Text
                      style={tw`flex flex-row gap-1 text-normal font-medium text-[#5D5D5D]`}
                    >
                      <Text style={tw`text-normal font-medium text-[#5D5D5D]`}>
                        Note:{" "}
                      </Text>
                      <Text style={tw`text-normal font-medium text-[#5D5D5D]`}>
                        {singleOrder.additionalNotes}
                      </Text>
                    </Text>

                    <View style={tw`flex-row items-center my-2`}>
                      <View style={tw`flex-1 h-[0.5px] bg-[#777777] `} />
                    </View>
                  </View>
                ))}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={tw`flex flex-col p-3 gap-1 border-[0.5px] rounded-lg border-[#5D5D5D]`}
        >
          <Text style={tw`text-base font-medium text-[#434343]`}>
            Store Information
          </Text>
          <Text style={tw`flex flex-col`}>
            <Text style={tw`text-xs font-medium text-[#5D5D5D]`}>
              {singleOrder.superMarket}
            </Text>
            <Text style={tw`text-xs font-medium text-[#5D5D5D]`}>
              {singleOrder.deliveryLocation}
            </Text>
          </Text>
        </View>
        <View style={tw`mt-4 mb-14`}>
          <Button fullWidth fontWeight="medium" onPress={handleSingleOrderPage}>
            Mark as Arrived
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderNavigation;
