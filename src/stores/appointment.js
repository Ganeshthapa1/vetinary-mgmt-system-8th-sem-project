import { defineStore } from "pinia"

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    appointments: [],
    currentAppointment: {
      ownerName: "",
      phone: "",
      email: "",
      petName: "",
      petType: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    },
  }),

  actions: {
    addAppointment(appointment) {
      const newAppointment = {
        id: Date.now(),
        ...appointment,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      this.appointments.push(newAppointment)
      return newAppointment
    },

    updateAppointmentStatus(appointmentId, status) {
      const appointment = this.appointments.find((apt) => apt.id === appointmentId)
      if (appointment) {
        appointment.status = status
        appointment.updatedAt = new Date().toISOString()
      }
    },

    deleteAppointment(appointmentId) {
      const index = this.appointments.findIndex((apt) => apt.id === appointmentId)
      if (index !== -1) {
        this.appointments.splice(index, 1)
      }
    },

    clearAllAppointments() {
      this.appointments = []
    },

    resetCurrentAppointment() {
      this.currentAppointment = {
        ownerName: "",
        phone: "",
        email: "",
        petName: "",
        petType: "",
        date: "",
        time: "",
        service: "",
        notes: "",
      }
    },

    async fetchAppointments() {
      try {
        const response = await import('@/services/appointmentService').then(m => m.appointmentService.getAppointments())
        // If response is wrapped in { data: [...] }
        this.appointments = response.data || response
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    },
  },

  getters: {
    getAppointmentById: (state) => (id) => {
      return state.appointments.find((apt) => apt.id === id)
    },

    getAppointmentsByStatus: (state) => (status) => {
      return state.appointments.filter((apt) => apt.status === status)
    },

    getTodaysAppointments: (state) => {
      const today = new Date().toISOString().split("T")[0]
      return state.appointments.filter((apt) => apt.date === today)
    },
  },
})
