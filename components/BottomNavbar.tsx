import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

// Import your existing menu items - assuming this structure from SidebarLinks
// If the actual structure is different, you'll need to adjust this
const MAIN_MENU = [
  { label: "Home", href: "/home/dashboard", icon: "home" },
  { label: "Earnings", href: "/home/dashboard/earnings", icon: "wallet" },
  { label: "Settings", href: "/home/dashboard/settings", icon: "settings" },
  { label: "Help", href: "/home/dashboard/help", icon: "help-circle" },
];

// Icon mapping to use Ionicons instead of SVG
const iconMapping = {
  Home: {
    active: "home",
    inactive: "home-outline",
  },
  Earnings: {
    active: "wallet",
    inactive: "wallet-outline",
  },
  Settings: {
    active: "settings",
    inactive: "settings-outline",
  },
  Help: {
    active: "help-circle",
    inactive: "help-circle-outline",
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
