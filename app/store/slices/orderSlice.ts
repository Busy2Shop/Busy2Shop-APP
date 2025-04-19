// src/store/slices/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/order";

interface OrderState {
  currentOrder: Order | null;
  draftOrder: Partial<Order> | null;
  recentOrders: Order[];
  isSubmitting: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  draftOrder: null,
  recentOrders: [],
  isSubmitting: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    updateDraftOrder: (state, action: PayloadAction<Partial<Order>>) => {
      state.draftOrder = {
        ...state.draftOrder,
        ...action.payload,
      };
    },
    clearDraftOrder: (state) => {
      state.draftOrder = null;
    },
    setRecentOrders: (state, action: PayloadAction<Order[]>) => {
      state.recentOrders = action.payload;
    },
    addToRecentOrders: (state, action: PayloadAction<Order>) => {
      state.recentOrders = [action.payload, ...state.recentOrders.slice(0, 4)];
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const {
  setCurrentOrder,
  updateDraftOrder,
  clearDraftOrder,
  setRecentOrders,
  addToRecentOrders,
  setSubmitting,
} = orderSlice.actions;
export default orderSlice.reducer;
