import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import tw from "twrnc";
import SuccessIcon from "@/assets/icons/Check-duotone.svg";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  Message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  Message,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={tw`flex-1 justify-center items-center bg-[#0000004D]`}>
        <View
          style={tw`bg-white w-11/12 rounded-lg p-5 items-center justify-center `}
        >
          <SuccessIcon
            width={78}
            height={78}
            style={tw`text-gray-500 mt-[20px]`}
          />
          <Text style={tw`text-[20px] text-[#323135] font-500`}>{Message}</Text>

          <TouchableOpacity
            style={tw`bg-[#00A082] py-3 rounded-md items-center mt-8 w-full`}
            onPress={onClose}
          >
            <Text style={tw`text-white font-medium`}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
