import React, { useState } from "react";
import { View } from "react-native";
import OrderDetails from "./OrderDetails";
import ShoppingDetails from "./ShoppingDetails";
import DeliveryDetails from "./DeliveryDetails";
import OrderNavigation from "./OrderNavigation";
import OrderArrived from "./OrderArrived";
import tw from "twrnc";
import StartShopping from "./StartShopping";
import CheckoutPage from "./Checkout";

interface SingleOrderProps {
  setPage: (page: number) => void;
}

const SingleOrder: React.FC<SingleOrderProps> = ({ setPage }) => {
  const [singleOrderPage, setSingleOrderPage] = useState<number>(0);

  return (
    <View style={tw`flex-1`}>
      {singleOrderPage === 0 ? (
        <OrderDetails
          setOrderPage={setPage}
          setSingleOrderPage={setSingleOrderPage}
        />
      ) : singleOrderPage === 1 ? (
        <OrderNavigation setSingleOrderPage={setSingleOrderPage} />
      ) : singleOrderPage === 2 ? (
        <OrderArrived setSingleOrderPage={setSingleOrderPage} />
      ) : singleOrderPage === 3 ? (
        <StartShopping setSingleOrderPage={setSingleOrderPage} />
      ) : singleOrderPage === 4 ? (
        <CheckoutPage setSingleOrderPage={setSingleOrderPage} />
      ) : (
        <DeliveryDetails setSingleOrderPage={setSingleOrderPage} />
      )}
    </View>
  );
};

export default SingleOrder;
