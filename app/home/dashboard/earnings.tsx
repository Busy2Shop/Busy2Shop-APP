import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import tw from "twrnc";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import AwardIcon from "@/assets/icons/award.svg";
import BottomNavBar from "@/components/BottomNavbar";
import { LinearGradient } from "expo-linear-gradient";

const Earnings = () => {
  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-white pt-10`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 `}>
        <TouchableOpacity style={tw`p-2`} onPress={() => router.back()}>
          <LeftArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-600 text-[#2A2A2A] ml-2`}>
          Earnings & Growth
        </Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Today's Stats */}
        <View style={tw` rounded-lg border border-[#5D5D5D] mx-4 my-2`}>
          <View style={tw`flex-row p-4 `}>
            {/* Today earnings */}
            <View style={tw`flex-1 items-center justify-center p-4  `}>
              <Text style={tw`text-[34px] font-700 text-[#00A884]`}>
                N1,200
              </Text>
              <Text style={tw`text-gray-500 mt-1`}>Today earnings</Text>
            </View>
            {/* Today orders */}
            <View style={tw`flex-1 items-center justify-center p-4  ml-2`}>
              <Text style={tw`text-[34px] font-700 text-[#00A884]`}>13</Text>
              <Text style={tw`text-gray-500 mt-1`}>Today orders</Text>
            </View>
          </View>

          {/* Base fee info */}
          <View style={tw`mx-4 py-2 border-t border-[#C4C4C4] `}>
            <Text style={tw`text-gray-500 text-center`}>
              Base fee per order: N100
            </Text>
          </View>
        </View>

        {/* Refer & Earn card */}
        <LinearGradient
          colors={["#00B55C", "#FF9400"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`mx-4 my-2 px-4 pt-2 rounded-lg`}
        >
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-1  pr-4`}>
              <Text style={tw`text-white font-bold text-[16px]  mb-1`}>
                Refer & Earn!
              </Text>
              <Text
                style={tw`text-white text-justify  font-500 text-[10px] mb-3`}
              >
                Invite your friends & family and you will both get instant cash
                rewards upon purchase.
              </Text>
              <TouchableOpacity
                style={tw`bg-red-500 py-2 mb-2 px-4 rounded-lg self-start`}
                onPress={() => router.push("/home/dashboard/refer")}
              >
                <Text style={tw`text-white font-semibold`}>Share Now</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-1`}>
              <Image
                source={require("../../../assets/images/refer.png")}
                style={tw`w-[155px] h-[118px]`}
                resizeMode="contain"
              />
            </View>
          </View>
        </LinearGradient>

        <View>
          <TouchableOpacity
            style={tw`mx-4 my-2 p-4 border border-gray-100 bg-[#00A082] rounded-lg`}
            onPress={() => router.push("/home/dashboard/withdrawEarnings")}
          >
            <Text style={tw`text-center text-[#FBFBFC] text-[16px] font-600`}>
              Withdraw Earnings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily Bonuses Section */}
        <View style={tw`mx-4 my-3 p-4 border border-gray-200 rounded-lg`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Daily Bonuses</Text>
          <Text style={tw`text-sm text-gray-500 mb-4`}>
            Earn extra with daily achievements
          </Text>

          {/* N500 bonus */}
          <View style={tw`flex-row items-start mb-4`}>
            <View
              style={tw`w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-3`}
            >
              <AwardIcon width={24} height={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`font-semibold`}>N500 bonus</Text>
              <Text style={tw`text-sm text-gray-500`}>
                Complete 10 or more deliveries in a day
              </Text>
            </View>
          </View>

          {/* Additional N500 bonus */}
          <View style={tw`flex-row items-start`}>
            <View
              style={tw`w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-3`}
            >
              <AwardIcon width={24} height={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`font-semibold`}>Additional N500 bonus</Text>
              <Text style={tw`text-sm text-gray-500`}>
                For order totaling N100,000+ in a day
              </Text>
            </View>
          </View>
        </View>

        {/* Additional Incentives Section */}
        <View style={tw`mx-4 mt-3 mb-22 p-4 border border-gray-200 rounded-lg`}>
          <Text style={tw`text-lg font-semibold mb-2`}>
            Additional Incentives
          </Text>
          <Text style={tw`text-sm text-gray-500 mb-4`}>
            Maximize your earnings with these opportunities
          </Text>

          {/* Performance Incentives */}
          <View style={tw`mb-4`}>
            <Text style={tw`font-semibold mb-1`}>Performance Incentives</Text>
            <Text style={tw`text-sm text-gray-500`}>
              Earn additional bonuses based on your customer ratings and
              delivery efficiency.
            </Text>
          </View>

          {/* Market-Based Bonuses */}
          <View>
            <Text style={tw`font-semibold mb-1`}>Market-Based Bonuses</Text>
            <Text style={tw`text-sm text-gray-500`}>
              Receive special bonuses when completing deliveries in challenging
              markets or circumstances.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

export default Earnings;
