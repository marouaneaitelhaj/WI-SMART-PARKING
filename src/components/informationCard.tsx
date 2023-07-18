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
  type Category = {
    [key: string]: {
      total: number;
      available: number;
    };
  };

  type Props = {
    category?: Category;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <View style={styles.bigOne}>
        <View style={styles.smallOne}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="car"
              size={30}
              color="#0D6EFD"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Electric Car"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Electric Car"]?.available || 0}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="bus"
              size={30}
              color="#0D6EFD"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Electric Bus"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Electric Bus"]?.available || 0}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="bike"
              size={30}
              color="#0D6EFD"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Electric Bike"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Electric Bike"]?.available || 0}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="truck"
              size={30}
              color="#0D6EFD"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Electric Truck"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Electric Truck"]?.available || 0}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.smallOne}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="car"
              size={30}
              color="#FFC107"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Gasoline Car"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Gasoline Car"]?.available || 0}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="bus"
              size={30}
              color="#FFC107"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Gasoline Bus"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Gasoline Bus"]?.available || 0}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="bike"
              size={30}
              color="#FFC107"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Gasoline Bike"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Gasoline Bike"]?.available || 0}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="truck"
              size={30}
              color="#FFC107"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {props?.category?.["Gasoline Truck"]?.total || 0}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#198754" }}
              >
                {props?.category?.["Gasoline Truck"]?.available || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Button
        title="Book Now"
        onPress={() => {
          props.navigation.navigate("VehicleType", {
            title: props.title,
            description: props.description,
            price: props.price,
            image: props.image,
            id: props.id,
            data: props.data,
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
    justifyContent: "space-between",
  },
  iconStyle: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
