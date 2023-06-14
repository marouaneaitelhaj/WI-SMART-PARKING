import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
const Booking = (props: any) => {
  const [slotsParkzone, setSlotsParkzone] = useState<any>([]);
  useEffect(() => {
    (async () => {
      if (props.route.params.id) {
        axios
          .get(
            "http://192.168.11.107:8000/api/readparkzones/" +
              props.route.params.id
          )
          .then((response) => {
            console.log(response.data.slots);
            setSlotsParkzone(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, []);
  return (
    <View>
      <Text>Booking</Text>
      <Text>{props.route.params?.id}</Text>
      <Text>{props.route.params?.description}</Text>
      {slotsParkzone &&
        slotsParkzone.map((slot: any) => {
          return (
            <Text key={slot.id}>
              {slot.slot_name}
            </Text>
          );
        })}
    </View>
  );
};
export default Booking;
