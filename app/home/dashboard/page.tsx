import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import BottomNavBar from "@/components/BottomNavbar";
import AllOrders from "@/components/AllOrders";
import { useRouter } from "expo-router";
import SingleOrder from "@/components/SingleOrder";
import BellIcon from "@/assets/icons/bell.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();

  return (
    <View style={tw`flex-1 flex-col bg-[#F7F7F7]`}>
      {/* Header */}
      <View
        style={tw`bg-[#F7F7F7] flex flex-row justify-between px-5 pt-6 mt-8`}
      >
        <View style={tw`flex flex-row gap-2 items-center`}>
          <View>
            <Image
              source={require("../../../assets/images/Avatar.png")}
              style={{ width: 48, height: 48 }}
            />
          </View>

          <View style={tw`flex flex-col`}>
            <Text style={tw`text-base font-medium text-[#2A2A2A]`}>
              Hi, John
            </Text>
            <Text style={tw`text-xs font-normal text-[#5D5D5D]`}>
              Welcome back to busy2shop
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row`}>
          <View>
            <TouchableOpacity>
              <BellIcon width={24} height={24} color="#5D5D5D" />
            </TouchableOpacity>
          </View>
          <View style={tw`px-4`}>
            <TouchableOpacity
              onPress={() => router.push("/home/dashboard/settings")}
            >
              <SettingsIcon width={24} height={24} color="#5D5D5D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={tw`flex-1 bg-[#F7F7F7] px-5 pt-6`}>
        {page === 0 ? (
          <AllOrders setPage={setPage} />
        ) : (
          <SingleOrder setPage={setPage} />
        )}
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </View>
  );
}
