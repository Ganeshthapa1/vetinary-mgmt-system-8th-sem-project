<script>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import DashboardCard from "@/components/layout/DashboardCard.vue";
import { Calendar, User, ShoppingCart, Package } from "lucide-vue-next";

export default {
  name: "DashboardView",
  components: {
    AdminLayout,
    DashboardCard,
    Calendar,
    User,
    ShoppingCart,
    Package,
  },
  data() {
    return {
      dashboardStats: {
        total_pets: 0,
        total_clients: 0,
        total_appointments: 0,
        todays_appointments: 0,
      },
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.fetchDashboardStats();
  },
  methods: {
    async fetchDashboardStats() {
      try {
        this.loading = true;
        const token = localStorage.getItem("auth_token");
        const response = await fetch(
          "http://localhost:8000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          console.log(token);
          this.dashboardStats = result.data;
        } else {
          throw new Error(result.message || "Failed to fetch dashboard stats");
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        this.error = error.message;
        // Keep default values for fallback
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <AdminLayout>
    <div class="p-6">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <span class="ml-2 text-gray-600">Loading dashboard...</span>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div class="flex">
          <svg
            class="w-5 h-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Unable to load dashboard data
            </h3>
            <p class="mt-1 text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Dashboard content -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <DashboardCard
            title="Total Pets"
            :mainValue="dashboardStats.total_pets.toString()"
            :change="0"
          >
            <template #icon>
              <Calendar class="w-6 h-6" />
            </template>
          </DashboardCard>
          <DashboardCard
            title="Clients"
            :mainValue="dashboardStats.total_clients.toString()"
            :change="0"
          >
            <template #icon>
              <User class="w-6 h-6" />
            </template>
          </DashboardCard>
          <DashboardCard
            title="All Appointments"
            :mainValue="dashboardStats.total_appointments.toString()"
            :change="0"
          >
            <template #icon>
              <Package class="w-6 h-6" />
            </template>
          </DashboardCard>
          <DashboardCard
            title="Today's Appointments"
            :mainValue="dashboardStats.todays_appointments.toString()"
            :change="0"
          >
            <template #icon>
              <ShoppingCart class="w-6 h-6" />
            </template>
          </DashboardCard>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg p-4 shadow">
            <h3 class="text-sm font-semibold mb-4">Marketing</h3>
            <div class="h-40 flex items-center justify-center text-gray-300">
              <!-- Placeholder for donut chart -->
              Donut Chart Here
            </div>
          </div>
          <DashboardCard
            title="All Products"
            mainValue="0"
            :change="0"
            highlighted
            :showDropdown="false"
          >
            <template #icon>
              <Calendar class="w-6 h-6" />
            </template>
          </DashboardCard>
          <div class="bg-white rounded-lg p-4 shadow">
            <h3 class="text-sm font-semibold mb-4">Abandoned Cart</h3>
            <div class="text-red-600 font-semibold">0%</div>
            <div>Customers: 0</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg p-4 shadow col-span-2">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-sm font-semibold">Summary</h3>
              <select class="text-xs border border-gray-300 rounded px-2 py-1">
                <option>Sales</option>
                <option>Orders</option>
              </select>
            </div>
            <div class="h-48 flex items-center justify-center text-gray-300">
              <!-- Placeholder for bar chart -->
              Bar Chart Here
            </div>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow flex flex-col items-center justify-center"
          >
            <div class="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h18v18H3z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">No Orders Yet?</h3>
            <p class="text-gray-600 mb-4 text-center">
              Add products to your store and start selling to see orders here.
            </p>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              + New Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
/* Add any specific styles here */
</style>
