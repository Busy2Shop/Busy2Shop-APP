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
import { ShoppingItem } from "@/types/interfaces";
import tw from "twrnc";

interface SingleOrderProps {
    setSingleOrderPage: (page: number) => void;
}

const ShoppingDetails: React.FC<SingleOrderProps> = ({ setSingleOrderPage }) => {
    const [message, setMessage] = useState<string>("");
    const [isChatFocused, setIsChatFocused] = useState<boolean>(false);

    const singleOrder = AvailableOrder[0];

    const [items, setItems] = useState<ShoppingItem[]>(
        AvailableOrder[0].shoppingList.map((item) => ({
            ...item,
            checked: false,
        }))
    );

    const toggleItem = (index: number) => {
        setItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handlePage = () => {
        setSingleOrderPage(0);
    };

    const handlePurchase = () => {
        setSingleOrderPage(2)
    }

    return (
        <View style={tw`flex-1 flex-col gap-4 bg-[#F7F7F7] max-w-[375px]`}>
            <View style={tw`flex flex-row items-center gap-1`}>
                <TouchableOpacity style={tw`h-6 w-6 `} onPress={handlePage}>
                    <LeftArrowIcon />
                </TouchableOpacity>
                <Text style={tw`text-xl font-medium `}>
                    Shopping for Order #{singleOrder.orderNo}
                </Text>
            </View>

            <ScrollView style={tw`flex-1 flex-col gap-2`}>
                <View
                    style={tw`flex flex-col gap-6 text-[#5D5D5D] font-sm font-normal `}
                >
                    <View style={tw`flex flex-col gap-6 `}>

                        <Text
                            style={tw`flex flex-col justify-between text-[#5D5D5D] font-sm font-normal gap-1`}
                        >
                            <Text style={tw`flex flex-col gap-1`}>
                                {items.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => toggleItem(index)}
                                        className="flex-row items-center mb-2"
                                    >
                                        <View
                                            style={tw`w-6 h-6 border-2 rounded-md mr-2 ${item.checked ? "bg-green-500 border-green-500" : "border-gray-400"
                                                }`}
                                        >
                                            {item.checked && (
                                                <Text className="text-white text-center">✓</Text>
                                            )}
                                        </View>
                                        <Text className={item.checked ? "line-through text-gray-500" : ""}>
                                            {item.name} ({item.quantity} {item.unit}){" "}
                                        </Text>
                                    </TouchableOpacity>
                                ))}

                            </Text>
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
                                    style={tw`flex-row w-[250px] h-10 mx-2 items-center border rounded-lg px-3 bg-white ${isChatFocused ? "border-[#00A082]" : "border-gray-300"
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

                        <Button fontWeight="medium" fullWidth={true} onPress={handlePurchase}>Confirm Purchase</Button>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ShoppingDetails;
