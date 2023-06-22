import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export default function PickParkingSlot(
  props: any,
  { navigation }: { navigation: any }
) {
  const [floor, setFloor] = useState<any>(null);
  const [selectedfloor, setSelectedfloor] = useState<any>(null);
  useEffect(() => {
    axios
      .get(
        "http://192.168.11.110:8000/api/readparkzones/" +
          props.route.params?.id +
          "/" +
          props.route.params.vehicleType
      )
      .then((response) => {
        console.log(response.data);
        setFloor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
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
          flexDirection: "column",
        }}
      >
        {floor &&
          floor[selectedfloor] &&
          floor[selectedfloor].map((slot: any) => {
            return (
              <View 
              key={slot.id}
              >
                <Pressable
                  key={slot.id}
                  style={{
                    width: 150,
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: "#E3F1F1",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    props.navigation.navigate("Payment", {
                      slot: slot,
                      parkzone: props.route.params?.id,
                      vehicleType: props.route.params?.vehicleType,
                    });
                  }}
                >
                  <Text>{slot.name}</Text>
                </Pressable>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
