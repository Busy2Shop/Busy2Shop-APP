import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import tw from "twrnc";
import CameraIcon from "@/assets/icons/camera.svg";
import CloseIcon from "@/assets/icons/close-circle.svg";

interface SubstitutionModalProps {
  visible: boolean;
  onClose: () => void;
  item: {
    name: string;
    quantity: string;
    note: string;
  };
}

const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  visible,
  onClose,
  item,
}) => {
  const [note, setNote] = useState<string>("");
  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false);

  const handleSendRequest = () => {
    // Handle the substitution request logic here
    onClose();
  };

  const handleTakePhoto = () => {
    // In a real app, this would trigger the camera
    setIsPhotoTaken(true);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center p-4`}
      >
        <View style={tw`bg-white rounded-lg w-full max-w-[350px] p-4`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-semibold`}>Request Substitution</Text>
            <TouchableOpacity onPress={onClose}>
              <CloseIcon width={20} height={20} color="#5D5D5D" />
            </TouchableOpacity>
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-[#5D5D5D]`}>
              {item.name} is not available. Request a substitution from the
              customer.
            </Text>
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`font-medium mb-1`}>Note to Customer</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 min-h-[80px]`}
              placeholder="Describe the available alternatives or ask for preferences..."
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`font-medium mb-2`}>
              Take a Photo of Alternatives
            </Text>
            <TouchableOpacity
              style={tw`border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-32`}
              onPress={handleTakePhoto}
            >
              {isPhotoTaken ? (
                <View
                  style={tw`w-full h-full bg-gray-100 flex items-center justify-center rounded`}
                >
                  <Text style={tw`text-gray-500`}>Photo Preview</Text>
                </View>
              ) : (
                <>
                  <CameraIcon width={32} height={32} color="#5D5D5D" />
                  <Text style={tw`mt-2 text-[#5D5D5D]`}>Take Photo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity
              style={tw`flex-1 py-3 border border-[#00A082] rounded-lg items-center`}
              onPress={onClose}
            >
              <Text style={tw`text-[#00A082] font-medium`}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 py-3 bg-[#00A082] rounded-lg items-center ${
                !note && !isPhotoTaken ? "opacity-50" : ""
              }`}
              onPress={handleSendRequest}
              disabled={!note && !isPhotoTaken}
            >
              <Text style={tw`text-white font-medium`}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubstitutionModal;
