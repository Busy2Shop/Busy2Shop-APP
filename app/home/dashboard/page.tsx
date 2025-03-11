import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import RightArrowIcon from "@/assets/icons/arrow-right.svg";
import LightModeToggleIcon from "@/assets/icons/toggle-light.svg";
import SidebarLinks from "@/components/SidebarLinks";
import AllOrders from "@/components/AllOrders";
import tw from "twrnc";
import SingleOrder from "@/components/SingleOrder";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const navigation = useNavigation();

  return (
    <View className="flex flex-row bg-[#F7F7F7]">
      {/* Sidebar */}
      <View
        className={`fixed pt-5 inset-y-0 right-0 w-[250px] bg-[#F7F7F7] text-white transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out h-screen overflow-y-auto z-50`}
      >
        <View className="flex flex-row justify-between items-center  mt-16 px-5">
          <View className="">
            <Text className="text-[#2A2A2A] text-base font-medium">
              John Bruno
            </Text>
            <Text className="text-xs text-[#5D5D5D] font-normal">
              NIN: 5278902456
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsSidebarOpen(false)}
            className=" w-6 h-6 md:hidden"
          >
            <RightArrowIcon />
          </TouchableOpacity>
        </View>

        {/* Main Menu */}
        <View className="flex font-[400] mt-8 text-black">
          <View className="space-y-4">
            <TouchableOpacity className="">
              <SidebarLinks />
            </TouchableOpacity>
          </View>
          <View
            style={tw`flex flex-col gap-2 w-full px-5 py-4  h-[40px] text-sm font-normal`}
          >
            <Text>FAQ</Text>
            <Text style={tw`flex justify-between items-center`}>
              <Text>Dark mode</Text>
              <LightModeToggleIcon />
            </Text>
          </View>
        </View>
      </View>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <TouchableOpacity
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onPress={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <View style={tw`flex-1 flex-col mt-6 mx-5`}>
        {/* Header */}
        {page === 0 && (
          <View style={tw` bg-[#F7F7F7] flex flex-row  justify-between`}>
            <View style={tw`flex flex-row gap-2 items-center`}>
              <View>
                <Image
                  source={require("../../../assets/images/Avatar.png")}
                  style={{ width: 48, height: 48 }}
                />
              </View>

              <Text style={tw`flex flex-col`}>
                <Text style={tw`text-base font-medium text-[#2A2A2A]`}>
                  Hi, John
                </Text>
                <Text style={tw`text-xs font-normal text-[#5D5D5D]`}>
                  Welcome back to waka2shop
                </Text>
              </Text>
            </View>
            {!isSidebarOpen && (
              <TouchableOpacity
                onPress={() => setIsSidebarOpen(true)}
                className=" px-4 text-xl focus:outline-none"
              >
                <Icon name="menu" size={24} color="#5D5D5D" />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Content */}
        <View className="flex-1 bg-[#F7F7F7] mt-6">
          {page === 0 ? (
            <AllOrders setPage={setPage} />
          ) : (
            <SingleOrder setPage={setPage} />
          )}
        </View>
      </View>
    </View>
  );
}
