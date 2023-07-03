import React, { useState, useEffect } from "react";
import { Button, Pressable, Text, View } from "react-native";

export default function App(props: any) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Pressable
        onPress={() => {
          props.onPress();
        }}
        style={{
          backgroundColor: "#24aaa1",
          borderRadius: 10,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Retry
        </Text>
      </Pressable>
    </View>
  );
}
