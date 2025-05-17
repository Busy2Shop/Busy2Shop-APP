import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import SuccessModal from "../../../components/SuccessModal"; // Adjust path as needed
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";

type AddAccountPageProps = {
  navigation: StackNavigationProp<any>;
};

const AddAccountPage = ({ navigation }: AddAccountPageProps) => {
  // Check if navigation is properly passed
  useEffect(() => {
    if (!navigation) {
      console.warn("Navigation prop is undefined in AddAccountPage");
    }
  }, [navigation]);
  const router = useRouter();

  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [accountForm, setAccountForm] = useState({
    bank: "Select Bank",
    accountNumber: "",
    accountName: "",
  });

  const banks = [
    "Access Bank",
    "Citibank",
    "Ecobank",
    "Fidelity Bank",
    "First Bank",
    "FCMB",
    "GTBank",
    "Heritage Bank",
    "Keystone Bank",
    "Polaris Bank",
    "Stanbic IBTC",
    "Standard Chartered",
    "Sterling Bank",
    "UBA",
    "Union Bank",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
  ];

  interface AccountForm {
    bank: string;
    accountNumber: string;
    accountName: string;
  }

  type AccountFormField = keyof AccountForm;

  const handleChange = (field: AccountFormField, value: string) => {
    setAccountForm({
      ...accountForm,
      [field]: value,
    });

    // Auto-populate account name when account number is entered (this would normally be an API call)
    if (field === "accountNumber" && value.length >= 10) {
      setAccountForm((prev) => ({
        ...prev,
        accountName: "John Doe", // This would come from your bank verification API
      }));
    }
  };

  const clearForm = () => {
    setAccountForm({
      bank: "Select Bank",
      accountNumber: "",
      accountName: "",
    });
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false);
    router.back();
  };

  const handleAddAccount = () => {
    // Validate form
    if (
      accountForm.bank === "Select Bank" ||
      !accountForm.accountNumber ||
      !accountForm.accountName
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    // Save account logic here
    console.log("Account added:", accountForm);

    // Clear the form fields
    clearForm();

    // Show success modal
    setIsSuccessModalVisible(true);

    // Close modal and navigate back after 3 seconds
    setTimeout(() => {
      handleCloseSuccessModal();
    }, 3000);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 p-6`}>
        {/* Header */}
        <View style={tw`flex-row items-center mt-10 mb-4`}>
          <TouchableOpacity
            onPress={() => {
              if (navigation && typeof navigation.goBack === "function") {
                navigation.goBack();
              }
            }}
          >
            <ArrowLeftIcon width={24} height={24} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-medium text-[#333333] ml-2`}>
            Add new account
          </Text>
        </View>

        {/* Form Container */}
        <View style={tw`flex-1`}>
          {/* Bank Selection */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#5D5D5D] mb-2`}>Select Bank</Text>
            <Pressable
              style={tw`border border-[#CCCCCC] rounded-lg p-3 flex-row justify-between items-center relative`}
              onPress={() => setBankDropdownOpen(!bankDropdownOpen)}
            >
              <Text
                style={tw`flex-1 ${
                  accountForm.bank === "Select Bank"
                    ? "text-[#999999]"
                    : "text-[#333333]"
                }`}
              >
                {accountForm.bank}
              </Text>
              <Image
                source={require("../../../assets/images/arrow-left.png")}
                style={[
                  tw`w-5 h-5 rotate-90`,
                  bankDropdownOpen && tw`rotate-270`,
                ]}
              />
            </Pressable>

            {/* Bank Dropdown */}
            {bankDropdownOpen && (
              <View
                style={tw`border border-[#CCCCCC] rounded-lg mt-1 bg-white z-10 shadow-md max-h-40`}
              >
                <ScrollView nestedScrollEnabled={true}>
                  {banks.map((bank, index) => (
                    <Pressable
                      key={index}
                      style={tw`p-3 ${
                        index < banks.length - 1
                          ? "border-b border-[#EEEEEE]"
                          : ""
                      }`}
                      onPress={() => {
                        handleChange("bank", bank);
                        setBankDropdownOpen(false);
                      }}
                    >
                      <Text style={tw`text-[#333333]`}>{bank}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Account Number Field */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#5D5D5D] mb-2`}>Account Number</Text>
            <TextInput
              style={tw`border border-[#CCCCCC] rounded-lg p-3 text-[#333333]`}
              value={accountForm.accountNumber}
              onChangeText={(text) => handleChange("accountNumber", text)}
              keyboardType="numeric"
              placeholder="Enter account number"
              placeholderTextColor="#999999"
            />
          </View>

          {/* Account Name Field */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-[#5D5D5D] mb-2`}>Account Name</Text>
            <TextInput
              style={tw`border border-[#CCCCCC] rounded-lg p-3 text-[#333333]`}
              value={accountForm.accountName}
              onChangeText={(text) => handleChange("accountName", text)}
              editable={false}
              placeholder="Account name will appear here"
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        {/* Save Button (Fixed at the bottom) */}
        <View style={tw`pb-6`}>
          <TouchableOpacity
            style={tw`bg-[#00A082] py-4 rounded-lg`}
            onPress={handleAddAccount}
          >
            <Text style={tw`text-white font-medium text-center`}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={handleCloseSuccessModal}
        Message="Account Added Successfully!"
      />
    </SafeAreaView>
  );
};

export default AddAccountPage;
