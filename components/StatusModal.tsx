import { View, Text, Image } from "react-native";
import React from "react";

interface SuccessModalProps {
  text: string;
}
export const SuccessModal: React.FC<SuccessModalProps> = ({ text }) => {
  return (
    <View className="bg-pink-500 w-52 h-32 items-center justify-center">
      <Image
        source={require("../assets/images/tick-circle.png")}
        className="w-10 h-10"
      />

      <Text className="text-primaryText pt-3">{text}</Text>
    </View>
  );
};

export const ErrorModal = () => {
  return (
    <View>
      <Text>Error Modal</Text>
    </View>
  );
};
