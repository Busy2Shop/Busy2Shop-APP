import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";

interface DetailsNavbarProps {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

const DetailsNavbar: React.FC<DetailsNavbarProps> = ({
  activeButton,
  setActiveButton,
}) => {
  return (
    <View
      style={tw`flex flex-row items-center justify-between bg-[#EBF9F6] border-[0.5px] border-[#00A082] rounded-lg h-10 p-1`}
    >
      <TouchableOpacity
        style={tw`flex items-center justify-center h-8 w-[100px] rounded-lg text-xs ${
          activeButton === "Review Order" ? "bg-[#00A082]" : "bg-[#EBF9F6]"
        }`}
        onPress={() => setActiveButton("Review Order")}
      >
        <Text
          style={tw` ${
            activeButton === "Review Order"
              ? "text-[#F7F7F7]"
              : "text-[#5D5D5D]"
          }`}
        >
          Review Order
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex items-center justify-center h-8 w-[100px] rounded-lg text-xs ${
          activeButton === "Shopping" ? "bg-[#00A082]" : "bg-[#EBF9F6]"
        } `}
        onPress={() => setActiveButton("Shopping")}
      >
        <Text
          style={tw` ${
            activeButton === "Shopping" ? "text-[#F7F7F7]" : "text-[#5D5D5D]"
          }`}
        >
          Shopping
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex items-center justify-center h-8 w-[100px] rounded-lg text-xs ${
          activeButton === "Checkout" ? "bg-[#00A082]" : "bg-[#EBF9F6]"
        }`}
        onPress={() => setActiveButton("Checkout")}
      >
        <Text
          style={tw` ${
            activeButton === "Checkout" ? "text-[#F7F7F7]" : "text-[#5D5D5D]"
          }`}
        >
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsNavbar;
