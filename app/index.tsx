import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import Logo from "@/components/Logo";
import Onboarding from "@/components/Onboarding";

export default function AuthLanding() {
  const router = useRouter();
  const [showingSplash, setShowingSplash] = useState(true);
  const [showingOnboarding, setShowingOnboarding] = useState(false);
  const [userType, setUserType] = useState<null | "agent" | "individual">(null); // 'agent' or 'individual'

  // User role options
  const authOptions: AuthOption[] = [
    {
      type: "Sign in as an Individual",
      icon: require("../assets/images/individual.png"),
      path: "/user/signup",
      userType: "individual",
    },
    {
      type: "Sign in as an Agent",
      icon: require("../assets/images/truck.png"),
      path: "/agent/signup",
      userType: "agent",
    },
  ];

  // Agent onboarding slides
  const agentOnboardingSlides = [
    {
      id: "1",
      title: "Daily Target Bonus",
      description:
        "Hit your daily delivery target and unlock extra cash bonuses!",
      image: require("../assets/images/Rider.png"),
    },
    {
      id: "2",
      title: "Order Commission",
      description:
        "Earn N100 for every successful order - your hustle, your reward.",
      image: require("../assets/images/Commission.png"),
    },
    {
      id: "3",
      title: "Bonus Boost",
      description:
        "More deliveries, more bonuses — boost your income every day!",
      image: require("../assets/images/Bonus.png"),
    },
  ];

  // Customer onboarding slides
  const customerOnboardingSlides = [
    {
      id: "1",
      title: "Shop any market",
      description: "Chat with agents, and track your delivery in real time!",
      image: require("../assets/images/cart.png"), // Replace with customer-specific images
    },
    {
      id: "2",
      title: "No stress shopping",
      description: "Biggest wholesale and most affordable market.",
      image: require("../assets/images/Market place.png"), // Replace with customer-specific images
    },
    {
      id: "3",
      title: "Refer, shop, and earn",
      description: "Get paid while your friends shop!",
      image: require("../assets/images/Refers.png"), // Replace with customer-specific images
    },
  ];

  // Show splash screen for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowingSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle user role selection
  interface AuthOption {
    type: string;
    icon: any; // Replace with a more specific type if possible
    path: string;
    userType: "agent" | "individual";
  }

  const handleRoleSelect = (type: "agent" | "individual"): void => {
    setUserType(type);
    setShowingOnboarding(true);
  };

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    // Navigate to the appropriate signup form based on userType
    if (userType === "agent") {
      router.push("/agent/signup");
    } else {
      router.push("/user/signup");
    }
  };

  // Render splash screen
  if (showingSplash) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Logo />
        <StatusBar backgroundColor="#737373" style="light" />
      </SafeAreaView>
    );
  }

  // Render onboarding screens
  if (showingOnboarding) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Onboarding
          slides={
            userType === "agent"
              ? agentOnboardingSlides
              : customerOnboardingSlides
          }
          onComplete={handleOnboardingComplete}
          primaryColor="#00A082"
        />
        <StatusBar backgroundColor="#737373" style="light" />
      </SafeAreaView>
    );
  }

  // Render role selection screen
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={{ alignItems: "center" }}>
          <Text className="text-center text-4xl font-bold leading-10 text-[#00A082]">
            Sign Up
          </Text>
          <Text className="text-center text-sm font-normal text-[#434343] mb-10">
            Choose your role to continue
          </Text>

          <View className="w-full max-w-[323px]">
            {authOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="mx-[10px] mb-6 flex flex-col items-center justify-center rounded-md border border-[#5D5D5D] p-6"
                onPress={() => handleRoleSelect(option.userType)}
              >
                <Image source={option.icon} className="h-10 w-10" />
                <Text className="ml-2 text-sm text-[#434343]">
                  {option.type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#737373" style="light" />
    </SafeAreaView>
  );
}
