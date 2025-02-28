import React, { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import guidePage from "./(tabs)/guidePage";
import GuideDetail from "./screens/GuideDetail";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="screens/donatePage"
          options={{
            title: "Donate Now",
            headerShown: false,
            headerStyle: { backgroundColor: "#0A80A4" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="screens/GuideDetail"
          options={{
            title: "Human DA",
            headerStyle: { backgroundColor: "#0A80A4" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default RootLayout;
