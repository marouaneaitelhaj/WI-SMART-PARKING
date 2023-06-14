import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Nearby from "./src/components/Nearby";
import Ionicons from "react-native-vector-icons/Ionicons";
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
      <Tab.Navigator
        initialRouteName="Nearby"
        barStyle={{ backgroundColor: "#ffffff" }}
        activeColor="#24aaa1"
        inactiveColor="gray"
        shifting={true}
      >
        <Tab.Screen
          name="Nearby"
          component={Nearby}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="location" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={Booking}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="bookmark" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchParking}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="time" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
