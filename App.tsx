import Nearby from "./src/components/Nearby";
import VehicleType from "./src/components/Booking/VehicleType";
import History from "./src/components/History";
import SearchParking from "./src/components/SearchParking";
import PickTariff from "./src/components/Booking/PickTariff";
import Profile from "./src/components/Profile";
import PickParkingSlot from "./src/components/Booking/PickParkingSlot";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch, Provider } from 'react-redux'; // Include Provider
import store, { setToken } from './src/redux/store'; // Import the store and setToken action
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Nearby"
          component={Nearby}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-marker"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchParking}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeTabs}
        />
        <Stack.Screen name="VehicleType" component={VehicleType} />
        <Stack.Screen name="PickParkingSlot" component={PickParkingSlot} />
        <Stack.Screen name="PickTariff" component={PickTariff} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const AppWithRedux: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWithRedux;
