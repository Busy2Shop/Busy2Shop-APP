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
  const eyeOpen = require("../assets/images/eye-slash.png"); // Fixed this - was using eye-slash for both

  // Check if the field is a password field
  const isPasswordField = title === "Password" || title === "Confirm Password";

  return (
    <View className={`space-y-2 ${otherStyles} flex`}>
      <Text className="text-base  font-medium">{title}</Text>

      <View className="flex w-full h-16 px-4 border border-[#5D5D5D] rounded-md flex-row items-center justify-between">
        <TextInput
          className="flex-1 text-base font-semibold text-[#5D5D5D]"
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2 text-[#5D5D5D]"
          >
            <Image
              source={showPassword ? eyeOpen : eyeClose}
              className="w-5 h-5"
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
