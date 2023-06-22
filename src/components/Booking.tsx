import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
} from "react-native";
import React from "react";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Booking = (props: any, { navigation }: { navigation: any }) => {
  const [slotsParkzone, setSlotsParkzone] = useState<any>([]);
  const [informationCard, setInformationCard] = useState<any>(null);
  useEffect(() => {
    (async () => {
      if (props.route.params?.id) {
        axios
          .get(
            "http://192.168.11.108:8000/api/readparkzones/" +
              props.route.params?.id
          )
          .then((response) => {
            // console.log(response.data);
            setSlotsParkzone(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, [props.route.params?.id]);
  return (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Select your vehicle type
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(slotsParkzone).map((key) => {
          let content;
          switch (key) {
            case "Electric Car":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="car"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Electric Bike":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="bike"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Electric Bus":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="bus"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Electric Truck":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="truck"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Gasoline Car":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="car"
                    size={60}
                    color="#FFC107"
                  />
                </View>
              );
              break;
            case "Gasoline Bike":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="bike"
                    size={60}
                    color="#FFC107"
                  />
                </View>
              );
              break;
            case "Gasoline Bus":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="bus"
                    size={60}
                    color="#FFC107"
                  />
                </View>
              );
              break;
            case "Gasoline Truck":
              content = (
                <View key={key} style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      console.log(slotsParkzone[key]);
                      setInformationCard(slotsParkzone[key]);
                    }}
                    name="truck"
                    size={60}
                    color="#FFC107"
                  />
                </View>
              );
              break;
            default:
              content = null;
          }
          return content;
        })}
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  iconContainer: {
    margin: 10,
  },
});
export default Booking;
