import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  return (
    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
        <ActivityIndicator
      size="large"
      color="#24aaa1"
      animating={true}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
      }}
    />
    </View>
  );
}
