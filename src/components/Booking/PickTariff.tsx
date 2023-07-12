import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../fx/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PickTariff(
  props: any,
  { navigation }: { navigation: any }
) {
  const [tariff, setTariff] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [parkzone, setParkzone] = useState<any>([]);
  const [token, setToken] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedTariff, setSelectedTariff] = useState<any>(null);
  const [date, setDate] = useState(new Date());
  const [showpicker, setShowpicker] = useState<boolean>(false);
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      setToken(token);
      console.log("this is token", token);
    });
    axios
      .get("http://192.168.11.106:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        props.navigation.navigate("Profile");
      });
    axios
      .get(
        "http://192.168.11.106:8000/api/readparkzonestariff/" +
          props.route.params?.parkzone +
          "/" +
          props.route.params.VehicleType
      )
      .then((response) => {
        setTariff(response.data.tariff);
        setParkzone(response.data.parkzone);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      {loading ? <Loading /> : null}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "80%",
          margin: 10,
        }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#24aaa1",
            }}
          >
            {parkzone.name}
          </Text>
          <MaterialCommunityIcons name="map-marker" size={15} color="black">
            <Text>
              {parkzone.quartier?.city?.CITY} -{" "}
              {parkzone.quartier?.quartier_name}- {parkzone.name}
            </Text>
          </MaterialCommunityIcons>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#24aaa1",
            }}
          >
            Info
          </Text>
          <Text>{parkzone.remarks}</Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#24aaa1",
            }}
          >
            Tariff
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {tariff &&
                tariff.map((tariff: any) => {
                  return (
                    <Pressable
                      key={tariff.id}
                      style={{
                        width: 150,
                        padding: 10,
                        margin: 10,
                        borderRadius: 10,
                        backgroundColor:
                          tariff == selectedTariff ? "#00C9B7" : "#E3F1F1",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setSelectedTariff(tariff);
                      }}
                    >
                      <Text
                        style={{
                          color: tariff == selectedTariff ? "white" : "black",
                        }}
                      >
                        {tariff.number_hour} Hour
                      </Text>
                      <Text
                        style={{
                          color: tariff == selectedTariff ? "white" : "gray",
                        }}
                      >
                        ${tariff.total_amount}
                      </Text>
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#24aaa1",
              }}
            >
              Time
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setShowpicker(true);
              console.log(date.toString());
            }}
            style={{
              width: "80%",
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#00C9B7",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Selected Time
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              {date.toTimeString().slice(0, 5)}
            </Text>
          </Pressable>
          {showpicker && (
            <DateTimePicker
              onChange={(event, selectedDate) => {
                setShowpicker(false);
                if (event.type == "set") {
                  setDate(selectedDate || date);
                }
              }}
              value={date}
              mode="time"
              display="spinner"
              is24Hour={true}
            />
          )}
        </View>
      </View>
      <View style={{ height: "15%", width: "100%", alignContent: "center" }}>
        <Pressable
          disabled={selectedTariff == null ? true : false}
          style={{
            backgroundColor: selectedTariff == null ? "gray" : "#24aaa1",
            width: "80%",
            height: 50,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={() => {
            console.log(selectedTariff, date, user, parkzone, token);
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
}

const styles = StyleSheet.create({
  selectedtime: {
    backgroundColor: "#00C9B7",
  },
  notselectedtime: {
    opacity: 0.1,
    backgroundColor: "gray",
  },
});
