import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, RefreshControl } from "react-native";
import Loading from "../fx/loading";
import { Alert } from "react-native";

export default function Paiments(
  props: any,
  { navigation }: { navigation: any }
) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(props.route.params.parkzone.type);
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token === null) {
          props.navigation.navigate("Profile");
        } else {
          axios
            .get("http://192.168.11.106:8000/api/user", {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              console.log(response.data);
              AsyncStorage.setItem("userId", response.data.id.toString());
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              props.navigation.navigate("Profile");
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    AsyncStorage.getItem("userId")
      .then((userId) => {
        console.log(userId);
        if (userId === null) {
          props.navigation.navigate("Profile");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        props.navigation.navigate("Profile");
      });
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          margin: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "#24aaa1",
          }}
        >
          Cards
        </Text>
        <View style={{}}>
          <TextInput
            placeholder="Card Number"
            style={{
              borderWidth: 1,
              borderColor: "#24aaa1",
              borderRadius: 5,
              padding: 10,
              margin: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            placeholder="MM/YY"
            style={{
              borderWidth: 1,
              borderColor: "#24aaa1",
              borderRadius: 5,
              padding: 10,
              margin: 10,
              width: "40%",
            }}
          />
          <TextInput
            placeholder="CVV"
            style={{
              borderWidth: 1,
              borderColor: "#24aaa1",
              borderRadius: 5,
              padding: 10,
              margin: 10,
              width: "40%",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#00C9B7",
              padding: 10,
              borderRadius: 5,
              margin: 10,
              width: "100%",
            }}
            onPress={() => {
              AsyncStorage.getItem("userId")
                .then((userId) => {
                  axios
                    .post("http://192.168.11.106:8000/api/parking", {
                      user_id: userId,
                      slot_id: props.route.params.slotId.id,
                      type: props.route.params.parkzone.type,
                      in_time: props.route.params.in_time,
                      out_time: props.route.params.out_time,
                      category_id: props.route.params.tariff.category_id,
                      tariff: props.route.params.tariff.total_amount,
                    })
                    .then((response) => {
                      // console the body of the request
                      console.log(response.data.message);
                      Alert.alert(
                        "notification",
                        response.data.message,
                        [
                          {
                            text: "ok",
                            onPress: () => {
                              props.navigation.navigate("History");
                            },
                          }
                        ]
                      );

                    })
                    .catch((error) => {
                      console.log(error);
                    })
                    .finally(() => {
                      console.log("finally");
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Add Card
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
