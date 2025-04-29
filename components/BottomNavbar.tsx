import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import tw from "twrnc";

import HomeActiveIcon from "@/assets/icons/home-active.svg";
import HomeInactiveIcon from "@/assets/icons/home-inactive.svg";
import CartActiveIcon from "@/assets/icons/box-active.svg";
import CartInactiveIcon from "@/assets/icons/box-inactive.svg";
import WalletActiveIcon from "@/assets/icons/empty-wallet-active.svg";
import WalletInactiveIcon from "@/assets/icons/empty-wallet-inactive.svg";
import PersonActiveIcon from "@/assets/icons/profile-circle-active.svg";
import PersonInactiveIcon from "@/assets/icons/profile-circle-inactive.svg";

const MAIN_MENU = [
  { label: "Home", href: "/home/dashboard/page" },
  {
    label: "Active Orders",
    href: "/home/dashboard/activeOrders",
  },
  { label: "Earnings", href: "/home/dashboard/earnings" },
  { label: "Profile", href: "/home/dashboard/profile" },
];

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (menuPath: string) => {
    if (pathname === menuPath) return true;

    if (menuPath !== "/home/dashboard/page") {
      return pathname.startsWith(menuPath);
    }

    return false;
  };

  const renderIcon = (label: string, active: boolean) => {
    const iconSize = { width: 24, height: 24 };
    const iconColor = active ? "#00A884" : "#666";

    switch (label) {
      case "Home":
        return active ? (
          <HomeActiveIcon {...iconSize} color={iconColor} />
        ) : (
          <HomeInactiveIcon {...iconSize} color={iconColor} />
        );
      case "Active Orders":
        return active ? (
          <CartActiveIcon {...iconSize} color={iconColor} />
        ) : (
          <CartInactiveIcon {...iconSize} color={iconColor} />
        );
      case "Earnings":
        return active ? (
          <WalletActiveIcon {...iconSize} color={iconColor} />
        ) : (
          <WalletInactiveIcon {...iconSize} color={iconColor} />
        );
      case "Profile":
        return active ? (
          <PersonActiveIcon {...iconSize} color={iconColor} />
        ) : (
          <PersonInactiveIcon {...iconSize} color={iconColor} />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={tw`flex-row bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0`}
    >
      {MAIN_MENU.map((item) => {
        const active = isActive(item.href);

        return (
          <TouchableOpacity
            key={item.label}
            style={tw`flex-1 items-center py-3`}
            onPress={() => router.push(item.href as any)}
          >
            {renderIcon(item.label, active)}
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
