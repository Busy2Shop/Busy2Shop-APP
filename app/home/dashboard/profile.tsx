import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";

import OnModeToggleIcon from "@/assets/icons/toggle-on.svg";
import ArrowRightIcon from "@/assets/icons/arrow-rights.svg";
import OrderIcon from "@/assets/icons/package.svg";
import RatingIcon from "@/assets/icons/rating.svg";
import TimerIcon from "@/assets/icons/timer.svg";

import tw from "twrnc";
import { useRouter } from "expo-router";
import BottomNavBar from "@/components/BottomNavbar";

const Profile = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Close modal and proceed with logout
    setShowLogoutModal(false);
    router.push("/(auth)/agent/login");
  };

  return (
    <View style={tw`flex-1`}>
      {/* Top green header - keep outside of ScrollView */}
      <View style={tw`bg-[#00A082] rounded-b-2xl`}>
        <View style={tw`flex flex-row items-center mt-[24px] px-5 mt-14`}>
          <TouchableOpacity
            onPress={() => router.push("/home/dashboard/page")}
            style={tw`w-6 h-6 md:hidden`}
          >
            <Image
              source={require("../../../assets/images/arrow-left.png")}
              style={tw`bottom-0 w-6 h-6`}
            />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-[#F7F7F7] pl-[3px] text-[20px] font-500`}>
              Profile
            </Text>
          </View>
        </View>

        <View style={tw`flex flex-row justify-center mt-8 relative`}>
          <Image
            source={require("../../../assets/images/Avatar.png")}
            style={tw`w-[80px] h-[80px]`}
          />
          <Image
            source={require("../../../assets/images/copy.png")}
            style={tw`absolute bottom-0 right-38 w-6 h-6`}
          />
        </View>

        <View
          style={tw`flex flex-row justify-center items-center mt-[8px] mb-[24px]`}
        >
          <View>
            <Text style={tw`text-base text-[#F7F7F7] font-medium`}>
              John Bruno
            </Text>
          </View>
        </View>
      </View>

      {/* Scrollable content area */}
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`} // Add bottom padding to account for nav bar
      >
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
            <TouchableOpacity
              onPress={() => router.push("/home/dashboard/editProfile")}
              style={tw`w-6 h-6 md:hidden`}
            >
              <Image
                source={require("../../../assets/images/copy.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          {/* Biometrics Section */}
          <View
            style={{
              ...tw`flex flex-row justify-between items-center py-4`,
              marginHorizontal: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: "#5D5D5D",
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
          <View
            style={{
              ...tw`flex flex-row justify-between items-center py-4`,
              marginHorizontal: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: "#5D5D5D",
            }}
          >
            <View style={tw`flex flex-row items-center`}>
              <Image
                source={require("../../../assets/images/bank.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
                Add Account Details
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/home/dashboard/accountDetails")}
              style={tw`w-6 h-6 md:hidden`}
            >
              <ArrowRightIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...tw`flex flex-row justify-between items-center py-4`,
              marginHorizontal: 10,
            }}
          >
            <View style={tw`flex flex-row items-center`}>
              <Image
                source={require("../../../assets/images/moon.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={tw`text-sm text-[#5D5D5D] pl-3 font-normal`}>
                Dark Mode
              </Text>
            </View>
            <OnModeToggleIcon width={30} height={30} />
          </View>
        </View>

        <Text style={tw`mx-5 mb-2`}>Performance</Text>

        {/* Performance card section */}
        <View
          style={{
            ...tw`mx-5 px-[12px] rounded-lg mb-6`,
            borderWidth: 0.5,
            borderColor: "#5D5D5D",
          }}
        >
          {/* Package Delivered Section */}
          <View
            style={{
              ...tw`flex flex-row justify-between items-center py-4`,
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
            <Text style={tw`text-[#5D5D5D] text-[16px] font-500`}>63</Text>
          </View>

          {/* Average Ratings Section */}
          <View
            style={{
              ...tw`flex flex-row justify-between items-center py-4`,
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
            <Text style={tw`text-[#5D5D5D] text-[16px] font-500`}>4.9/5</Text>
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
            <Text style={tw`text-[#5D5D5D] text-[16px] font-500`}>98%</Text>
          </View>
        </View>

        {/* Logout button */}
        <View style={tw`mx-5 my-4`}>
          <TouchableOpacity
            style={tw`bg-[#FED7DA] py-2 mb-2 px-4 rounded-lg`}
            onPress={() => setShowLogoutModal(true)}
          >
            <Text style={tw`text-[#D00416] font-500 text-center`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={tw`flex-1 justify-end bg-black bg-opacity-50 `}>
          <View style={tw`bg-white  rounded-t-[32px] overflow-hidden `}>
            {/* Modal Header */}
            <View style={tw`items-center pt-8 pb-4`}>
              <Text style={tw`text-2xl font-medium text-[#333333]`}>
                Logout
              </Text>
            </View>

            {/* Modal Content */}
            <View style={tw`px-6 pb-8 items-center`}>
              <Text style={tw`text-lg text-[#666666] text-center`}>
                Are you sure you want to logout?
              </Text>
            </View>

            {/* Buttons */}
            <View style={tw`flex-row mx-4 mb-14  flex gap-4 justify-between`}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={tw`flex-1 bg-[#FFE5E7] p-2 justify-center rounded-xl items-center border-t border-r border-[#FFD5D9]`}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={tw`text-[#D00416] font-medium text-lg`}>
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Remove/Logout Button */}
              <TouchableOpacity
                style={tw`flex-1 bg-[#D00416] p-2 justify-center rounded-xl items-center`}
                onPress={handleLogout}
              >
                <Text style={tw`text-white font-medium text-lg`}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation - keep outside of ScrollView */}
      <BottomNavBar />
    </View>
  );
};

export default Profile;
