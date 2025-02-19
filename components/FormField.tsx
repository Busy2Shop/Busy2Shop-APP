import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const eyeClose = require("../assets/images/eye-slash.png");
  const eyeOpen = require("../assets/images/eye-slash.png");

  return (
    <View className={`space-y-2 ${otherStyles} flex`}>
      <Text className="text-base text-gray-100 font-medium">{title}</Text>

      <View className=" flex w-full h-16 px-4 border border-[#5D5D5D] rounded-md justify-between flex-row  ">
        <TextInput
          className=" flex flex-row justify-between text-base font-semibold text-white"
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? eyeOpen : eyeClose}
              className="w-5 h-5"
              resizeMode="contain"
              style={{ width: 20, height: 20 }} // Fallback for styling issues
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
