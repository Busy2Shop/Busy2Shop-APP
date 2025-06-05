import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useUploadDocumentsMutation } from "@/app/store/api/userApiSlice";
import tw from "twrnc";

interface DocumentUploadSectionProps {
  onSubmit?: (documents: DocumentData) => void;
  onSkip?: () => void;
}

interface DocumentData {
  ninSlip: string | null;
  proofOfAddress: string | null;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  onSubmit,
  onSkip,
}) => {
  const router = useRouter();
  const [ninSlipImage, setNinSlipImage] = useState<string | null>(null);
  const [proofOfAddressImage, setProofOfAddressImage] = useState<string | null>(
    null
  );

  // Use the Redux mutation hook
  const [uploadDocuments, { isLoading: isUploading, error }] =
    useUploadDocumentsMutation();

  // Function to show image selection options
  const showImagePicker = (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: () => takePhoto(setImage),
        },
        {
          text: "Gallery",
          onPress: () => pickFromGallery(setImage),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Function to take photo from camera
  const takePhoto = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Camera permission is required to take photos"
          );
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  // Function to pick image from gallery
  const pickFromGallery = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Gallery permission is required to select photos"
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Gallery error:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  // Function to upload images using Redux mutation
  const handleUploadDocuments = async () => {
    if (!ninSlipImage && !proofOfAddressImage) {
      Alert.alert(
        "No Documents",
        "Please upload at least one document before submitting."
      );
      return;
    }

    try {
      const formData = new FormData();

      if (ninSlipImage) {
        const ninSlipFile = {
          uri: ninSlipImage,
          type: "image/jpeg",
          name: "nin_slip.jpg",
        } as any;
        formData.append("ninSlip", ninSlipFile);
      }

      if (proofOfAddressImage) {
        const proofOfAddressFile = {
          uri: proofOfAddressImage,
          type: "image/jpeg",
          name: "proof_of_address.jpg",
        } as any;
        formData.append("proofOfAddress", proofOfAddressFile);
      }

      // Use Redux mutation
      const result = await uploadDocuments(formData).unwrap();

      Alert.alert(
        "Success",
        result.message || "Documents uploaded successfully!"
      );

      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit({
          ninSlip: ninSlipImage,
          proofOfAddress: proofOfAddressImage,
        });
      }

      // Navigate to dashboard
      router.push("/home/dashboard/page");
    } catch (error) {
      console.error("Document upload error:", error);

      let errorMessage = "Failed to upload documents. Please try again.";

      if (typeof error === "object" && error !== null && "data" in error) {
        errorMessage = (error as any).data?.message || errorMessage;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      Alert.alert("Upload Failed", errorMessage);
    }
  };

  // Function to handle skip
  const handleSkip = () => {
    Alert.alert(
      "Skip Document Upload",
      "You can upload your documents later from your profile settings. Continue to dashboard?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            if (onSkip) {
              onSkip();
            }
            router.push("/home/dashboard/page");
          },
        },
      ]
    );
  };

  const uploadImage = require("../assets/images/upload.png");

  // Render individual image uploader - matching your design
  const renderImageUploader = (
    title: string,
    image: string | null,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <View style={tw`px-5 mt-7`}>
      <Text style={tw`text-base font-medium text-[#434343] px-3 mb-3`}>
        {title}
      </Text>
      <View style={tw`mx-auto w-full max-w-[353px]`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center`}
          onPress={() => showImagePicker(setImage)}
          disabled={isUploading}
        >
          {image ? (
            <View style={tw`relative w-full`}>
              <Image
                source={{ uri: image }}
                style={tw`w-full h-[150px] rounded-lg`}
                resizeMode="cover"
              />
              {/* Remove button overlay */}
              <TouchableOpacity
                style={tw`absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center`}
                onPress={() => setImage(null)}
                disabled={isUploading}
              >
                <Text style={tw`text-white text-xs font-bold`}>×</Text>
              </TouchableOpacity>
            </View>
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
    <View style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`px-5 mb-4`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>
          Upload Documents
        </Text>
        <Text style={tw`text-gray-600 text-base leading-6`}>
          Please upload your documents to complete your verification process.
        </Text>
      </View>

      {/* Document Upload Sections */}
      {renderImageUploader("Upload NIN Slip", ninSlipImage, setNinSlipImage)}
      {renderImageUploader(
        "Upload Proof of Address",
        proofOfAddressImage,
        setProofOfAddressImage
      )}

      {/* Error Display */}
      {error && (
        <View
          style={tw`mx-5 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg`}
        >
          <Text style={tw`text-red-600 text-sm`}>
            {"data" in (error as any) && (error as any).data?.message
              ? (error as any).data.message
              : typeof error === "object" && "message" in error && error.message
              ? (error as { message: string }).message
              : "An error occurred during upload. Please try again."}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={tw`px-5 mt-10 space-y-4`}>
        {/* Submit Button */}
        <TouchableOpacity
          style={tw`w-full py-4 rounded-lg ${
            isUploading
              ? "bg-[#00A082]"
              : ninSlipImage || proofOfAddressImage
              ? "bg-blue-600"
              : "bg-[#00A082]"
          } shadow-sm`}
          onPress={handleUploadDocuments}
          disabled={isUploading || (!ninSlipImage && !proofOfAddressImage)}
        >
          {isUploading ? (
            <View style={tw`flex-row items-center justify-center`}>
              <ActivityIndicator color="white" size="small" />
              <Text style={tw`text-white font-semibold ml-2`}>
                Uploading Documents...
              </Text>
            </View>
          ) : (
            <Text style={tw`text-white text-center font-semibold text-base`}>
              Submit Documents
            </Text>
          )}
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          style={tw`w-full py-4 rounded-lg border border-gray-300 bg-[#00A082]`}
          onPress={handleSkip}
          disabled={isUploading}
        >
          <Text style={tw`text-gray-700 text-center font-semibold text-base`}>
            Skip for Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Helper Text */}
      <View style={tw`px-5 mt-4`}>
        <Text style={tw`text-xs text-gray-500 text-center leading-4`}>
          Documents help verify your identity and ensure secure transactions.
          You can always upload them later from your profile settings.
        </Text>
      </View>
    </View>
  );
};

export default DocumentUploadSection;
