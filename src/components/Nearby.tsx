import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import InformationCard from "./informationCard";
import * as Location from "expo-location";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./fx/loading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/store"; // Import the setToken action
import Retry from "./fx/retry";
export default function App({ navigation }: { navigation: any }) {
  const [location, setLocation] = useState<any>(null);
  const [reload, setReload] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [parkZones, setParkZones] = useState<any>([]);
  const [informationCard, setInformationCard] = useState<any>(null); // [1
  const [visible, setVisible] = useState(false);
  const token = useSelector((state: { token: string | null }) => state.token);
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
    // get token from AsyncStorage
    // AsyncStorage.getItem("token").then((token) => {
    //   console.log("token " + token);
    // });
  }, [visible]);

  const getParkZones = () => {
    setLoading(true);
    axios
      .get("http://192.168.11.106:8000/api/readparkzones")
      .then((response) => {
        setParkZones(response.data);
      })
      .catch((error) => {
        setReload(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const listofparkzones = () => {
    return parkZones.map((parkZone: any) => {
      return (
        <Marker
          onPress={() => {
            setInformationCard(parkZone);
            if (visible === false) {
              toogleSwitch();
            }
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
      {reload && (
        <Retry
          onPress={() => {
            setReload(false);
            getParkZones();
          }}
        />
      )}
      {loading && <Loading />}
      <MapView
        onPress={() => {
          setInformationCard(null);
          if (visible === true) {
            toogleSwitch();
          }
        }}
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
        category={informationCard?.category}
        available={informationCard?.available}
        navigation={navigation}
        visible={visible}
        title={informationCard?.name}
        description={informationCard?.remarks}
        id={informationCard?.id}
        data={informationCard}
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
