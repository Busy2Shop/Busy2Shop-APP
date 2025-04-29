import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "@/components/Button";
import ShoppingBagIcon from "@/assets/icons/shopping-bag.svg";
import LocationIcon from "@/assets/icons/location.svg";
import ClockIcon from "@/assets/icons/clock.svg";
import ItemsIcon from "@/assets/icons/items.svg";
import tw from "twrnc";

interface AllOrdersProps {
  setPage: (page: number) => void;
}

const availableOrders = [
  {
    id: "1",
    shopName: "Shoprite Market",
    location: "Lekki Phase 1, Lagos",
    items: 12,
    time: "25mins",
    isNew: true,
  },
  {
    id: "2",
    shopName: "Shoprite Market",
    location: "Lekki Phase 1, Lagos",
    items: 12,
    time: "25mins",
    isNew: true,
  },
];

const AllOrders: React.FC<AllOrdersProps> = ({ setPage }) => {
  const handleAccept = () => {
    setPage(1);
  };

  return (
    <View style={tw`flex-1 flex-col gap-4 bg-[#F7F7F7] max-w-[375px]`}>
      <View style={tw`flex flex-row gap-1 mx-auto`}>
        <Button
          fontWeight="medium"
          textColor="[#00A082]"
          bgColor="bg-transparent"
          borderStyling="border border-[#00A082]"
          width="w-[160px]"
        >
          Refresh
        </Button>
        <Button width="w-[160px]" fontWeight="medium">
          Go Offline
        </Button>
      </View>

      <View style={tw`flex-1 flex-col gap-2`}>
        <Text style={tw`text-base font-medium text-[#2A2A2A]`}>
          Available Orders Near You
        </Text>

        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          <View style={tw`flex flex-col gap-4 mb-24`}>
            {availableOrders.map((order) => (
              <View
                key={order.id}
                style={tw`flex flex-row bg-white rounded-lg overflow-hidden border border-gray-200`}
              >
                <View style={tw`w-1.5 bg-[#00A082] h-full rounded-l-lg`} />

                <View style={tw`flex-1`}>
                  <View
                    style={tw`flex flex-row justify-between items-center px-4 py-2 mt-3`}
                  >
                    <View style={tw`bg-[#D7F4EE] rounded-xl px-4 py-1`}>
                      <Text style={tw`text-xs text-[#00A082]`}>New Order</Text>
                    </View>
                    <Text style={tw`text-gray-500 text-sm`}>Just now</Text>
                  </View>

                  <View style={tw`px-4 pb-4`}>
                    <Text style={tw`text-lg font-medium text-[#2A2A2A] mb-1`}>
                      New Delivery Request
                    </Text>

                    <View style={tw`flex flex-row items-center mt-2`}>
                      <ShoppingBagIcon
                        width={20}
                        height={20}
                        style={tw`text-gray-500`}
                      />
                      <Text style={tw`ml-2 text-[#2A2A2A]`}>
                        {order.shopName}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row items-center mt-1 ml-6`}>
                      <LocationIcon
                        width={14}
                        height={14}
                        style={tw`text-gray-500`}
                      />
                      <Text style={tw`ml-1 text-gray-500 text-sm`}>
                        {order.location}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row items-center  mt-4`}>
                      <View style={tw`flex flex-row   pr-4`}>
                        <ItemsIcon
                          width={14}
                          height={14}
                          style={tw`text-gray-500`}
                        />
                        <View style={tw`ml-2`}>
                          <Text style={tw`text-[12px] text-[#2A2A2A] font-500`}>
                            Items
                          </Text>
                          <Text style={tw`text-[10px] font-500 text-[#5D5D5D]`}>
                            {order.items} items
                          </Text>
                        </View>
                      </View>

                      <View style={tw`flex flex-row  pl-2`}>
                        <ClockIcon
                          width={14}
                          height={14}
                          style={tw`text-gray-500`}
                        />
                        <View style={tw`ml-2`}>
                          <Text style={tw`text-[12px] text-[#2A2A2A] font-500`}>
                            Shopping Time
                          </Text>
                          <Text style={tw`text-[10px] font-500 text-[#5D5D5D]`}>
                            {order.time}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={tw`flex flex-row items-center justify-between mt-4`}
                    >
                      <TouchableOpacity
                        style={tw`flex-1 py-3 bg-[#00A082] rounded-md justify-center items-center mr-2`}
                        onPress={handleAccept}
                      >
                        <Text style={tw`text-white font-medium`}>
                          Accept Order
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={tw`flex-1 py-3 border border-gray-300 rounded-md justify-center items-center ml-2`}
                      >
                        <Text style={tw`text-[#2A2A2A] font-medium`}>
                          Decline
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={tw`items-center mt-2`}>
                      <Text style={tw`text-gray-500 text-sm`}>
                        Show More Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllOrders;
