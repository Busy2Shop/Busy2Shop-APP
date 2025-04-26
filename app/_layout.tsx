import { Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { Provider } from "react-redux";
import { store } from "./store";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Add your fonts here if you're using any
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/user/signup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/agent/signup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/user/login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/agent/login"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(auth)/user/otp" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/agent/otp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/agent/details"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/page"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/settings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/OpenInMap"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/help"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/faq"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/activeOrders"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home/dashboard/agentOrderPreferences"
          options={{ headerShown: false }}
        />
      </Stack>
    </Provider>
  );
}
