// src/store/slices/agentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Agent } from "../../types/agent";

interface AgentState {
  selectedAgent: Agent | null;
  nearbyAgents: Agent[];
  isLoadingAgents: boolean;
}

const initialState: AgentState = {
  selectedAgent: null,
  nearbyAgents: [],
  isLoadingAgents: false,
};

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setSelectedAgent: (state, action: PayloadAction<Agent | null>) => {
      state.selectedAgent = action.payload;
    },
    setNearbyAgents: (state, action: PayloadAction<Agent[]>) => {
      state.nearbyAgents = action.payload;
    },
    setLoadingAgents: (state, action: PayloadAction<boolean>) => {
      state.isLoadingAgents = action.payload;
    },
  },
});

export const { setSelectedAgent, setNearbyAgents, setLoadingAgents } =
  agentSlice.actions;
export default agentSlice.reducer;
