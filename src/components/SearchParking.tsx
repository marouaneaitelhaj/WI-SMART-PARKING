import { View, TouchableOpacity, Text, TextInput, Image } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const SearchParking = ({ navigation }: { navigation: any }) => {
  const [text, setText] = useState<string>("");
  const [parkZones, setParkZones] = useState<any>([]);
  useEffect(() => {
    axios
      .get("http://192.168.11.106:8000/api/searchParkzones/" + text)
      .then((res) => {
        setParkZones(res.data);
      });
  }, [text]);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={(text) => setText(text)}
          style={{
            width: "80%",
            padding: 5,
            margin: 10,
            borderColor: "gray",
            borderWidth: 0.25,
            borderRadius: 5,
          }}
          placeholder="Search for parking..."
        ></TextInput>
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          {parkZones &&
            parkZones.map((parkZone: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("VehicleType", {
                      id: parkZone.id,
                    });
                    console.log(parkZone);
                  }}
                  style={{
                    width: "80%",
                    borderRadius: 10,
                    height: 120,
                    backgroundColor: "#26D1C1",
                    alignItems: "center",
                    padding: 10,
                    margin: 10,
                    flexDirection: "row",
                  }}
                  key={parkZone.id}
                >
                  <View
                    style={{
                      width: "35%",
                    }}
                  >
                    <Image
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: "https://d1gymyavdvyjgt.cloudfront.net/drive/images/uploads/headers/ws_cropper/1_0x0_790x520_0x520_bay_parking_guide.jpg",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "55%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {parkZone.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                      }}
                    >
                      {parkZone.remarks}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                    >
                      {parkZone?.quartier.city.country} -{" "}
                      {parkZone?.quartier.city.CITY} -{" "}
                      {parkZone?.quartier.quartier_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            {
              parkZones.length == 0 && (
                <View>
                  <Text>No parking found</Text>
                </View>
              )
            }
        </View>
      </ScrollView>
    </View>
  );
};
export default SearchParking;
