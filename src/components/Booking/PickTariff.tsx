import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../fx/loading";

export default function PickTariff(
  props: any,
  { navigation }: { navigation: any }
) {
  const [tariff, setTariff] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [parkzone, setParkzone] = useState<any>([]);
  const [selectedTariff, setSelectedTariff] = useState<any>(null);
  useEffect(() => {
    axios
      .get(
        "http://192.168.11.103:8000/api/readparkzonestariff/" +
          props.route.params?.parkzone +
          "/" +
          props.route.params.VehicleType
      )
      .then((response) => {
        console.log(response.data);
        setTariff(response.data.tariff);
        setParkzone(response.data.parkzone);
      })
      .catch((error) => {
        console.log(error);
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
        <View style={{
            marginBottom: 20,
        }}>
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
        <View style={{
            marginBottom: 20,
        }}>
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
                        // props.navigation.navigate("Payment", {
                        //   slot: slot,
                        //   parkzone: props.route.params?.id,
                        //   VehicleType: props.route.params?.VehicleType,
                        // });
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
            props.navigation.navigate("PickParkingSlot", {
              //   id: props.route.params?.id,
              //   VehicleType: selectedTariff,
              //   parkzone: slotsParkzone,
              //   data: props.route.params.data,
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
}
