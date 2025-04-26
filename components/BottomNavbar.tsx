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

  // Function to check if the current path matches or is a subpath of a menu item
  const isActive = (menuPath: string) => {
    // If paths are exactly the same
    if (pathname === menuPath) return true;

    // Handle nested routes - check if the current path starts with the menu item path
    // This ensures the tab stays active when on subpages
    if (menuPath !== "/home/dashboard/page") {
      // Avoid matching everything with the home route
      return pathname.startsWith(menuPath);
    }

    return false;
  };

  return (
    <View
      style={tw`flex-row bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0`}
    >
      {MAIN_MENU.map((item) => {
        const active = isActive(item.href);
        const iconName = active
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
              color={active ? "#00A884" : "#666"}
            />
            <Text
              style={tw`text-xs mt-1 ${
                active ? "text-[#00A884] font-medium" : "text-gray-500"
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
