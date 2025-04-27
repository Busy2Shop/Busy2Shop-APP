import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import tw from "twrnc";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";

const Refer = () => {
  const router = useRouter();
  const [showBonusTiers, setShowBonusTiers] = useState(false);
  const referralLink = "https://example.com/refuser123";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralLink);
    // You could add toast notification here
  };

  return (
    <View style={tw`flex-1 bg-white pt-10`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4`}>
        <TouchableOpacity style={tw`p-2`} onPress={() => router.back()}>
          <LeftArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-semibold text-[#2A2A2A] ml-2`}>
          Refer & Earn
        </Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={tw`items-center justify-center py-4`}>
          <Image
            source={require("../../../assets/images/referrals.png")}
            style={tw`w-80 h-80`}
            resizeMode="contain"
          />
        </View>

        {/* Referral Link Section */}
        <View
          style={tw`mx-4 rounded-lg p-4 bg-white border border-gray-200 mb-4`}
        >
          <Text style={tw`font-medium text-gray-700 mb-3`}>
            Your Referral Link
          </Text>
          <View
            style={tw`flex-row border border-gray-300 rounded-lg overflow-hidden `}
          >
            <TextInput
              style={tw`flex-1 py-1 text-gray-600 bg-white`}
              value={referralLink}
              editable={false}
            />
            <TouchableOpacity
              style={tw`bg-[#00A082] rounded-lg mx-1.7 my-1 px-2 flex-row items-center justify-center`}
              onPress={copyToClipboard}
            >
              <Feather name="copy" size={15} color="white" style={tw`mr-1`} />
              <Text style={tw`text-white font-medium `}>Copy</Text>
            </TouchableOpacity>
          </View>
          {/* How It Works Section */}
          <View style={tw`mt-8`}>
            <Text style={tw`font-medium text-gray-700 mb-4`}>How it works</Text>
            <View>
              <Text style={tw`text-gray-600 mb-2`}>
                1. Share your unique referral link with friends
              </Text>
              <Text style={tw`text-gray-600 mb-2`}>
                2. They sign up using your link
              </Text>
              <Text style={tw`text-gray-600 mb-2`}>
                3. You earn N100 after their first checkout
              </Text>
              <Text style={tw`text-gray-600`}>
                4. Your friend also gets N500 credit
              </Text>
            </View>
          </View>
        </View>

        {/* Terms & Conditions */}
        <View
          style={tw`mx-4 rounded-lg p-4 bg-white border border-gray-200 mb-4`}
        >
          <Text style={tw`font-medium text-gray-700 mb-4`}>
            Terms & Conditions
          </Text>
          <View>
            <View style={tw`flex-row items-baseline mb-3`}>
              <Text style={tw`text-gray-400 mr-2 text-lg`}>•</Text>
              <Text style={tw`text-gray-500`}>
                Referral must be a new user.
              </Text>
            </View>
            <View style={tw`flex-row items-baseline`}>
              <Text style={tw`text-gray-400 mr-2 text-lg`}>•</Text>
              <Text style={tw`text-gray-500`}>
                Rewards are collected after their first order.
              </Text>
            </View>
          </View>
        </View>

        {/* Your Progress */}
        <View
          style={tw`mx-4 rounded-lg p-4 bg-white border border-gray-200 mb-4`}
        >
          <Text style={tw`font-medium text-gray-700 mb-3`}>Your Progress</Text>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-600`}>Successful Referrals: 3</Text>
            <Text style={tw`text-gray-600`}>Total Earnings: N1,500</Text>
          </View>

          {/* Progress Bar */}
          <View style={tw`bg-gray-200 h-2 rounded-full mb-2`}>
            <View style={tw`bg-[#FF9400] h-full w-1/3 rounded-full`} />
          </View>
          <Text style={tw`text-xs text-gray-500 text-center`}>
            7 more referrals to reach the next tier!
          </Text>
        </View>

        {/* Show Bonus Tiers Toggle */}
        <View style={tw`mx-4 mb-3 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            {!showBonusTiers ? (
              <Switch
                trackColor={{ false: "#D1D1D1", true: "#00B55C" }}
                thumbColor={"#FFFFFF"}
                onValueChange={() => setShowBonusTiers(!showBonusTiers)}
                value={showBonusTiers}
                style={tw`m-0 p-0`}
              />
            ) : (
              <Switch
                trackColor={{ false: "#D1D1D1", true: "#00B55C" }}
                thumbColor={"#FFFFFF"}
                onValueChange={() => setShowBonusTiers(!showBonusTiers)}
                value={showBonusTiers}
                style={tw`m-0 p-0`}
              />
            )}

            <Text style={tw`font-medium text-gray-700`}>Show Bonus Tiers</Text>
          </View>
        </View>

        {/* Bonus Tiers - Conditional Rendering */}
        {showBonusTiers && (
          <View
            style={tw`mx-4 rounded-lg p-4 bg-white border border-gray-200 mb-8`}
          >
            <Text style={tw`font-medium text-gray-700 mb-4`}>Bonus Tiers</Text>

            <View style={tw`flex-row items-center justify-between mb-3`}>
              <Text style={tw`text-gray-600`}>Refer 5 friends</Text>
              <Text style={tw`text-[#00A082] font-medium`}>
                Get extra N1,000
              </Text>
            </View>

            <View style={tw`flex-row items-center justify-between mb-3`}>
              <Text style={tw`text-gray-600`}>Refer 10 friends</Text>
              <Text style={tw`text-[#00A082] font-medium`}>
                Get extra N2,500
              </Text>
            </View>

            <View style={tw`flex-row items-center justify-between mb-3`}>
              <Text style={tw`text-gray-600`}>Refer 20 friends</Text>
              <Text style={tw`text-[#00A082] font-medium`}>
                Get extra N5,000
              </Text>
            </View>

            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-gray-600`}>Refer 50 friends</Text>
              <Text style={tw`text-[#00A082] font-medium`}>
                Get extra N15,000
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Refer;
