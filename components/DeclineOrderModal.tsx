import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import tw from "twrnc";

interface DeclineOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reasonData: { reason: string; isOther: boolean }) => void;
}

const DeclineOrderModal: React.FC<DeclineOrderModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "Item(s) not available at the market",
    "Location too far",
    "Market is closed",
    "I'm currently busy",
    "Weather issues",
    "Other reason (optional)",
  ];

  const handleSubmit = () => {
    // Prepare the reason data to submit
    const reasonData = {
      reason:
        selectedReason === "Other reason (optional)"
          ? otherReason
          : selectedReason || "",
      isOther: selectedReason === "Other reason (optional)",
    };
    onSubmit(reasonData);
    // Reset state after submission
    setSelectedReason(null);
    setOtherReason("");
  };

  const handleCancel = () => {
    // Reset state and close modal
    setSelectedReason(null);
    setOtherReason("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={tw`flex-1 justify-center items-center bg-[#0000004D]`}>
        <View style={tw`bg-white w-11/12 rounded-lg p-5`}>
          <TouchableOpacity
            onPress={handleCancel}
            style={tw`absolute top-4 right-4`}
          >
            <View
              style={tw`w-6 h-6 rounded-full border border-gray-300 flex  items-center justify-center`}
            >
              <Text style={tw`text-gray-500  font-medium`}>×</Text>
            </View>
          </TouchableOpacity>
          <View>
            <View style={tw`flex flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl mt-8 font-medium text-[#2A2A2A]`}>
                Why are you declining this order
              </Text>
            </View>
          </View>

          <View style={tw`mb-4`}>
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={tw`flex flex-row items-center mb-3`}
                onPress={() => setSelectedReason(reason)}
              >
                <View
                  style={tw`w-5 h-5 rounded-full border border-gray-300 ${
                    selectedReason === reason ? "border-[#00A082]" : ""
                  } flex items-center justify-center`}
                >
                  {selectedReason === reason && (
                    <View style={tw`w-3 h-3 rounded-full bg-[#00A082]`} />
                  )}
                </View>
                <Text style={tw`ml-2 text-[#2A2A2A]`}>{reason}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedReason === "Other reason (optional)" && (
            <TextInput
              style={tw`border border-gray-300 rounded-md p-3 mb-4 text-[#2A2A2A]`}
              placeholder="Please specify your reason"
              value={otherReason}
              onChangeText={setOtherReason}
              multiline
            />
          )}

          <TouchableOpacity
            style={tw`bg-[#00A082] py-3 rounded-md items-center mb-2`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-white font-medium`}>Submit Reason</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`border border-gray-300 py-3 rounded-md items-center`}
            onPress={handleCancel}
          >
            <Text style={tw`text-[#2A2A2A] font-medium`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeclineOrderModal;
