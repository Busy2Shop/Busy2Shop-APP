import React, { useState } from "react";
import {
  View,
} from "react-native";
import OrderDetails from "./OrderDetails";
import ShoppingDetails from "./ShoppingDetails";
import DeliveryDetails from "./DeliveryDetails";

interface SingleOrderProps {
  setPage: (page: number) => void;
}

const SingleOrder: React.FC<SingleOrderProps> = ({ setPage }) => {
  const [singleOrderPage, setSingleOrderPage] = useState<number>(0);

  return (
    <View>
      {
        singleOrderPage === 0 ? <OrderDetails setOrderPage={setPage} setSingleOrderPage={setSingleOrderPage} /> : singleOrderPage === 1 ? <ShoppingDetails setSingleOrderPage={setSingleOrderPage} /> : <DeliveryDetails setSingleOrderPage={setSingleOrderPage} />
      }
    </View>
  );
};

export default SingleOrder;
