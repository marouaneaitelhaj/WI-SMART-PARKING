import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import InformationCard from "./informationCard";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";
export default function App({ navigation }: { navigation: any }) {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [parkZones, setParkZones] = useState<any>([]);
  const [informationCard, setInformationCard] = useState<any>(null); // [1
  const [visible, setVisible] = useState(false);
  const toogleSwitch = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getParkZones();
    })();
  }, [visible]);

  const getParkZones = async () => {
    try {
      const response = await axios.get(
        "http://192.168.11.102:8000/api/readparkzones"
      );
      setParkZones(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const listofparkzones = () => {
    return parkZones.map((parkZone: any) => {
      return (
        <Marker
          onPress={() => {
            setInformationCard(parkZone);
            toogleSwitch();
          }}
          key={parkZone.id}
          coordinate={{
            latitude: Number(parkZone.lat),
            longitude: Number(parkZone.lng),
          }}
          title={parkZone.name}
          description={parkZone.remarks}
          pinColor="#24aaa1"
        >
          <Image
            source={require("../../assets/parking.png")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
      );
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        {...(location && {
          initialRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        })}
        style={styles.map}
      >
        {location && (
          <Marker
            key={`${location.coords.latitude}-${location.coords.longitude}`}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="Here I am"
          />
        )}
        {listofparkzones()}
      </MapView>
      <InformationCard
        navigation={navigation}
        visible={visible}
        title={informationCard?.name}
        description={informationCard?.remarks}
        id={informationCard?.id}
      />
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
