import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Button from "@/components/Button";
import { AvailableOrder } from "@/constants/constants";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import tw from "twrnc";

interface SingleOrderProps {
  setPage: (page: number) => void;
}

const SingleOrder: React.FC<SingleOrderProps> = ({ setPage }) => {
  const [message, setMessage] = useState<string>("");
  const [isChatFocused, setIsChatFocused] = useState<boolean>(false);
  const singleOrder = AvailableOrder[0];

  const handlePage = () => {
    setPage(0);
  };

  return (
    <View style={tw`flex-1 flex-col gap-4 bg-[#F7F7F7] max-w-[375px]`}>
      <View style={tw`flex flex-row items-center gap-1`}>
        <TouchableOpacity style={tw`h-6 w-6 `} onPress={handlePage}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`text-xl font-medium `}>
          Order #{singleOrder.orderNo}
        </Text>
      </View>

      <ScrollView style={tw`flex-1 flex-col gap-2`}>
        <View
          style={tw`flex flex-col gap-6 text-[#5D5D5D] font-sm font-normal `}
        >
          <View style={tw`flex flex-col gap-3 `}>
            <Text
              style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>
                Customer’s phone number:
              </Text>
              <Text>{singleOrder.phoneNumber}</Text>
            </Text>
            <Text
              style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>Supermarket:</Text>
              <Text>{singleOrder.superMarket}</Text>
            </Text>
            <Text
              style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>
                Delivery location:
              </Text>
              <Text>{singleOrder.deliveryLocation}</Text>
            </Text>
            <Text
              style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>Shopping List:</Text>
              <Text style={tw`flex flex-col gap-1`}>
                {singleOrder.shoppingList.map((item) => (
                  <View key={item.name}>
                    <Text>
                      {item.name} ({item.quantity} {item.unit}){" "}
                    </Text>
                  </View>
                ))}
              </Text>
            </Text>
            <Text
              style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>
                Additional Notes:
              </Text>
              <Text>{singleOrder.additionalNotes}</Text>
            </Text>
            <Text
              style={tw`flex flex-row text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw``}>Estimated Budget:</Text>
              <Text>{singleOrder.budget}</Text>
            </Text>

            <View style={tw`h-[321px] border border-[0.5px] rounded-lg  `}>
              <Text
                style={tw`text-base text-[#2A2A2A] font-medium h-10 bg-[#DDDDDD] px-3 py-2`}
              >
                Chat with Customer
              </Text>
              <View style={tw`flex items-center my-8 `}>
                <View style={tw`ml-20`}>
                  <Image
                    source={require("../assets/images/chat-image.png")}
                    style={{ width: 233, height: 143 }}
                  />
                </View>
              </View>

              <View style={tw`flex-row items-center px-3 mb-4`}>
                <View style={tw`flex-1 h-px bg-[#777777] `} />
              </View>

              <View className="flex flex-row items-center gap-1 px-3 ">
                <View
                  style={tw`flex-row w-[250px] h-10 mx-2 items-center border rounded-lg px-3 bg-white ${
                    isChatFocused ? "border-[#00A082]" : "border-gray-300"
                  }`}
                >
                  <TextInput
                    style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                    placeholder="Type your message here..."
                    value={message}
                    onChangeText={setMessage}
                    onFocus={() => setIsChatFocused(true)}
                    onBlur={() => setIsChatFocused(false)}
                    selectionColor="transparent"
                  />
                  <TouchableOpacity style={tw`h-6 w-6 `}>
                    <CameraIcon />
                  </TouchableOpacity>
                </View>
                <View>
                  <Button fontWeight="medium" width="w-[56px]">
                    Send
                  </Button>
                </View>
              </View>
            </View>
            <View style={tw`flex flex-row gap-2 mx-auto`}>
              <Button fontWeight="medium">Start Shopping</Button>
              <Button
                fontWeight="medium"
                bgColor="bg-[#FFE6E8]"
                textColor="[#D00416]"
              >
                Cancel Order
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleOrder;
