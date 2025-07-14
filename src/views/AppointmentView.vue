<template>
  <div class="min-h-screen bg-white py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Book an Appointment
        </h2>
        <p class="text-xl text-gray-600">
          Schedule a visit for your pet today. We're here to help with all your
          veterinary needs.
        </p>
      </div>

      <div class="bg-gray-50 rounded-lg p-8 animate-fade-in-up">
        <form @submit.prevent="submitAppointment" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pet Owner Name *</label
              >
              <input
                v-model="form.client_name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Phone Number *</label
              >
              <input
                v-model="form.client_phone"
                type="tel"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email Address</label
              >
              <input
                v-model="form.client_email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pet Name *</label
              >
              <input
                v-model="form.pet_name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your pet's name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pet Type *</label
              >
              <select
                v-model="form.pet_type"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select pet type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="rabbit">Rabbit</option>
                <option value="hamster">Hamster</option>
                <option value="guinea-pig">Guinea Pig</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Preferred Date *</label
              >
              <input
                v-model="form.appointment_date"
                type="date"
                required
                :min="minDate"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Preferred Time *</label
              >
              <select
                v-model="form.appointment_time"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Service Needed *</label
              >
              <select
                v-model="form.service_type"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select service</option>
                <option value="checkup">General Checkup</option>
                <option value="vaccination">Vaccination</option>
                <option value="surgery">Surgery Consultation</option>
                <option value="dental">Dental Care</option>
                <option value="grooming">Grooming</option>
                <option value="emergency">Emergency</option>
                <option value="consultation">General Consultation</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Additional Notes</label
            >
            <textarea
              v-model="form.notes"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please describe your pet's symptoms or any specific concerns..."
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center">
              <div class="spinner mr-2"></div>
              Booking Appointment...
            </span>
            <span v-else>Book Appointment</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppointmentStore } from "@/stores/appointment";
import { useUIStore } from "@/stores/ui";
import { appointmentService } from "@/services/appointmentService";

export default {
  name: "AppointmentView",
  setup() {
    const appointmentStore = useAppointmentStore();
    const uiStore = useUIStore();

    return {
      appointmentStore,
      uiStore,
    };
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        client_name: "",
        client_phone: "",
        client_email: "",
        pet_name: "",
        pet_type: "",
        appointment_date: "",
        appointment_time: "",
        service_type: "",
        notes: "",
      },
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  },
  methods: {
    async submitAppointment() {
      this.isSubmitting = true;

      try {
        const appointmentData = {
          client_name: this.form.client_name,
          client_phone: this.form.client_phone,
          client_email: this.form.client_email || null,
          pet_name: this.form.pet_name,
          pet_type: this.form.pet_type,
          appointment_date: this.form.appointment_date,
          appointment_time: this.form.appointment_time,
          service_type: this.form.service_type,
          notes: this.form.notes,
          status: "scheduled",
        };

        console.log("Submitting appointment data:", appointmentData);

        const response = await appointmentService.bookAppointment(
          appointmentData
        );
        console.log("API response:", response);

        this.appointmentStore.addAppointment({ ...this.form });

        this.uiStore.showSuccessMessage(
          "Appointment Booked Successfully!",
          `Your appointment for ${this.form.pet_name} has been scheduled for ${this.form.appointment_date} at ${this.form.appointment_time}.`
        );

        this.resetForm();
        this.showSuccessWithRedirect();
      } catch (error) {
        console.error(
          "Error booking appointment:",
          error.response?.data || error.message
        );
        this.uiStore.showSuccessMessage(
          "Error",
          error.response?.data?.error ||
            "There was an error booking your appointment. Please try again."
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    showSuccessWithRedirect() {
      const banner = document.createElement("div");
      banner.className =
        "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md";
      banner.innerHTML = `
        <div class="flex items-center justify-between">
          <span>Your appointment has been booked successfully!</span>
          <button onclick="window.location.href='/appointments'" class="bg-white text-green-500 px-3 py-1 rounded text-sm font-medium ml-4 hover:bg-gray-100">
            View Appointments
          </button>
        </div>
      `;

      document.body.appendChild(banner);

      setTimeout(() => {
        this.$router.push("/appointments");
        if (banner.parentNode) {
          banner.parentNode.removeChild(banner);
        }
      }, 3000);
    },

    resetForm() {
      this.form = {
        client_name: "",
        client_phone: "",
        client_email: "",
        pet_name: "",
        pet_type: "",
        appointment_date: "",
        appointment_time: "",
        service_type: "",
        notes: "",
      };
    },
  },
};
</script>

<style scoped>
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
