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
  setSingleOrderPage: (page: number) => void;
}

const DeliveryDetails: React.FC<SingleOrderProps> = ({
  setSingleOrderPage,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isChatFocused, setIsChatFocused] = useState<boolean>(false);
  const [confirmationPin, setConfirmationPin] = useState<string>("");
  const [pinInputFocus, setPinInputFocus] = useState<boolean>(false);

  const singleOrder = AvailableOrder[0];

  const handlePage = () => {
    setSingleOrderPage(1);
  };

  return (
    <View style={tw`flex-1 flex-col gap-4 bg-[#F7F7F7] max-w-[375px]`}>
      <View style={tw`flex flex-row items-center gap-1`}>
        <TouchableOpacity style={tw`h-6 w-6 `} onPress={handlePage}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`text-xl font-medium `}>
          Delivery for Order #{singleOrder.orderNo}
        </Text>
      </View>

      <ScrollView style={tw`flex-1 flex-col gap-2`}>
        <View style={tw`flex flex-col gap-6 text-[#5D5D5D] font-normal `}>
          <View style={tw`flex flex-col gap-3 `}>
            <Text
              style={tw`flex flex-row items-center text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>Name:</Text>
              <Text>Lucy</Text>
            </Text>
            <Text
              style={tw`flex flex-row items-center text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>Address:</Text>
              <Text>{singleOrder.deliveryLocation}</Text>
            </Text>
            <Text
              style={tw`flex flex-row items-center text-[#5D5D5D] font-sm font-normal gap-1`}
            >
              <Text style={tw`text-[#2A2A2A] text-base`}>Phone:</Text>
              <Text>{singleOrder.phoneNumber}</Text>
            </Text>
          </View>
          <View style={tw`flex flex-col gap-6 `}>
            <View style={tw` border border-[0.5px] rounded-lg  px-3 `}>
              <Text style={tw`text-base text-[#2A2A2A] font-medium h-10 py-2`}>
                Live Tracking
              </Text>
              <View style={tw`3 pb-4`}>
                <Image
                  source={require("../assets/images/live-tracking.png")}
                  style={{ width: 329, height: 140 }}
                />
              </View>
            </View>

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

            <View style={tw``}>
              <Text style={tw`text-base font-medium text-[#434343] px-3`}>
                Order Confirmation Pin
              </Text>
              <View
                style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                  pinInputFocus ? "border-[#00A082]" : "border-gray-300"
                }`}
              >
                <TextInput
                  style={tw`flex-1 py-3 px-3 text-base border-0 focus:outline-none`}
                  placeholder="0123"
                  value={confirmationPin}
                  onChangeText={setConfirmationPin}
                  onFocus={() => setPinInputFocus(true)}
                  onBlur={() => setPinInputFocus(false)}
                  selectionColor="transparent"
                />
              </View>
            </View>

            <Button fontWeight="medium" fullWidth={true}>
              Mark as Delivered
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryDetails;
