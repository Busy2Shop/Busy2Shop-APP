import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthLanding() {
  const authdetails = [
    {
      type: "Sign in as an Individual",
      icon: require("../assets/images/individual.png"),
      path: "/user/signup",
    },
    {
      type: "Sign in as an Agent",
      icon: require("../assets/images/truck.png"),
      path: "/agent/signup",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <ScrollView
        contentContainerStyle={{ height: "100%", justifyContent: "center" }}
      >
        <View>
          <Text className="text-center text-4xl font-bold leading-10 text-primaryText ">
            Sign Up
          </Text>
          <Text className="text-center text-sm font-normal text-[#434343]">
            Choose your role to continue
          </Text>

          <View className="mt-10 w-[323px]">
            {authdetails.map((auth, index) => (
              <Link
                href={auth.path as "/user/signup" | "/agent/signup"}
                key={index}
                asChild
              >
                <TouchableOpacity className="mx-[10px] mb-6 flex flex-col items-center justify-center rounded-md border border-[#5D5D5D] p-6 text-primaryText">
                  <Image
                    source={auth.icon}
                    className="h-10 w-10 text-primaryText"
                  />
                  <Text className="ml-2 text-sm text-[#434343]">
                    {auth.type}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#737373" style="light" />
    </SafeAreaView>
  );
}
