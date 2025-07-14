<!-- src/views/ClientsView.vue -->
<template>
  <AdminLayout>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
      </div>

      <!-- Search and Filter -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
      >
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Search</label
            >
            <input
              type="text"
              placeholder="Search clients..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Sort by</label
            >
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
              <option>Last Visit</option>
              <option>Number of Pets</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Clients Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Client Directory</h2>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <span class="ml-2 text-gray-600">Loading clients...</span>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="px-6 py-8">
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex">
              <svg
                class="w-5 h-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                  Backend Connection Issue
                </h3>
                <p class="mt-1 text-sm text-yellow-700">
                  {{ error }}. Showing cached data.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Clients table content -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pets
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Visit
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Next Appointment
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="client in clients"
                :key="client.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-0.2">
                      <div class="text-sm font-medium text-gray-900">
                        {{ client.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        Client ID: {{ client.id }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ client.email }}</div>
                  <div class="text-sm text-gray-500">{{ client.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="pet in client.pets"
                      :key="pet"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ pet }}
                    </span>
                    <span
                      v-if="!client.pets || client.pets.length === 0"
                      class="text-sm text-gray-500"
                    >
                      No pets
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ client.last_visit }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ client.next_appointment }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    <button class="text-green-600 hover:text-green-900">
                      Edit
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="!loading && !error"
        class="mt-6 flex items-center justify-between"
      >
        <div class="text-sm text-gray-700">
          Showing 1 to 10 of {{ clients.length }} results
        </div>
        <div class="flex space-x-2">
          <button
            class="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          <button class="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
            1
          </button>
          <button
            class="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            2
          </button>
          <button
            class="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import api from "@/services/api";
import { useUIStore } from "@/stores/ui";

export default {
  name: "ClientsView",
  components: {
    AdminLayout,
  },
  setup() {
    const uiStore = useUIStore();
    return { uiStore };
  },
  data() {
    return {
      clients: [],
      loading: true,
      error: null,
      mockClients: [
        {
          id: "C001",
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "(555) 123-4567",
          pets: ["Buddy", "Rex"],
          last_visit: "2024-12-15",
          next_appointment: "2025-01-10",
        },
        {
          id: "C002",
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "(555) 234-5678",
          pets: ["Whiskers"],
          last_visit: "2024-12-20",
          next_appointment: "2025-01-15",
        },
        {
          id: "C003",
          name: "Mike Brown",
          email: "mike.brown@email.com",
          phone: "(555) 345-6789",
          pets: ["Max"],
          last_visit: "2024-12-10",
          next_appointment: "2025-01-05",
        },
        {
          id: "C004",
          name: "Emily Davis",
          email: "emily.davis@email.com",
          phone: "(555) 456-7890",
          pets: ["Bella", "Luna"],
          last_visit: "2024-12-25",
          next_appointment: "2025-01-20",
        },
        {
          id: "C005",
          name: "David Wilson",
          email: "david.wilson@email.com",
          phone: "(555) 567-8901",
          pets: ["Charlie"],
          last_visit: "2024-12-18",
          next_appointment: "2025-01-12",
        },
      ],
    };
  },
  async mounted() {
    await this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        this.loading = true;
        const response = await api.get("/clients");
        console.log("Clients response:", response);
        if (response.success) {
          this.clients = response.data.map((client) => ({
            id:
              client.id || `C${client.client_id?.toString().padStart(3, "0")}`,
            name: client.name,
            email: client.email,
            phone: client.phone,
            pets: client.pets || [],
            last_visit: client.last_visit || "N/A",
            next_appointment: client.next_appointment || "N/A",
          }));
        } else {
          throw new Error(response.message || "Failed to fetch clients");
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        this.error = error.message || "Failed to load clients";
        this.uiStore.showSuccessMessage(
          "Error",
          `${this.error}. Showing cached data.`
        );
        this.clients = this.mockClients;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Unchanged */
</style>
