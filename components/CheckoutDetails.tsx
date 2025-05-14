import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import tw from "twrnc";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import MessageIcon from "@/assets/icons/messages.svg";
import ShoppingCartIcon from "@/assets/icons/shopping-cart.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CameraIcon from "@/assets/icons/camera.svg";

interface CheckoutDetailsProps {
  setSingleOrderPage: (page: number) => void;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  setSingleOrderPage,
}) => {
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  // Sample found items
  const foundItems = [
    { name: "Organic Whole Milk", quantity: 1, unit: "gallon", price: 6.99 },
    { name: "Avocados", quantity: 4, unit: "each", price: 5.96 },
    { name: "Organic Baby Spinach", quantity: 1, unit: "bag", price: 3.49 },
    { name: "Organic Bananas", quantity: 1, unit: "bunch", price: 2.99 },
    { name: "Greek Yogurt", quantity: 2, unit: "container", price: 8.98 },
    { name: "Almond Butter", quantity: 1, unit: "jar", price: 7.99 },
  ];

  const handleBack = () => {
    setSingleOrderPage(2);
  };

  const handleCompleteOrder = () => {
    // In a real app, this would complete the order, update the agent's earnings, etc.
    setSingleOrderPage(0); // Go back to orders list
  };

  const handleUploadReceipt = () => {
    // In a real app, this would open the camera/gallery to upload receipt
    setReceiptUploaded(true);
  };

  // Calculate subtotal
  const subtotal = foundItems.reduce((sum, item) => sum + item.price, 0);
  const serviceCharge = subtotal > 10000 ? 1000 : 500; // Based on PRD pricing
  const agentEarning = 100; // Base compensation per PRD

  return (
    <View style={tw`flex-1 bg-[#F7F7F7] max-w-[375px]`}>
      <TouchableOpacity style={tw`h-6 w-6 mb-2`} onPress={handleBack}>
        <LeftArrowIcon />
      </TouchableOpacity>
      <View
        style={tw`flex flex-col p-3 gap-2 border-[0.5px] rounded-lg border-[#5D5D5D] mb-4`}
      >
        <View style={tw`flex flex-row justify-between items-center`}>
          <Text style={tw`text-xl font-semibold`}>Order #1001</Text>
          <TouchableOpacity style={tw`h-6 w-6`}>
            <MessageIcon />
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-col items-start gap-1`}>
          <Text style={tw`flex gap-1 items-start text-[#5D5D5D] text-sm`}>
            Customer: Jane Smith
          </Text>
          <Text style={tw`flex gap-1 items-start text-[#5D5D5D] text-sm`}>
            Ikeja City Mall, Obafemi Awolowo Wy
          </Text>
          <Text style={tw`flex gap-1 items-start text-[#5D5D5D] text-sm`}>
            Phone Number: 09034347815
          </Text>
        </View>
        <View
          style={tw`flex flex-row gap-1 items-center justify-center py-[2px] px-1 bg-[#FF9500] w-[98px] h-6 text-[#F7F7F7] rounded-lg`}
        >
          <View style={tw`h-[14px] w-[14px]`}>
            <ShoppingCartIcon />
          </View>
          <Text style={tw`text-[#F7F7F7] text-xs font-medium`}>Checkout</Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-8`}>
        <View style={tw`flex flex-col p-3 gap-2 bg-white rounded-lg mb-4`}>
          <Text style={tw`text-lg font-semibold`}>Checkout Summary</Text>
          <Text style={tw`text-sm text-[#5D5D5D]`}>
            Review the items and complete the order
          </Text>
          <Text style={tw`text-base font-semibold mt-2 mb-1`}>Items Found</Text>

          {/* Items list */}
          <View style={tw`flex flex-col gap-2`}>
            {foundItems.map((item, index) => (
              <View
                key={index}
                style={tw`flex flex-row justify-between items-center py-2 border-b border-gray-100`}
              >
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-medium`}>{item.name}</Text>
                  <Text style={tw`text-xs text-[#5D5D5D]`}>
                    {item.quantity} {item.unit}
                  </Text>
                </View>
                <Text style={tw`text-sm font-medium`}>
                  ₦{item.price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          {/* Price summary */}
          <View style={tw`mt-4 flex flex-col gap-2`}>
            <View style={tw`flex flex-row justify-between`}>
              <Text style={tw`text-sm text-[#5D5D5D]`}>Subtotal</Text>
              <Text style={tw`text-sm font-medium`}>
                ₦{subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={tw`flex flex-row justify-between`}>
              <Text style={tw`text-sm text-[#5D5D5D]`}>Service Charge</Text>
              <Text style={tw`text-sm font-medium`}>
                ₦{(serviceCharge / 100).toFixed(2)}
              </Text>
            </View>
            <View style={tw`flex flex-row justify-between mt-2`}>
              <Text style={tw`text-base font-semibold`}>Total</Text>
              <Text style={tw`text-base font-semibold`}>
                ₦{(subtotal + serviceCharge / 100).toFixed(2)}
              </Text>
            </View>
            <View
              style={tw`flex flex-row justify-between mt-1 pt-2 border-t border-gray-100`}
            >
              <Text style={tw`text-sm text-green-600 font-medium`}>
                Your Earnings
              </Text>
              <Text style={tw`text-sm text-green-600 font-medium`}>
                ₦{(agentEarning / 100).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Receipt upload section */}
        <View style={tw`flex flex-col p-3 gap-3 bg-white rounded-lg mb-4`}>
          <Text style={tw`text-lg font-semibold`}>Upload Receipt</Text>
          <Text style={tw`text-sm text-[#5D5D5D]`}>
            Please take a photo of the receipt to complete the order
          </Text>

          {receiptUploaded ? (
            <View style={tw`flex flex-col items-center gap-2 py-4`}>
              <View style={tw`h-8 w-8`}>
                <CheckCircleIcon />
              </View>
              <Text style={tw`text-green-600 font-medium`}>
                Receipt uploaded successfully
              </Text>
              <TouchableOpacity
                style={tw`mt-2 px-3 py-2 border border-[#FF9500] rounded-lg`}
                onPress={handleUploadReceipt}
              >
                <Text style={tw`text-[#FF9500] text-sm font-medium`}>
                  Upload a different receipt
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-center gap-2 py-3 bg-[#FF9500] rounded-lg`}
              onPress={handleUploadReceipt}
            >
              <View style={tw`h-5 w-5`}>
                <CameraIcon />
              </View>
              <Text style={tw`text-white font-medium`}>
                Take Photo of Receipt
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Payment method section */}
        <View style={tw`flex flex-col p-3 gap-2 bg-white rounded-lg mb-4`}>
          <Text style={tw`text-lg font-semibold`}>Payment Method</Text>
          <Text style={tw`text-sm text-[#5D5D5D]`}>
            How was the order paid for?
          </Text>

          <View style={tw`flex flex-row gap-2 mt-2`}>
            <TouchableOpacity
              style={tw`flex-1 py-2 border border-[#FF9500] bg-[#FF9500] rounded-lg items-center`}
            >
              <Text style={tw`text-white font-medium`}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 py-2 border border-[#5D5D5D] rounded-lg items-center`}
            >
              <Text style={tw`text-[#5D5D5D] font-medium`}>Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Complete Order Button */}
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center py-4 bg-[#FF9500] rounded-lg mx-3 ${
            !receiptUploaded ? "opacity-50" : ""
          }`}
          onPress={handleCompleteOrder}
          disabled={!receiptUploaded}
        >
          <Text style={tw`text-white font-semibold text-base`}>
            Complete Order
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CheckoutDetails;
