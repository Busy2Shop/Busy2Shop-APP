import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Order } from "@/types/interfaces";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CloseCircleIcon from "@/assets/icons/close-circle.svg";

interface SingleOrderProps {
  singleOrder: Order;
}

const ShoppingProgress: React.FC<SingleOrderProps> = ({ singleOrder }) => {
  const [checkItem, setCheckItem] = useState<boolean[]>([false, false, false]);

  const handleClick = (index: number) => {
    setCheckItem((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleClear = (index: number) => {
    setCheckItem((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  return (
    <View>
      <View
        style={tw`flex flex-1 flex-col p-3 gap-4 border-[0.5px] bg-white rounded-lg border-[#5D5D5D] mb-4`}
      >
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-xl font-semibold `}>Shopping in Progress</Text>
          <Text style={tw`text-xs font-medium text-[#5D5D5D]`}>
            0 of 8 items found (0% complete)
          </Text>
        </View>

        <View style={tw`flex flex-col gap-3`}>
          <ScrollView
            style={tw`flex flex-1 flex-col p-3 gap-4 bg-[#5D5D5D11] border-[0.5px] rounded-lg border-[#5D5D5D]`}
          >
            <Text style={tw`flex flex-col gap-1`}>
              {singleOrder.shoppingList.map((item, index) => (
                <View style={tw`flex flex-col gap-[0.5px]`} key={index}>
                  <View style={tw`flex flex-row items-center justify-between`}>
                    <Text style={tw`text-base font-medium text-[#434343]`}>
                      {item.name}
                    </Text>

                    <View style={tw`flex flex-row items-center gap-2`}>
                      <TouchableOpacity
                        style={tw`flex flex-col justify-center items-center h-[14px] w-[14px]  w-[30px] h-6 ${
                          checkItem[index]
                            ? "bg-[#00A082] text-white"
                            : "border-[#5D5D5D] border-[0.5px] "
                        }  rounded-lg text-[#5D5D5D]`}
                        onPress={() => handleClick(index)}
                      >
                        <CheckCircleIcon
                          style={tw`${
                            checkItem[index] ? "text-white" : "text-[#5D5D5D]"
                          }`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tw`flex flex-col justify-center items-center h-[14px] w-[14px] text-[#5D5D5D] w-[30px] h-6 border-[#5D5D5D] border-[0.5px] rounded-lg`}
                        onPress={() => handleClear(index)}
                      >
                        <CloseCircleIcon />
                      </TouchableOpacity>
                    </View>
                  </View>

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
    </View>
  );
};

export default ShoppingProgress;
