import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import tw from "twrnc";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fontWeight?: "normal" | "bold" | "medium";
  textColor?: string;
  bgColor?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  fullWidth = false,
  loading = false,
  disabled = false,
  fontWeight = "bold",
  textColor = "white",
  bgColor = "bg-[#00A082]",
  width = "w-[170px]",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={tw`h-[40px] rounded-lg flex flex-row items-center justify-center px-4 ${
        fullWidth ? "w-full" : width
      } ${disabled ? "bg-gray-400 opacity-50" : bgColor}`}
    >
      {loading ? (
        <View style={tw`flex flex-row items-center gap-2`}>
          <ActivityIndicator size="small" color="white" />
          <Text style={tw`text-${textColor} text-[16px] font-${fontWeight}`}>
            {children}
          </Text>
        </View>
      ) : (
        <Text style={tw`text-${textColor} text-[16px] font-${fontWeight}`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
