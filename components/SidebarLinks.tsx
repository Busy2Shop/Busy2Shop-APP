import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SidebarLinkProps } from "@/types/interfaces";
import HomeIcon from "@/assets/icons/home-icon.svg";
import EarningIcon from "@/assets/icons/earnings.svg";
import SettingsIcon from "@/assets/icons/setting.svg";
import HelpIcon from "@/assets/icons/help-circle.svg";
import tw from "twrnc";

export const MAIN_MENU = [
  { label: "Home", href: "/home", Icon: HomeIcon },
  { label: "Earnings", href: "/earnings", Icon: EarningIcon },
  { label: "Settings", href: "./settings", Icon: SettingsIcon },
  { label: "Help", href: "./help", Icon: HelpIcon },
];

const SidebarLinks = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeClasses = " bg-[#DDDDDD] ";
  const defaultClasses = "";

  const handlePress = (index: number, href: string) => {
    setActiveIndex(index);
    router.push(href as any);
  };

  return (
    <View style={tw`flex flex-col gap-2 w-full`}>
      {MAIN_MENU.map((link, index) => (
        <TouchableOpacity
          key={link.label}
          onPress={() => handlePress(index, link.href)}
          style={tw`flex flex-row items-center w-full p-4 h-[40px] ${
            activeIndex === index ? activeClasses : defaultClasses
          }`}
        >
          <View>
            <link.Icon />
          </View>
          <Text style={tw`ml-2`}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SidebarLinks;
