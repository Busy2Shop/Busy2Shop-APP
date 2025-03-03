import OnboardingScreen from "@/components/OnboardingScreen";
import StatusModal from "@/components/StatusModal";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthLanding() {
  // const authdetails = [

  //   {
  //     type: "Sign in as an Individual",
  //     icon: require("../assets/images/individual.png"),
  //     path: "/individual",
  //   },
  //   {
  //     type: "Sign in as an Agent",
  //     icon: require("../assets/images/truck.png"),
  //     path: "/agent",
  //   },
  // ];

  // const [modal, setModal] = useState({
  //   visible: true,
  //   type: "success" as "success" | "error",
  //   message: "",
  // });
  // const showModal = (type: "success" | "error", message: string) => {
  //   setModal({ visible: true, type, message });
  // };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <ScrollView
        contentContainerStyle={{ height: "100%", justifyContent: "center" }}
      >
        <View>
          {/* <Text className="text-center text-4xl font-bold leading-10 text-[#00B55C]">
            Sign Up
          </Text>
          <Text className="text-center text-sm font-normal text-[#434343]">
            Choose your role to continue
          </Text>

          <View className="mt-10 w-[323px]">
            {authdetails.map((auth, index) => (
              <Link
                href={auth.path as "/individual" | "/agent"}
                key={index}
                asChild
              >
                <TouchableOpacity className="mx-[10px] mb-6 flex flex-col items-center justify-center rounded-md border border-[#5D5D5D] p-6">
                  <Image source={auth.icon} className="h-10 w-10" />
                  <Text className="ml-2 text-sm text-[#434343]">
                    {auth.type}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View> */}
          <OnboardingScreen />;
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#737373" style="light" />
    </SafeAreaView>
  );
}
