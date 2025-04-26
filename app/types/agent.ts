export type AgentStatus = "available" | "busy" | "offline";

export interface Agent {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  rating: number;
  totalCompletedOrders: number;
  status: AgentStatus;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
}
