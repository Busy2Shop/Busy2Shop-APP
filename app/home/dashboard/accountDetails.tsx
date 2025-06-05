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
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

interface HandleSelectAccount {
  (id: number): void;
}

interface AccountForm {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface Account {
  id: number;
  accountName: string;
  accountNumber: string;
  bank: string;
  isSelected: boolean;
}
const AccountDetails = () => {
  const router = useRouter();
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);

  // Form state
  const [accountForm, setAccountForm] = useState({
    bank: "Select Bank",
    accountNumber: "",
    accountName: "John Bruno",
  });

  // Sample existing accounts
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountName: "John Bruno",
      accountNumber: "1009371334",
      bank: "Monopoint MFB",
      isSelected: true,
    },
  ]);

  const handleChange = (field: keyof AccountForm, value: string) => {
    setAccountForm((prev: AccountForm) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddAccount = () => {
    // Add validation here

    // Show success modal
    setShowAddAccountModal(false);
    setShowSuccessModal(true);

    // Add new account to the list
    const newAccount = {
      id: accounts.length + 1,
      accountName: accountForm.accountName,
      accountNumber: accountForm.accountNumber,
      bank: accountForm.bank,
      isSelected: false,
    };

    setAccounts([...accounts, newAccount]);

    // Reset form
    setAccountForm({
      bank: "Select Bank",
      accountNumber: "",
      accountName: "John Bruno",
    });

    // Close success modal after 2 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  const handleSelectAccount: HandleSelectAccount = (id) => {
    setAccounts(
      accounts.map((account: Account) => ({
        ...account,
        isSelected: account.id === id,
      }))
    );
  };

  // Sample banks for dropdown
  const banks = [
    "Zenith Bank",
    "GTBank",
    "First Bank",
    "UBA",
    "Access Bank",
    "Monopoint MFB",
  ];

  return (
    <View style={tw`flex-1`}>
      {/* Top header */}
      <View style={tw` pt-14 pb-4 px-5 `}>
        <View style={tw`flex flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`w-6 h-6 `}>
            <ArrowLeftIcon width={24} height={24} />
          </TouchableOpacity>
          <View style={tw`ml-2`}>
            <Text style={tw`text-[#333333] text-[20px] font-500`}>
              Add Bank
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`px-5 pt-6`}>
          <Text style={tw`text-[#5D5D5D] mb-3`}>Available accounts</Text>

          {/* Existing Accounts List */}
          {accounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={tw`border border-[#CCCCCC] ${
                account.isSelected ? "border-[#5D5D5D]" : ""
              } rounded-lg p-4 mb-4 flex-row items-center`}
              onPress={() => handleSelectAccount(account.id)}
            >
              <View style={tw`flex-row items-center flex-1`}>
                <Image
                  source={require("../../../assets/images/bank.png")}
                  style={tw`w-8 h-8`}
                />
                <View style={tw`ml-3`}>
                  <Text style={tw`text-[#333333] font-medium`}>
                    {account.accountName}
                  </Text>
                  <Text style={tw`text-[#5D5D5D] text-sm`}>
                    {account.accountNumber} • {account.bank}
                  </Text>
                </View>
              </View>

              {account.isSelected && (
                <View
                  style={tw`w-5 h-5 rounded-full border border-gray-300 ${
                    account.isSelected ? "border-[#00A082]" : ""
                  } flex items-center justify-center`}
                >
                  {account.isSelected && (
                    <View style={tw`w-3 h-3 rounded-full bg-[#00A082]`} />
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Add New Account Button */}
          <TouchableOpacity
            style={tw`border border-dashed border-[#CCCCCC] rounded-lg p-4 items-center mt-4 justify-center flex-row`}
            onPress={() => router.push("/home/dashboard/addAccount")}
          >
            <Text style={tw`text-[#5D5D5D] font-medium mr-2`}>+</Text>
            <Text style={tw`text-[#5D5D5D] font-medium`}>Add New Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountDetails;
