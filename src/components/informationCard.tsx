import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function InformationCard(props: any) {
  if (props.visible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <View style={styles.bigOne}>
        <View style={styles.smallOne}>
          <MaterialCommunityIcons  style={styles.iconStyle}name="car" size={30} color="#0D6EFD">
            <Text>{props?.category["Electric Car"]}</Text>
          </MaterialCommunityIcons>
          <MaterialCommunityIcons  style={styles.iconStyle}name="bus" size={30} color="#0D6EFD">
            <Text>{props?.category["Electric Bus"]}</Text>
          </MaterialCommunityIcons>
          <MaterialCommunityIcons  style={styles.iconStyle}name="bike" size={30} color="#0D6EFD">
            <Text>{props?.category["Electric Bike"]}</Text>
          </MaterialCommunityIcons>
          <MaterialCommunityIcons  style={styles.iconStyle}name="truck" size={30} color="#0D6EFD">
            <Text>{props?.category["Electric Truck"]}</Text>
          </MaterialCommunityIcons>
        </View>
        <View style={styles.smallOne}>
          <MaterialCommunityIcons  style={styles.iconStyle}name="car" size={30} color="#FFC107">
            <Text>{props?.category["Gasoline Car"]}</Text>
          </MaterialCommunityIcons>
          <MaterialCommunityIcons  style={styles.iconStyle}name="bus" size={30} color="#FFC107">
            <Text>{props?.category["Gasoline Bus"]}</Text>
          </MaterialCommunityIcons>
          <MaterialCommunityIcons  style={styles.iconStyle}name="bike" size={30} color="#FFC107">
            <Text>{props?.category["Gasoline Bike"]}</Text>
          </MaterialCommunityIcons>
          <MaterialCommunityIcons  style={styles.iconStyle}name="truck" size={30} color="#FFC107">
            <Text>{props?.category["Gasoline Truck"]}</Text>
          </MaterialCommunityIcons>
        </View>
      </View>
      <Button
        title="Book Now"
        onPress={() => {
          props.navigation.navigate("Booking", {
            title: props.title,
            description: props.description,
            price: props.price,
            image: props.image,
            id: props.id,
          });
        }}
        color={"#24aaa1"}
      />
    </View>
  );
}
// Styling
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  scrolview: {
    marginHorizontal: 10,
    // padding: 10,
  },
  bigOne: {
    width: "100%",
    justifyContent: "center",
    display: "flex",
    // flexDirection: "row",
  },
  smallOne: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  iconStyle: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
