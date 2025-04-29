import { View, Text, Image } from "react-native";
import React from "react";
const Logo = () => {
  const logo = require("../assets/images/busy2shop.png");
  return (
    <View>
      <Image
        source={logo}
        resizeMode="contain"
        style={{ width: 190, height: 150, alignSelf: "center" }}
      />
    </View>
  );
};

export default Logo;
