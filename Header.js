import { View, Text } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 55,
        marginLeft: 15,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "black",
          fontWeight: "bold",
        }}
      >
        SignIn With Google using React Native Expo and Firebase
      </Text>
    </View>
  );
};

export default Header;
