import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AgentSignIn() {
  return (
    <View>
      <Stack.Screen options={{ title: "Agent Sign In" }} />
      {/* Your existing agent sign in content */}
    </View>
  );
}
