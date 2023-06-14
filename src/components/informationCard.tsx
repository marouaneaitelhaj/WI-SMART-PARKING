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
export default function InformationCard(props: any) {
  if (props.visible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <SafeAreaView style={{ flex: 1 , padding: 20, width: '100%'}}>
        <ScrollView  horizontal={true} style={{width: '100%'}}>
          <Ionicons
            name="car"
            size={40}
            style={styles.scrolview}
            color="#f2a654"
          />
          <Ionicons
            name="bicycle"
            size={40}
            style={styles.scrolview}
            color="#f2a654"
          />
          <Ionicons
            name="bus"
            size={40}
            style={styles.scrolview}
            color="#f2a654"
          />
          <FontAwesomeIcon
            style={styles.scrolview}
            size={40}
            icon={faMotorcycle}
            color="#f2a654"
          />
          <Ionicons
            name="car"
            style={styles.scrolview}
            size={40}
            color="#46c35f"
          />
          <Ionicons
            name="bicycle"
            size={40}
            style={styles.scrolview}
            color="#46c35f"
          />
          <Ionicons
            name="bus"
            size={40}
            style={styles.scrolview}
            color="#46c35f"
          />
          <FontAwesomeIcon
            style={styles.scrolview}
            size={40}
            icon={faMotorcycle}
            color="#46c35f"
          />
        </ScrollView>
      </SafeAreaView>
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
});
