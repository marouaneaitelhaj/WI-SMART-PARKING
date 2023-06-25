import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Loading from "../fx/loading";
import React from "react";
import { Pressable } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const VehicleType = (props: any, { navigation }: { navigation: any }) => {
  const [slotsParkzone, setSlotsParkzone] = useState<any>([]);
  const [keyselectd, setKeyselectd] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      if (props.route.params?.id) {
        axios
          .get(
            "http://192.168.11.103:8000/api/readparkzones/" +
              props.route.params?.id
          )
          .then((response) => {
            setSlotsParkzone(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    })();
  }, [props.route.params?.id]);
  return (
    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      {loading ? <Loading /> : null}
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            margin: 10,
          }}
        >
          Select your vehicle type
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "80%",
        }}
      >
        {Object.keys(slotsParkzone).map((key) => {
          let content;
          switch (key) {
            case "Electric Car":
              content = (
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
                    }}
                    name="car-electric"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Electric Bike":
              content = (
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
                    }}
                    name="motorbike-electric"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Electric Bus":
              content = (
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
                    }}
                    name="bus-electric"
                    size={60}
                    color="#0D6EFD"
                  />
                </View>
              );
              break;
            case "Electric Truck":
              content = (
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
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
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
                    }}
                    name="car-estate"
                    size={60}
                    color="#FFC107"
                  />
                </View>
              );
              break;
            case "Gasoline Bike":
              content = (
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
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
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
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
                <View
                  key={key}
                  style={{
                    borderColor: "gray",
                    borderWidth: keyselectd == key ? 0.5 : 0,
                    margin: 5,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icon}
                    onPress={() => {
                      setKeyselectd(key);
                      console.log(keyselectd);
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
      <View style={{ height: "20%", width: "100%", alignContent: "center" }}>
        <Pressable
          disabled={keyselectd == "" ? true : false}
          style={{
            backgroundColor: keyselectd == "" ? "gray" : "#24aaa1",
            width: "80%",
            height: 50,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={() => {
            props.navigation.navigate("PickParkingSlot", {
              id: props.route.params?.id,
              VehicleType: keyselectd,
              parkzone: slotsParkzone,
              data: props.route.params.data,
            });
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            Book
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    margin: 10,
  },
});
export default VehicleType;
