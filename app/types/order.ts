export type OrderStatus =
  | "draft"
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  estimatedPrice?: number;
  actualPrice?: number;
  description?: string;
  photo?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  details?: string;
}

export interface Order {
  id: string;
  userId: string;
  agentId?: string;
  items: OrderItem[];
  status: OrderStatus;
  pickupLocation?: Location;
  deliveryLocation: Location;
  totalEstimatedPrice: number;
  totalActualPrice?: number;
  serviceFee?: number;
  deliveryFee?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CreateOrderRequest {
  items: Omit<OrderItem, "id">[];
  pickupLocation?: Location;
  deliveryLocation: Location;
  notes?: string;
}
