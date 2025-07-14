const Pet = require('../models/Pet');
const Client = require('../models/Client');
const Appointment = require('../models/Appointment');
const Inventory = require('../models/Inventory');
const { asyncHandler } = require('../middleware/errorHandler');



// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Public
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalPets,
    totalClients,
    totalAppointments,
    todaysAppointments,
    totalInventory,
    lowStockInventory
  ] = await Promise.all([
    Pet.count(),
    Client.count(),
    Appointment.count(),
    Appointment.getTodaysAppointments(),
    Inventory.count(),
    Inventory.countLowStock(10)
  ]);

  const stats = {
    total_pets: totalPets,
    total_clients: totalClients,
    total_appointments: totalAppointments,
    todays_appointments: todaysAppointments.length,
    appointments_today: todaysAppointments, // For backward compatibility
    total_inventory: totalInventory,
    low_stock_inventory: lowStockInventory
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Get recent activities
// @route   GET /api/dashboard/recent
// @access  Public
const getRecentActivities = asyncHandler(async (req, res) => {
  const [
    recentPets,
    recentAppointments,
    upcomingAppointments
  ] = await Promise.all([
    Pet.findAll().then(pets => pets.slice(0, 5)), // Get 5 most recent pets
    Appointment.findAll().then(appointments => appointments.slice(0, 5)), // Get 5 most recent appointments
    Appointment.getUpcomingAppointments(7) // Get upcoming appointments for next 7 days
  ]);

  const activities = {
    recent_pets: recentPets,
    recent_appointments: recentAppointments,
    upcoming_appointments: upcomingAppointments
  };

  res.status(200).json({
    success: true,
    data: activities
  });
});

// @desc    Get today's schedule
// @route   GET /api/dashboard/schedule
// @access  Public
const getTodaysSchedule = asyncHandler(async (req, res) => {
  const todaysAppointments = await Appointment.getTodaysAppointments();

  res.status(200).json({
    success: true,
    count: todaysAppointments.length,
    data: todaysAppointments
  });
});

// @desc    Get dashboard overview
// @route   GET /api/dashboard/overview
// @access  Public
const getDashboardOverview = asyncHandler(async (req, res) => {
  const [
    stats,
    recentPets,
    todaysAppointments,
    upcomingAppointments
  ] = await Promise.all([
    getDashboardStatsData(),
    Pet.findAll().then(pets => pets.slice(0, 5)),
    Appointment.getTodaysAppointments(),
    Appointment.getUpcomingAppointments(7)
  ]);

  const overview = {
    statistics: stats,
    recent_pets: recentPets,
    todays_appointments: todaysAppointments,
    upcoming_appointments: upcomingAppointments.slice(0, 10) // Limit to 10
  };

  res.status(200).json({
    success: true,
    data: overview
  });
});

// Helper function to get dashboard stats data
async function getDashboardStatsData() {
  const [
    totalPets,
    totalClients,
    totalAppointments,
    todaysAppointments,
    totalInventory,
    lowStockInventory
  ] = await Promise.all([
    Pet.count(),
    Client.count(),
    Appointment.count(),
    Appointment.getTodaysAppointments(),
    Inventory.count(),
    Inventory.countLowStock(10)
  ]);

  return {
    total_pets: totalPets,
    total_clients: totalClients,
    total_appointments: totalAppointments,
    todays_appointments: todaysAppointments.length,
    total_inventory: totalInventory,
    low_stock_inventory: lowStockInventory
  };
}

module.exports = {
  getDashboardStats,
  getRecentActivities,
  getTodaysSchedule,
  getDashboardOverview
};
