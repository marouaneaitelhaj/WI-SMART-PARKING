import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { Pressable } from "react-native";
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
// <<<<<<< HEAD
            "http://192.168.11.108:8000/api/readparkzones/" +
// =======
//             "http://192.168.11.106:8000/api/readparkzones/" +
// >>>>>>> f8dad1b6a9cf8c3d9967be105f0c4a7989685eeb
              props.route.params?.id
          )
          .then((response) => {
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
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Select your vehicle type
        </Text>
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
      <View>
        {informationCard && (
          <View>
            <View style={{alignItems : "center"}}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                Select your vehicle type
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {informationCard.map((slot: any) => {
                return (
                  <View key={slot.id} style={{ flexDirection: "row" }}>
                    <Pressable
                      style={{
                        margin: 5,
                        width: 100,
                        backgroundColor: "#00d284",
                        padding: 10,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        props.navigation.navigate("BookingForm", {
                          slot: slot,
                        });
                      }}
                    >
                      <Text style={{ color: "white" }}>{slot.name}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        )}
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
