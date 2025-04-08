import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import OnModeToggleIcon from "@/assets/icons/toggle-on.svg";
import OrderIcon from "@/assets/icons/package.svg";
import RatingIcon from "@/assets/icons/rating.svg";
import TimerIcon from "@/assets/icons/timer.svg";

import tw from "twrnc";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();

  return (
    <View style={tw`flex-1`}>
      <View style={tw`bg-[#00A082] rounded-b-2xl`}>
        <View style={tw`flex flex-row items-center mt-[24px] px-5`}>
          <TouchableOpacity
            onPress={() => router.push("/home/dashboard/page")}
            style={tw`w-6 h-6 md:hidden`}
          >
            <Image
              source={require("../../../assets/images/arrow-left.png")}
              style={tw`absolute bottom-0 right-43 w-6 h-6`}
            />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-[#F7F7F7] pl-[3px] text-[20px] font-[500]`}>
              Profile
            </Text>
          </View>
        </View>

        <View style={tw`flex flex-row justify-center mt-8 relative`}>
          <Image
            source={require("../../../assets/images/Avatar.png")}
            style={{ width: 80, height: 80 }}
          />
          <Image
            source={require("../../../assets/images/copy.png")}
            style={tw`absolute bottom-0 right-43 w-6 h-6`}
          />
        </View>

        <View
          style={tw`flex flex-row justify-center items-center mt-[8px] mb-[24px]`}
        >
          <View style="">
            <Text style={tw`text-base text-[#F7F7F7] font-medium`}>
              John Bruno
            </Text>
            <Text style={tw`text-sm text-[#F7F7F7] font-normal`}>
              NIN: 5278902456
            </Text>
          </View>
        </View>
      </View>

      {/* First card section */}
      <View
        style={{
          ...tw`mx-5 px-[12px] rounded-lg my-6`,
          borderWidth: 0.5,
          borderColor: "#5D5D5D",
        }}
      >
        {/* Profile Settings Section */}
        <View
          style={{
            ...tw`flex flex-row justify-between items-center py-4`,
            borderBottomWidth: 0.5,
            borderBottomColor: "#5D5D5D",
            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={require("../../../assets/images/profile-circle.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Profile Settings
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/copy.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>

        {/* Biometrics Section */}
        <View
          style={{
            ...tw`flex flex-row justify-between items-center  py-4`,
            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={require("../../../assets/images/thumb.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Enable Biometrics
            </Text>
          </View>
          <OnModeToggleIcon width={30} height={30} />
        </View>
      </View>

      <Text style={tw`mx-5 mb-2`}>Performance</Text>

      {/* Performance card section */}
      <View
        style={{
          ...tw`mx-5 px-[12px] rounded-lg`,
          borderWidth: 0.5,
          borderColor: "#5D5D5D",
        }}
      >
        {/* Package Delivered Section */}
        <View
          style={{
            ...tw`flex flex-row justify-between items-center  py-4`,
            borderBottomWidth: 0.5,
            borderBottomColor: "#5D5D5D",
            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <OrderIcon />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Package Delivered
            </Text>
          </View>
          <Text style={tw`text-[#5D5D5D] text-[16px] font-[500]`}>63</Text>
        </View>

        {/* Average Ratings Section */}
        <View
          style={{
            ...tw`flex flex-row justify-between items-center  py-4`,
            borderBottomWidth: 0.5,
            borderBottomColor: "#5D5D5D",
            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <RatingIcon />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              Average Ratings
            </Text>
          </View>
          <Text style={tw`text-[#5D5D5D] text-[16px] font-[500]`}>4.9/5</Text>
        </View>

        {/* On-time Delivery Section */}
        <View
          style={{
            ...tw`flex flex-row justify-between items-center py-4`,
            marginHorizontal: 10,
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <TimerIcon />
            <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
              On time Delivery
            </Text>
          </View>
          <Text style={tw`text-[#5D5D5D] text-[16px] font-[500]`}>98%</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
