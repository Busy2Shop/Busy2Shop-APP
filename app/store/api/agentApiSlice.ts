// src/store/api/agentApiSlice.ts
import { apiSlice } from "./apiSlice";
import { Agent, AgentStatus } from "../../types/agent";

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableAgents: builder.query<Agent[], void>({
      query: () => "/agents/available",
      providesTags: ["Agent"],
    }),
    getAgentById: builder.query<Agent, string>({
      query: (id) => `/agents/${id}`,
      providesTags: (_, __, id) => [{ type: "Agent", id }],
    }),
    updateAgentStatus: builder.mutation<
      Agent,
      { id: string; status: AgentStatus }
    >({
      query: ({ id, status }) => ({
        url: `/agents/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Agent", id }, "Agent"],
    }),
  }),
});

export const {
  useGetAvailableAgentsQuery,
  useGetAgentByIdQuery,
  useUpdateAgentStatusMutation,
} = agentApiSlice;
