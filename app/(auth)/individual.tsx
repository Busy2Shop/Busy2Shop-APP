import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";

interface FormFieldProps {
  title: string;
  value: string;
}

export default function IndividualSignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      {/* <Stack.Screen options={{ title: "Individual Sign In" }} /> */}
      {/* Your existing individual sign in content */}
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Text className="text-center text-4xl font-bold leading-10 text-[#00B55C]">
            Sign Up
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="name@gmail.com"
            handleChangeText={(e: any) => {
              setForm({ ...form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="************"
            handleChangeText={(e: any) => {
              setForm({ ...form, password: e });
            }}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            placeholder="************"
            handleChangeText={(e: any) => {
              setForm({ ...form, confirmPassword: e });
            }}
            otherStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
