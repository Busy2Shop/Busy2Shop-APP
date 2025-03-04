import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = () => {
  return (
    <TouchableOpacity className="bg-[#00A082] rounded-xl min-h-[62px] justify-center items-center mt-7">
      <Text>Custom Button</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
