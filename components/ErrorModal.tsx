import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { X } from "lucide-react-native";

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  onClose,
  title,
  message,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white w-4/5 rounded-xl p-6 shadow-lg`}>
          {/* Header with title and close button */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-red-500 font-bold text-xl`}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#FF0000" />
            </TouchableOpacity>
          </View>

          {/* Red line separator */}
          <View style={tw`w-full h-0.5 bg-red-500 mb-4`} />

          {/* Error message */}
          <Text style={tw`text-gray-700 text-base mb-6`}>{message}</Text>

          {/* Close button */}
          <TouchableOpacity
            style={tw`bg-red-500 py-3 rounded-lg`}
            onPress={onClose}
          >
            <Text style={tw`text-white font-bold text-center`}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
