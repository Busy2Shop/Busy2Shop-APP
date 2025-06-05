import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useRouter } from "expo-router";
import SuccessModal from "@/components/SuccessModal";

const EditProfile = () => {
  const router = useRouter();
  const [isSuccessModalVisible, setShowSuccessModal] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "John Bruno",
    email: "lucigia124@gmail.com", // Not editable
    gender: "Female",
    phone: "+234 123 4567 892",
    address: "Ikeja City Mall, Obafemi Awolowo Wy",
  });

  interface FormData {
    name: string;
    email: string;
    gender: string;
    phone: string;
    address: string;
  }

  type FormField = keyof FormData;

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Show success modal
    setShowSuccessModal(true);

    // Automatically close modal after 2 seconds and navigate back
    setTimeout(() => {
      setShowSuccessModal(false);
      router.back();
    }, 2000);
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Top green header */}
      <View style={tw`bg-[#00A082] rounded-b-2xl`}>
        <View style={tw`flex flex-row items-center mt-[24px] px-5 mt-14`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`w-6 h-6 md:hidden`}
          >
            <Image
              source={require("../../../assets/images/arrow-left.png")}
              style={tw`bottom-0 w-6 h-6`}
            />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-[#F7F7F7] pl-[3px] text-[20px] font-500`}>
              Edit Profile
            </Text>
          </View>
        </View>

        <View style={tw`flex flex-row justify-center mt-8 relative`}>
          <Image
            source={require("../../../assets/images/Avatar.png")}
            style={tw`w-[80px] h-[80px]`}
          />
        </View>

        <View
          style={tw`flex flex-row justify-center items-center mt-[8px] mb-[24px]`}
        >
          <View>
            <Text style={tw`text-base text-[#F7F7F7] font-medium`}>
              {formData.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Form content */}
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-5 py-6`}
      >
        {/* Name Field */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-[#5D5D5D] mb-2`}>Name</Text>
          <TextInput
            style={tw`border border-[#CCCCCC] rounded-lg p-3 text-[#333333]`}
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>

        {/* Email Field - Not Editable */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-[#5D5D5D] mb-2`}>Email address</Text>
          <View style={tw`border border-[#CCCCCC] bg-[#F5F5F5] rounded-lg p-3`}>
            <Text style={tw`text-[#888888]`}>{formData.email}</Text>
          </View>
        </View>

        {/* Gender Field - Dropdown */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-[#5D5D5D] mb-2`}>Gender</Text>
          <Pressable
            style={tw`border border-[#CCCCCC] rounded-lg p-3 flex-row justify-between items-center relative`}
            onPress={() => setGenderDropdownOpen(!genderDropdownOpen)}
          >
            <Text style={tw`flex-1 text-[#333333]`}>{formData.gender}</Text>
            <Image
              source={require("../../../assets/images/arrow-left.png")}
              style={[
                tw`w-5 h-5 rotate-180`,
                genderDropdownOpen && tw`rotate-90`,
              ]}
            />
          </Pressable>

          {/* Gender Dropdown */}
          {genderDropdownOpen && (
            <View
              style={tw`border border-[#CCCCCC] rounded-lg mt-1 bg-white z-10 shadow-md`}
            >
              <Pressable
                style={tw`p-3 border-b border-[#EEEEEE]`}
                onPress={() => {
                  handleChange("gender", "Male");
                  setGenderDropdownOpen(false);
                }}
              >
                <Text style={tw`text-[#333333]`}>Male</Text>
              </Pressable>
              <Pressable
                style={tw`p-3`}
                onPress={() => {
                  handleChange("gender", "Female");
                  setGenderDropdownOpen(false);
                }}
              >
                <Text style={tw`text-[#333333]`}>Female</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Phone Number Field */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-[#5D5D5D] mb-2`}>Phone Number</Text>
          <TextInput
            style={tw`border border-[#CCCCCC] rounded-lg p-3 text-[#333333]`}
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Address Field */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-[#5D5D5D] mb-2`}>Address</Text>
          <TextInput
            style={tw`border border-[#CCCCCC] rounded-lg p-3 text-[#333333]`}
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
            multiline={true}
            numberOfLines={2}
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity
          style={tw`bg-[#00A082] py-4 rounded-lg mt-4`}
          onPress={handleSaveChanges}
        >
          <Text style={tw`text-white font-medium text-center`}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={handleCloseSuccessModal}
        Message="Changes saved "
      />
    </View>
  );
};

export default EditProfile;
