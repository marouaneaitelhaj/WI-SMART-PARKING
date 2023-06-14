import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Nearby from "./src/components/Nearby";

import Booking from "./src/components/Booking";
import History from "./src/components/History";
import SearchParking from "./src/components/SearchParking";
import Profile from "./src/components/Profile";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer
      theme={{
        colors: {
          secondaryContainer: "transparent",
        },
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="Nearby" component={Nearby} />
        <Tab.Screen name="Booking" component={Booking} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Search Parking" component={SearchParking} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
