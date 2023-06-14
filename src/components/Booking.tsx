import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import axios from "axios";
const Booking = (props: any, { navigation }: { navigation: any }) => {
  const [slotsParkzone, setSlotsParkzone] = useState<any>([]);
  useEffect(() => {
    (async () => {
      if (props.route.params.id) {
        axios
          .get(
            "http://192.168.11.102:8000/api/readparkzones/" +
              props.route.params.id
          )
          .then((response) => {
            console.log(response.data);
            setSlotsParkzone(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, [props.route.params.id]);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Booking</Text>
        <Text>{props.route.params?.id}</Text>
        <Text>{props.route.params?.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Booking;
