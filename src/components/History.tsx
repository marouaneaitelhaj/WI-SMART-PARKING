import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const History = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [showSelectedButton, setShowSelectedButton] = useState(false);
  const [parkingData, setParkingData] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        axios
          .get("http://192.168.11.106:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            axios
              .get(
                "http://192.168.11.106:8000/api/showparking/" + response.data.id
              )
              .then((response) => {
                console.log("Parking Data:", response.data.data);
                setParkingData(response.data.data);
              })
              .catch((error) => {
                console.log("Parking Error:", error);
              });
          })
          .catch((error) => {
            console.log("User Error:", error);
          });
      }
    });
    if (selectedButton !== null) {
      setShowSelectedButton(true);

      const timer = setTimeout(() => {
        setShowSelectedButton(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedButton]);

  const handleButtonPress = (buttonIndex: number) => {
    setSelectedButton(buttonIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {
            setSelectedButton(0);
          }} />
        }
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 0
                ? { backgroundColor: "#24aaa1", borderWidth: 0 }
                : {},
            ]}
            onPress={() => handleButtonPress(0)}
          >
            <Text style={styles.buttonText}>Ongoing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1
                ? { backgroundColor: "#24aaa1", borderWidth: 0 }
                : {},
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2
                ? { backgroundColor: "#24aaa1", borderWidth: 0 }
                : {},
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text style={styles.buttonText}>Cancelled</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.titleText}>Your Booking Here</Text>
        </View>
        {parkingData &&
          parkingData.map((item: any, index: any) => {
            return (
              <View style={styles.imageContainer} key={index + item.id}>
                <Image
                  source={{
                    uri: "https://99acres.com/microsite/articles/files/2018/07/car-parking.jpg",
                  }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.idbook}>Booking ID:{item.barcode}</Text>
                  <Text style={styles.idbook}> {item.City}</Text>
                  <Text style={styles.Adress}>
                    <MaterialCommunityIcons
                      style={styles.iconStyle}
                      name="map-marker"
                      size={20}
                      color="black"
                    />
                    {item.Address}
                  </Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {showSelectedButton && (
        <View style={styles.selectedButtonContainer}>
          <Text style={styles.selectedButtonText}>
            Selected: {["Ongoing", "History", "Cancelled"][selectedButton]}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 100,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  selectedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#24aaa1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectedButtonText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row",
    // alignItems: 'center',

    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  image: {
    width: 140,
    height: 140,
    marginRight: 30,
    borderRadius: 15,
  },
  text: {
    fontWeight: "bold",
  },
  idbook: {
    fontWeight: "bold",
    marginTop: 10,
  },
  status: {
    marginTop: 10,
    color: "green",
    backgroundColor: "#98FB98",
    width: 130,
    borderRadius: 10,
    textAlign: "center",
  },
  Adress: {
    marginTop: 20,
  },
});

export default History;
