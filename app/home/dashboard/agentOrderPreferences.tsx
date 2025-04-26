import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import tw from "twrnc";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";

const AgentOrderPreferences = () => {
  const router = useRouter();

  // State for switches
  const [autoBatchEnabled, setAutoBatchEnabled] = useState(true);
  const [priorityAlertsEnabled, setPriorityAlertsEnabled] = useState(true);

  // State for sliders
  const [maxActiveOrders, setMaxActiveOrders] = useState(3);
  const [orderComplexity, setOrderComplexity] = useState(0.5); // Middle position (Balanced)
  const [distancePreference, setDistancePreference] = useState(0.2); // Closer to Nearby

  // Batching suggestions data
  const batchingSuggestions = [
    {
      stores: "Shoprite + Jendol",
      distance: "1 kilometer apart",
      timeSaved: "25 minutes",
    },
    {
      stores: "Shoprite + Jendol",
      distance: "1 kilometer apart",
      timeSaved: "15 minutes",
    },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-white `}>
      <View style={tw`flex-row items-center p-4 mt-10 `}>
        <TouchableOpacity style={tw`p-2`} onPress={() => router.back()}>
          <LeftArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <View style={tw`flex-1 ml-2`}>
          <Text style={tw`text-[20px] font-600 text-[#2A2A2A]`}>
            Agent Preferences
          </Text>
          <Text style={tw`text-sm text-gray-500`}>
            Customize your order batching preferences
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={tw`p-4`}>
        {/* Container with border and rounded corners */}
        <View style={tw`border border-gray-200 rounded-lg p-4 mb-6`}>
          {/* Auto Batch Order */}
          <View style={tw`flex-row justify-between items-center mb-5`}>
            <View>
              <Text style={tw`font-medium text-base mb-0.5`}>
                Auto Batch Order
              </Text>
              <Text style={tw`text-xs text-gray-500`}>
                Automatically group orders at nearby locations
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#00c7a1" }}
              thumbColor="#ffffff"
              value={autoBatchEnabled}
              onValueChange={setAutoBatchEnabled}
            />
          </View>

          {/* Priority Alerts */}
          <View style={tw`flex-row justify-between items-center mb-5`}>
            <View>
              <Text style={tw`font-medium text-base mb-0.5`}>
                Priority Alerts
              </Text>
              <Text style={tw`text-xs text-gray-500`}>
                Receive notifications for high-priority orders
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#00c7a1" }}
              thumbColor="#ffffff"
              value={priorityAlertsEnabled}
              onValueChange={setPriorityAlertsEnabled}
            />
          </View>

          {/* Maximum Active Orders */}
          <View style={tw`mb-5`}>
            <Text style={tw`font-medium text-base mb-3`}>
              Maximum Active Orders
            </Text>
            <Slider
              style={tw`h-6  mb-1 rounded-lg`}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={maxActiveOrders}
              onValueChange={setMaxActiveOrders}
              minimumTrackTintColor="#00A082"
              maximumTrackTintColor="#DDDDDD"
              thumbTintColor="#00c7a1"
            />
            <View style={tw`flex-row justify-between mx-4`}>
              <Text style={tw`text-xs text-gray-500 `}>1</Text>
              <Text style={tw`text-xs text-gray-500`}>2</Text>
              <Text style={tw`text-xs text-gray-500`}>3</Text>
              <Text style={tw`text-xs text-gray-500`}>4</Text>
              <Text style={tw`text-xs text-gray-500`}>5</Text>
            </View>
          </View>

          {/* Order Complexity Preference */}
          <View style={tw`mb-5`}>
            <Text style={tw`font-medium text-base mb-3`}>
              Order Complexity Preference
            </Text>
            <Slider
              style={tw`h-6 mb-1`}
              minimumValue={0}
              maximumValue={1}
              value={orderComplexity}
              onValueChange={setOrderComplexity}
              minimumTrackTintColor="#00A082"
              maximumTrackTintColor="#DDDDDD"
              thumbTintColor="#00c7a1"
            />
            <View style={tw`flex-row justify-between mx-4`}>
              <Text style={tw`text-xs text-gray-500`}>Simple</Text>
              <Text style={tw`text-xs text-gray-500 self-center`}>
                Balanced
              </Text>
              <Text style={tw`text-xs text-gray-500`}>Complex</Text>
            </View>
          </View>

          {/* Distance Preference */}
          <View>
            <Text style={tw`font-medium text-base mb-3`}>
              Distance Preference
            </Text>
            <Slider
              style={tw`h-6 mb-1`}
              minimumValue={0}
              maximumValue={1}
              value={distancePreference}
              onValueChange={setDistancePreference}
              minimumTrackTintColor="#00A082"
              maximumTrackTintColor="#DDDDDD"
              thumbTintColor="#00c7a1"
            />
            <View style={tw`flex-row justify-between mx-4`}>
              <Text style={tw`text-xs text-gray-500`}>Nearby</Text>
              <Text style={tw`text-xs text-gray-500 self-center`}>
                Balanced
              </Text>
              <Text style={tw`text-xs text-gray-500`}>Any Distance</Text>
            </View>
          </View>
        </View>

        {/* Batching Suggestions */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-xl font-semibold mb-1`}>
            Batching Suggestions
          </Text>
          <Text style={tw`text-sm text-gray-500 mb-5`}>
            Nearby stores for efficient shopping
          </Text>

          {batchingSuggestions.map((suggestion, index) => (
            <View
              key={index}
              style={tw`border border-gray-200 rounded-lg p-4 mb-4`}
            >
              <Text style={tw`font-medium text-base mb-1`}>
                {suggestion.stores}
              </Text>
              <Text style={tw`text-xs text-gray-500 mb-2`}>
                {suggestion.distance}
              </Text>

              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-xs text-gray-500`}>Time Saved:</Text>
                <Text style={tw`text-xs text-[#00A082]`}>
                  ~{suggestion.timeSaved}
                </Text>
              </View>
              <View style={tw`mt-4`}>
                <TouchableOpacity
                  style={tw`bg-[#00A082] py-3 rounded-md w-full items-center`}
                >
                  <Text style={tw`text-white font-medium`}>Apply Batch</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AgentOrderPreferences;
