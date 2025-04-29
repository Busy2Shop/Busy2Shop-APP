import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const DocumentUploadSection = () => {
  const [ninSlipImage, setNinSlipImage] = useState<string | null>(null);
  const [proofOfAddressImage, setProofOfAddressImage] = useState<string | null>(
    null
  );

  const takePhoto = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = require("../assets/images/upload.png");

  const renderImageUploader = (
    title: string,
    image: string | null,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <View className="px-5 mt-7">
      <Text className="text-base font-medium text-[#434343] px-3">{title}</Text>
      <View className="  mx-auto w-full   max-w-[353px]">
        <TouchableOpacity
          className="flex justify-center items-center "
          onPress={() => takePhoto(setImage)}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-[150px] rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={uploadImage}
              style={{ width: 300, height: 100 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {renderImageUploader("Upload NIN Slip", ninSlipImage, setNinSlipImage)}
      {renderImageUploader(
        "Upload Proof of Address",
        proofOfAddressImage,
        setProofOfAddressImage
      )}
    </>
  );
};

export default DocumentUploadSection;
