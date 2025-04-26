import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Clock, MapPin, AlertCircle } from "react-native-feather";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import { useRouter } from "expo-router";
import BottomNavBar from "@/components/BottomNavbar";

interface Order {
  id: string;
  priority: "High" | "Medium" | "Low";
  timeRemaining: string;
  location: string;
  items: number;
  progress: number;
}

interface OrderSummary {
  totalActiveOrders: string;
  estimatedCompletionTime: string;
  totalDistance: string;
  totalItems: number;
  upcomingDeadline: {
    orderId: string;
    dueTime: string;
    items: number;
    location: string;
  };
}

const OrderCard = ({
  order,
  onPress,
}: {
  order: Order;
  onPress: () => void;
}) => {
  const { id, priority, timeRemaining, location, items, progress } = order;

  const getPriorityStyle = (priority: Order["priority"]): object => {
    switch (priority) {
      case "High":
        return tw`bg-[#FF3B30]`;
      case "Medium":
        return tw`bg-[#F39C12]`;
      case "Low":
        return tw`bg-gray-400`;
      default:
        return tw`bg-gray-400`;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row mb-4`}>
      {/* Green stripe on the left */}
      <View style={tw`w-1.5 bg-emerald-500 rounded-l-lg`} />

      {/* Card content */}
      <View
        style={tw`flex-1 bg-white p-4 rounded-r-lg border-t border-r border-b border-gray-100`}
      >
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-lg font-semibold`}>Order #{id}</Text>
          <View
            style={[tw`px-3 py-1 rounded-full`, getPriorityStyle(priority)]}
          >
            <Text style={tw`text-white text-xs font-medium`}>
              {priority} Priority
            </Text>
          </View>
        </View>

        <View style={tw`flex-row items-center mb-1`}>
          <Clock style={tw`mr-2`} width={16} height={16} stroke="#6B7280" />
          <Text style={tw`text-gray-500 text-sm`}>Due in {timeRemaining}</Text>
        </View>

        <View style={tw`flex-row items-center mb-3`}>
          <MapPin style={tw`mr-2`} width={16} height={16} stroke="#6B7280" />
          <Text style={tw`text-gray-500 text-sm`}>{location}</Text>
        </View>

        <Text style={tw`text-sm mb-2`}>{items} items</Text>

        {progress ? (
          <View>
            <View style={tw`h-2 bg-gray-200 rounded-full mb-1`}>
              <View
                style={[
                  tw`h-2 bg-emerald-500 rounded-full`,
                  { width: `${progress}%` },
                ]}
              />
            </View>
            <Text style={tw`text-sm text-gray-500`}>{progress}% Shopped</Text>
          </View>
        ) : (
          <Text style={tw`text-sm text-gray-500 mb-3`}>Not started</Text>
        )}

        <TouchableOpacity
          style={[
            tw`rounded-lg py-3 mt-3 items-center`,
            progress ? tw`bg-emerald-500` : tw`bg-white border border-gray-200`,
          ]}
        >
          <Text
            style={[
              tw`font-medium`,
              progress ? tw`text-white` : tw`text-gray-700`,
            ]}
          >
            Start Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const OrderSummaryScreen = ({
  summary,
  onBack,
}: {
  summary: OrderSummary;
  onBack: () => void;
}) => {
  const {
    totalActiveOrders,
    estimatedCompletionTime,
    totalDistance,
    totalItems,
    upcomingDeadline,
  } = summary;

  return (
    <View style={tw`flex-1 bg-gray-50 pt-10`}>
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={onBack}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`ml-2 text-2xl font-medium text-gray-800`}>
          Priority Alerts
        </Text>
      </View>

      <ScrollView style={tw`flex-1 px-4 pt-4 mb-16`}>
        <View style={tw`bg-white rounded-lg p-5 shadow-sm`}>
          <Text style={tw`text-2xl font-semibold text-gray-800 mb-4`}>
            Order Summary
          </Text>

          <View style={tw`flex-row justify-between mb-4`}>
            <Text style={tw`text-gray-500 font-medium`}>
              Total Active Orders
            </Text>
            <Text style={tw`text-gray-700 font-medium`}>
              {totalActiveOrders}
            </Text>
          </View>

          <View style={tw`flex-row justify-between mb-4`}>
            <Text style={tw`text-gray-500 font-medium`}>
              Estimated Completion Time
            </Text>
            <Text style={tw`text-gray-700 font-medium`}>
              {estimatedCompletionTime}
            </Text>
          </View>

          <View style={tw`flex-row justify-between mb-4`}>
            <Text style={tw`text-gray-500 font-medium`}>Total Distance</Text>
            <Text style={tw`text-gray-700 font-medium`}>{totalDistance}</Text>
          </View>

          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-gray-500 font-medium`}>Total Items</Text>
            <Text style={tw`text-gray-700 font-medium`}>
              {totalItems} items
            </Text>
          </View>

          <View style={tw`h-px bg-gray-200 mb-5`} />

          <Text style={tw`text-gray-700 font-medium mb-3`}>
            Upcoming Deadline
          </Text>

          <View style={tw`bg-red-50 p-4 rounded-lg flex-row items-start`}>
            <AlertCircle
              style={tw`mr-3 mt-0.5`}
              width={20}
              height={20}
              stroke="#FF3B30"
            />
            <View>
              <Text style={tw`text-red-500 font-medium mb-1`}>
                Order #{upcomingDeadline.orderId} due in{" "}
                {upcomingDeadline.dueTime}
              </Text>
              <Text style={tw`text-red-400`}>
                {upcomingDeadline.items} items at {upcomingDeadline.location}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add BottomNavBar */}
    </View>
  );
};

const ActiveOrders = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const router = useRouter();

  const orders: Order[] = [
    {
      id: "1001",
      priority: "High",
      timeRemaining: "45 minutes",
      location: "Shoprite Market",
      items: 12,
      progress: 25,
    },
    {
      id: "1002",
      priority: "Medium",
      timeRemaining: "1 hour 30 minutes",
      location: "Atlantic Centre Chevron Market",
      items: 8,
      progress: 0,
    },
    {
      id: "1003",
      priority: "Low",
      timeRemaining: "3 hour",
      location: "Jendol Market",
      items: 9,
      progress: 0,
    },
  ];

  // Calculate total number of items
  const totalItems = orders.reduce((sum, order) => sum + order.items, 0);

  // Create order summary data
  const orderSummary: OrderSummary = {
    totalActiveOrders: "3/3",
    estimatedCompletionTime: "2h 15m",
    totalDistance: "5 kilometer",
    totalItems: totalItems,
    upcomingDeadline: {
      orderId: "1001",
      dueTime: "45 minutes",
      items: 12,
      location: "Shoprite Market",
    },
  };

  const handleOrderPress = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowSummary(true);
  };

  const handleBackPress = () => {
    setShowSummary(false);
    setSelectedOrderId(null);
  };

  if (showSummary) {
    return (
      <OrderSummaryScreen summary={orderSummary} onBack={handleBackPress} />
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50 pt-10`}>
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => router.back()}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`ml-2 text-2xl font-medium text-gray-800`}>
          Active Orders
        </Text>
      </View>

      <ScrollView style={tw`flex-1 px-4 pt-4 mb-16`}>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onPress={() => handleOrderPress(order.id)}
          />
        ))}
      </ScrollView>

      {/* Add BottomNavBar */}
      <BottomNavBar />
    </View>
  );
};

export default ActiveOrders;
