import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef } from "react";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons"; // Make sure to install expo/vector-icons

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  image: any; // Replace 'any' with the appropriate type for your image source
  title: string;
  description: string;
};

const Onboarding = ({
  slides,
  onComplete,
  primaryColor = "#00A082", // Default green color from the design
}: {
  slides: Slide[];
  onComplete?: () => void;
  primaryColor?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Complete onboarding
      onComplete && onComplete();
    }
  };

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems && viewableItems.length > 0) {
        if (viewableItems[0].index !== null) {
          setCurrentIndex(viewableItems[0].index);
        }
      }
    }
  ).current;

  const renderItem = ({ item, index }: { item: Slide; index: number }) => {
    const isLastSlide = index === slides.length - 1;

    return (
      <View style={[tw`flex-1 items-center px-4 bg-[#00A082]`, { width }]}>
        {/* Top portion with the image */}
        <View style={tw`items-center mt-30 flex-1`}>
          <View
            style={tw`bg-${primaryColor.replace(
              "#",
              ""
            )}/10 rounded-full w-94 h-64 items-center overflow-hidden`}
          >
            <Image
              source={item.image}
              style={tw`w-56 h-56`}
              resizeMode="contain"
            />
          </View>
          <View style={[tw`w-full rounded-[24px] mt-24  p-5 bg-[#09090940]`]}>
            <Text
              style={tw`text-[#F7F7F7] text-[24px] font-700 text-center mb-1`}
            >
              {item.title}
            </Text>
            <Text style={tw`text-[#F7F7F7] text-[20px]   text-center mb-9`}>
              {item.description}
            </Text>

            {/* Circle button */}
          </View>
          {/* Bottom green card with text and button */}
          <View style={tw`items-center -mt-6`}>
            <TouchableOpacity
              style={tw`bg-white w-12 h-12 rounded-full items-center justify-center`}
              onPress={goToNext}
            >
              {isLastSlide ? (
                <Feather name="check" size={26} color={primaryColor} />
              ) : (
                <Feather name="chevron-right" size={26} color={primaryColor} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#00A082]`}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Page indicator dots */}
      <View
        style={tw`flex-row justify-center pb-8 absolute bottom-0 left-0 right-0`}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              tw`h-2 w-2 rounded-full mx-1`,
              {
                backgroundColor:
                  index === currentIndex ? "#FFFFFF" : "rgba(255,255,255,0.4)",
              },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
