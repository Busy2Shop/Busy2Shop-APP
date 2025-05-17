import React from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { Order } from "@/types/interfaces";

interface SingleOrderProps {
  singleOrder: Order;
}

const OrderSummary: React.FC<SingleOrderProps> = ({ singleOrder }) => {
  return (
    <View>
      <View
        style={tw`flex flex-1 flex-col p-3 gap-4 border-[0.5px] rounded-lg border-[#5D5D5D] mb-4`}
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
          <Text style={tw`text-xs text-[#5D5D5D] font-medium text-start`}>
            {`Hi! Good day,
            pls make sure the milk is not expired and if you can find 
            them at that store, you check Globus Supermarket. Thanks.`}
          </Text>
        </View>

        <View style={tw`flex flex-col gap-3`}>
          <Text style={tw`text-base text-[#434343] font-medium`}>
            Shopping List (8 Items)
          </Text>
          <ScrollView
            style={tw`flex flex-1 flex-col p-3 gap-4 bg-[#5D5D5D11] border-[0.5px] rounded-lg border-[#5D5D5D]`}
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
          </ScrollView>
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
    </View>
  );
};

export default OrderSummary;
