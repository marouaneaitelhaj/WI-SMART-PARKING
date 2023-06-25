import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, Pressable, Switch, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../fx/loading";

export default function PickParkingSlot(
  props: any,
  { navigation }: { navigation: any }
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [floor, setFloor] = useState<any>(null);
  const [selectedfloor, setSelectedfloor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  useEffect(() => {
    axios
      .get(
        "http://192.168.11.103:8000/api/readparkzones/" +
          props.route.params?.id +
          "/" +
          props.route.params.vehicleType
      )
      .then((response) => {
        setFloor(response.data.slots);
        setSelectedfloor(Object.keys(response.data.slots)[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const getIcon = (vehicleType: any, color: string) => {
    switch (vehicleType) {
      case "Electric Car":
        return (
          <MaterialCommunityIcons name="car-electric" size={50} color={color} />
        );
      case "Electric Bike":
        return (
          <MaterialCommunityIcons
            name="motorbike-electric"
            size={50}
            color={color}
          />
        );
      case "Electric Bus":
        return (
          <MaterialCommunityIcons name="bus-electric" size={50} color={color} />
        );
      case "Electric Truck":
        return (
          <MaterialCommunityIcons
            name="motorbike-electric"
            size={50}
            color={color}
          />
        );
      case "Gasoline Car":
        return (
          <MaterialCommunityIcons name="car-estate" size={50} color={color} />
        );
      case "Gasoline Bike":
        return (
          <MaterialCommunityIcons name="car-estate" size={50} color={color} />
        );
      case "Gasoline Bus":
        return (
          <MaterialCommunityIcons name="car-estate" size={50} color={color} />
        );
      case "Gasoline Truck":
        return (
          <MaterialCommunityIcons name="car-estate" size={50} color={color} />
        );
    }
  };
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {loading ? <Loading /> : null}
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            flexDirection: "row",
          }}
        >
          {floor &&
            Object.keys(floor).map((key) => {
              return (
                <Pressable
                  key={key}
                  style={{
                    width: 150,
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor:
                      key == selectedfloor ? "#00C9B7" : "#E3F1F1",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setSelectedfloor(key);
                  }}
                >
                  <Text
                    style={{
                      color: key == selectedfloor ? "white" : "black",
                    }}
                  >
                    Floor Level {key}
                  </Text>
                </Pressable>
              );
            })}
        </ScrollView>
      </View>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {floor &&
            floor[selectedfloor] &&
            floor[selectedfloor].map((slot: any) => {
              return (
                <View key={slot.id}>
                  <Pressable
                    key={slot.id}
                    style={{
                      width: 150,
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      backgroundColor:
                        slot == selectedSlot ? "#00C9B7" : "#E3F1F1",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setSelectedSlot(slot);
                      // props.navigation.navigate("Payment", {
                      //   slot: slot,
                      //   parkzone: props.route.params?.id,
                      //   vehicleType: props.route.params?.vehicleType,
                      // });
                    }}
                  >
                    {getIcon(
                      props.route.params?.vehicleType,
                      slot == selectedSlot ? "white" : "black"
                    )}
                    <Text
                      style={{
                        color: slot == selectedSlot ? "white" : "black",
                      }}
                    >
                      {slot.name}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={{ height: "15%", width: "100%", alignContent: "center" }}>
        <Pressable
          disabled={selectedSlot == null ? true : false}
          style={{
            backgroundColor: selectedSlot == null ? "gray" : "#24aaa1",
            width: "80%",
            height: 50,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={() => {
            console.log(selectedSlot);
            props.navigation.navigate("PickTariff", {
              slot: selectedSlot,
              parkzone: props.route.params?.id,
              vehicleType: props.route.params?.vehicleType,
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
