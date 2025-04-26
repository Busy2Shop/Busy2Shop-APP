import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

// Updated menu items with the correct navigation structure
const MAIN_MENU = [
  { label: "Home", href: "/home/dashboard/page", icon: "home" },
  {
    label: "Active Orders",
    href: "/home/dashboard/activeOrders",
    icon: "cart",
  },
  { label: "Earnings", href: "/home/dashboard/earnings", icon: "wallet" },
  { label: "Profile", href: "/home/dashboard/profile", icon: "person" },
];

// Updated icon mapping to use Ionicons
const iconMapping = {
  Home: {
    active: "home",
    inactive: "home-outline",
  },
  "Active Orders": {
    active: "cart",
    inactive: "cart-outline",
  },
  Earnings: {
    active: "wallet",
    inactive: "wallet-outline",
  },
  Profile: {
    active: "person",
    inactive: "person-outline",
  },
};

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={tw`flex-row bg-white border-t border-gray-200`}>
      {MAIN_MENU.map((item) => {
        const isActive = pathname === item.href;
        const iconName = isActive
          ? iconMapping[item.label as keyof typeof iconMapping]?.active
          : iconMapping[item.label as keyof typeof iconMapping]?.inactive;

        return (
          <TouchableOpacity
            key={item.label}
            style={tw`flex-1 items-center py-3`}
            onPress={() => router.push(item.href as any)}
          >
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={24}
              color={isActive ? "#00A884" : "#666"}
            />
            <Text
              style={tw`text-xs mt-1 ${
                isActive ? "text-[#00A884] font-medium" : "text-gray-500"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavBar;
