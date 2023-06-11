import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";
export default function App() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [parkZones, setParkZones] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      getParkZones(); // Call getParkZones after obtaining the location
      // console.log(parkZones);
    })();
  }, []);

  const getParkZones = async () => {
    try {
      const response = await axios.get(
        "http://192.168.11.102:8000/api/readparkzones"
      );
      // console.log(response.data);
      setParkZones(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {location && (
          <Marker
            key={-1}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="Here I am"
          />
        )}
        {parkZones.map((parkzone: any) => (
          <Marker
            key={parkzone.lat}
            coordinate={{
              latitude: parseInt(parkzone.lat),
              longitude: parseInt(parkzone.lng),
            }}
            title={parkzone.name}
            description={parkzone.remarks}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
