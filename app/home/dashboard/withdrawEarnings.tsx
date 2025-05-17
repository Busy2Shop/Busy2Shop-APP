import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import tw from "twrnc";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import BottomNavBar from "@/components/BottomNavbar";
import SuccessModal from "@/components/SuccessModal";

const WithdrawEarnings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("earning");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const earningHistory = [
    { type: "order", id: "#1234", date: "2023-05-10", amount: "N100" },
    { type: "order", id: "#1234", date: "2023-05-10", amount: "N100" },
    { type: "order", id: "#1234", date: "2023-05-10", amount: "N100" },
    { type: "refer", date: "2023-05-08", amount: "N500" },
    { type: "refer", date: "2023-05-08", amount: "N500" },
    { type: "refer", date: "2023-05-08", amount: "N500" },
  ];

  const withdrawalHistory = [
    { type: "weekly", date: "2023-05-09", amount: "N9,000" },
    { type: "weekly", date: "2023-05-09", amount: "N9,000" },
    { type: "weekly", date: "2023-05-09", amount: "N9,000" },
    { type: "weekly", date: "2023-05-09", amount: "N9,000" },
  ];
  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false);
  };

  return (
    <View style={tw`flex-1 bg-white pt-10`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4`}>
        <TouchableOpacity style={tw`p-2`} onPress={() => router.back()}>
          <LeftArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-600 text-[#2A2A2A] ml-2`}>
          Withdraw Earnings
        </Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Total earnings card */}
        <View style={tw`mx-4 my-4`}>
          <View style={tw`border border-gray-200 rounded-lg p-5 items-center`}>
            <Text style={tw`text-[#00A884] text-[38px] font-700`}>N22,200</Text>
            <Text style={tw`text-gray-500 mt-1 mb-4`}>Total earnings</Text>

            <TouchableOpacity
              style={tw`bg-[#00A884] py-2 w-full rounded-md`}
              onPress={() => {
                setIsSuccessModalVisible(true);
                setTimeout(() => {
                  router.push("/home/dashboard/earnings");
                }, 2000);
              }}
            >
              <Text style={tw`text-white text-center font-600 text-lg`}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab navigation */}
        <View
          style={tw`flex-row mx-4 border border-[#00A082]  bg-[#EBF9F6] rounded-lg mb-4`}
        >
          <TouchableOpacity
            style={tw`flex-1 py-1 m-1  px-2 justify-center rounded-md ${
              activeTab === "earning" ? "bg-[#00A884]" : " bg-[#EBF9F6] "
            }`}
            onPress={() => setActiveTab("earning")}
          >
            <Text
              style={tw`text-center font-medium ${
                activeTab === "earning" ? "text-white" : "text-gray-600"
              }`}
            >
              Earning History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-1  py-1 m-1  px-2 justify-center  rounded-md ${
              activeTab === "withdrawal" ? "bg-[#00A884]" : " bg-[#EBF9F6] "
            }`}
            onPress={() => setActiveTab("withdrawal")}
          >
            <Text
              style={tw`text-center font-medium ${
                activeTab === "withdrawal" ? "text-white" : "text-gray-600"
              }`}
            >
              Withdrawal History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction history list */}
        <View style={tw`mx-4 mb-20`}>
          {activeTab === "earning"
            ? // Earning history
              earningHistory.map((item, index) => (
                <View
                  key={index}
                  style={tw`flex-row justify-between items-center py-4 border-b border-gray-100`}
                >
                  <View style={tw`flex-row items-center`}>
                    <View
                      style={tw`w-8 h-8 rounded-full bg-[#E6F7F1] items-center justify-center mr-3`}
                    >
                      <Text style={tw`text-[#00A884]`}>
                        {item.type === "order" ? "+" : "R"}
                      </Text>
                    </View>
                    <View>
                      <Text style={tw`font-medium text-gray-800`}>
                        {item.type === "order"
                          ? `Order ${item.id} completed`
                          : "Refer & Earn"}
                      </Text>
                      <Text style={tw`text-sm text-gray-500`}>{item.date}</Text>
                    </View>
                  </View>
                  <Text style={tw`text-[#00A884] font-medium`}>
                    {item.amount}
                  </Text>
                </View>
              ))
            : // Withdrawal history
              withdrawalHistory.map((item, index) => (
                <View
                  key={index}
                  style={tw`flex-row justify-between items-center py-4 border-b border-gray-100`}
                >
                  <View style={tw`flex-row items-center`}>
                    <View
                      style={tw`w-8 h-8 rounded-full bg-[#FEEBEB] items-center justify-center mr-3`}
                    >
                      <Text style={tw`text-[#E53935]`}>-</Text>
                    </View>
                    <View>
                      <Text style={tw`font-medium text-gray-800`}>
                        Weekly payments
                      </Text>
                      <Text style={tw`text-sm text-gray-500`}>{item.date}</Text>
                    </View>
                  </View>
                  <Text style={tw`text-[#E53935] font-medium`}>
                    {item.amount}
                  </Text>
                </View>
              ))}
        </View>
      </ScrollView>
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={handleCloseSuccessModal}
        Message="Withdrawal Successful!"
      />
    </View>
  );
};

export default WithdrawEarnings;
