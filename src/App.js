import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, DollarSign, Clock, Package, Bell, Search, Filter, Plus, Edit, Eye, Phone, Mail, Star, Award, ShoppingBag, Shirt, TrendingUp, BarChart3, PieChart, Target, CheckCircle, AlertCircle, Navigation, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const SPGManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSPG, setSelectedSPG] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExperience, setFilterExperience] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-06-15');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleView, setScheduleView] = useState('calendar'); // calendar, list, map

  // Enhanced sample data
  const spgData = [
    {
      id: 1,
      name: 'Sari Dewi',
      photo: '👩🏻‍💼',
      experience: 'Senior',
      rating: 4.8,
      location: 'Jakarta Selatan',
      coordinates: { lat: -6.2615, lng: 106.8106 },
      availability: 'Available',
      uniformSize: { top: 'M', bottom: 'M', shoes: '37' },
      phone: '+62-812-3456-7890',
      email: 'sari.dewi@email.com',
      specialties: ['Cosmetics', 'Electronics'],
      currentAssignment: null,
      paygrade: 'Senior (Rp 150,000/day)',
      lastActive: '2 hours ago',
      monthlyEarnings: 3200000,
      eventsThisMonth: 8,
      performanceScore: 95
    },
    {
      id: 2,
      name: 'Maya Putri',
      photo: '👩🏻‍🦰',
      experience: 'Intermediate',
      rating: 4.5,
      location: 'Bandung',
      coordinates: { lat: -6.9175, lng: 107.6191 },
      availability: 'Scheduled',
      uniformSize: { top: 'S', bottom: 'S', shoes: '36' },
      phone: '+62-813-9876-5432',
      email: 'maya.putri@email.com',
      specialties: ['Fashion', 'Food & Beverage'],
      currentAssignment: 'Festival Citylink',
      paygrade: 'Intermediate (Rp 120,000/day)',
      lastActive: '30 minutes ago',
      monthlyEarnings: 2800000,
      eventsThisMonth: 12,
      performanceScore: 88
    },
    {
      id: 3,
      name: 'Rina Sari',
      photo: '👩🏽‍💼',
      experience: 'Entry',
      rating: 4.2,
      location: 'Surabaya',
      coordinates: { lat: -7.2575, lng: 112.7521 },
      availability: 'Available',
      uniformSize: { top: 'L', bottom: 'M', shoes: '38' },
      phone: '+62-814-1111-2222',
      email: 'rina.sari@email.com',
      specialties: ['Health & Beauty'],
      currentAssignment: null,
      paygrade: 'Entry (Rp 100,000/day)',
      lastActive: '1 hour ago',
      monthlyEarnings: 2100000,
      eventsThisMonth: 15,
      performanceScore: 82
    },
    {
      id: 4,
      name: 'Dina Lestari',
      photo: '👩🏽‍🦱',
      experience: 'Senior',
      rating: 4.9,
      location: 'Jakarta Pusat',
      coordinates: { lat: -6.1944, lng: 106.8229 },
      availability: 'Available',
      uniformSize: { top: 'M', bottom: 'M', shoes: '37' },
      phone: '+62-815-5555-6666',
      email: 'dina.lestari@email.com',
      specialties: ['Electronics', 'Automotive'],
      currentAssignment: null,
      paygrade: 'Senior (Rp 150,000/day)',
      lastActive: '45 minutes ago',
      monthlyEarnings: 3500000,
      eventsThisMonth: 10,
      performanceScore: 98
    }
  ];

  const scheduleData = [
    {
      id: 1,
      title: 'Samsung Galaxy Launch',
      date: '2025-06-15',
      time: '10:00 - 18:00',
      location: 'Mall Kelapa Gading',
      address: 'Jl. Boulevard Barat Raya, Jakarta Utara',
      coordinates: { lat: -6.1588, lng: 106.8906 },
      spgNeeded: 8,
      spgAssigned: 6,
      assignedSPGs: [1, 2, 3, 4],  // SPG IDs
      status: 'Needs Staff',
      client: 'Samsung Indonesia',
      budget: 12000000,
      category: 'Electronics',
      requirements: ['Product knowledge test required', 'Fluent in English preferred', 'Previous tech experience'],
      description: 'Major product launch event with live demonstrations and customer interaction'
    },
    {
      id: 2,
      title: 'Wardah Beauty Fair',
      date: '2025-06-18',
      time: '11:00 - 20:00',
      location: 'Grand Indonesia',
      address: 'Jl. M.H. Thamrin No.1, Jakarta Pusat',
      coordinates: { lat: -6.1944, lng: 106.8229 },
      spgNeeded: 12,
      spgAssigned: 12,
      assignedSPGs: [1, 2, 3, 4],
      status: 'Fully Staffed',
      client: 'Wardah Cosmetics',
      budget: 18000000,
      category: 'Cosmetics',
      requirements: ['Beauty knowledge required', 'Makeup application skills', 'Customer service experience'],
      description: 'Interactive beauty fair with product trials and consultations'
    },
    {
      id: 3,
      title: 'Indomie Promo Week',
      date: '2025-06-20',
      time: '09:00 - 17:00',
      location: 'Multiple Locations',
      address: 'Various supermarkets across Jakarta',
      coordinates: { lat: -6.2088, lng: 106.8456 },
      spgNeeded: 25,
      spgAssigned: 18,
      assignedSPGs: [1, 2, 3],
      status: 'Needs Staff',
      client: 'Indofood',
      budget: 25000000,
      category: 'Food & Beverage',
      requirements: ['Energetic personality', 'Good communication skills', 'Flexible schedule'],
      description: 'Week-long promotional campaign at multiple retail locations'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'Jan', revenue: 1800000, events: 45, spgUtilization: 78 },
    { month: 'Feb', revenue: 2100000, events: 52, spgUtilization: 82 },
    { month: 'Mar', revenue: 1950000, events: 48, spgUtilization: 75 },
    { month: 'Apr', revenue: 2400000, events: 58, spgUtilization: 85 },
    { month: 'May', revenue: 2200000, events: 55, spgUtilization: 80 },
    { month: 'Jun', revenue: 2600000, events: 62, spgUtilization: 88 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Cosmetics', value: 28, color: '#EF4444' },
    { name: 'Fashion', value: 20, color: '#10B981' },
    { name: 'Food & Beverage', value: 17, color: '#F59E0B' }
  ];

  const topPerformers = [
    { name: 'Dina Lestari', score: 98, earnings: 3500000, events: 10 },
    { name: 'Sari Dewi', score: 95, earnings: 3200000, events: 8 },
    { name: 'Maya Putri', score: 88, earnings: 2800000, events: 12 },
    { name: 'Rina Sari', score: 82, earnings: 2100000, events: 15 }
  ];

  const upcomingEvents = scheduleData.slice(0, 3);

  const filteredSPGs = spgData.filter(spg => {
    const matchesSearch = spg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spg.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = filterExperience === 'all' || spg.experience.toLowerCase() === filterExperience;
    return matchesSearch && matchesExperience;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total SPGs</p>
              <p className="text-2xl font-bold text-blue-800">247</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Available Now</p>
              <p className="text-2xl font-bold text-green-800">156</p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Active Events</p>
              <p className="text-2xl font-bold text-orange-800">23</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">This Month Revenue</p>
              <p className="text-2xl font-bold text-purple-800">Rp 2.1B</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Upcoming Events Requiring Attention
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  <span className="font-medium">{event.spgAssigned}/{event.spgNeeded}</span> SPGs
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  event.status === 'Fully Staffed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-6 w-6 mx-auto mb-2" />
          <p className="font-medium">Schedule New Event</p>
        </button>
        <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
          <Users className="h-6 w-6 mx-auto mb-2" />
          <p className="font-medium">Add New SPG</p>
        </button>
        <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
          <Package className="h-6 w-6 mx-auto mb-2" />
          <p className="font-medium">Manage Inventory</p>
        </button>
      </div>
    </div>
  );

  const renderSPGDirectory = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search SPGs by name or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterExperience}
          onChange={(e) => setFilterExperience(e.target.value)}
        >
          <option value="all">All Experience Levels</option>
          <option value="entry">Entry Level</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      {/* SPG Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSPGs.map(spg => (
          <div key={spg.id} className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-4xl mr-3">{spg.photo}</div>
                <div>
                  <h3 className="font-semibold">{spg.name}</h3>
                  <p className="text-sm text-gray-600">{spg.experience}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{spg.rating}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {spg.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {spg.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                {spg.paygrade}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Specialties:</p>
              <div className="flex flex-wrap gap-1">
                {spg.specialties.map(specialty => (
                  <span key={specialty} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                spg.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {spg.availability}
              </span>
              {spg.currentAssignment && (
                <p className="text-xs text-gray-600 mt-1">
                  Current: {spg.currentAssignment}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button 
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                onClick={() => setSelectedSPG(spg)}
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View Details
              </button>
              <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-300 transition-colors">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSPGDetails = () => {
    if (!selectedSPG) return null;
    
    return (
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="text-6xl mr-4">{selectedSPG.photo}</div>
            <div>
              <h2 className="text-2xl font-bold">{selectedSPG.name}</h2>
              <p className="text-gray-600">{selectedSPG.experience} Level SPG</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{selectedSPG.rating} Rating</span>
              </div>
            </div>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedSPG(null)}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>{selectedSPG.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{selectedSPG.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span>{selectedSPG.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Active:</span>
                <span>{selectedSPG.lastActive}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Shirt className="h-5 w-5 mr-2 text-purple-600" />
              Uniform Specifications
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Top Size:</span>
                <span>{selectedSPG.uniformSize.top}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bottom Size:</span>
                <span>{selectedSPG.uniformSize.bottom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shoe Size:</span>
                <span>{selectedSPG.uniformSize.shoes}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-600" />
              Specialties & Experience
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSPG.specialties.map(specialty => (
                <span key={specialty} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {specialty}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">{selectedSPG.paygrade}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-600" />
              Current Status
            </h3>
            <div className="space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                selectedSPG.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedSPG.availability}
              </span>
              {selectedSPG.currentAssignment && (
                <p className="text-sm text-gray-600">
                  <strong>Current Assignment:</strong> {selectedSPG.currentAssignment}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Schedule Assignment
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Send Message
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            View Performance
          </button>
        </div>
      </div>
    );
  };

  // Add this function above the return statement
const renderScheduling = () => (
  <div className="text-center py-12">
    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Scheduling</h3>
    <p className="text-gray-600">Event scheduling and assignment features would be implemented here.</p>
  </div>
);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">SPG Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-500" />
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-gray-500">Jakarta Office</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Calendar },
              { id: 'spg-directory', label: 'SPG Directory', icon: Users },
              { id: 'scheduling', label: 'Scheduling', icon: Clock },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'analytics', label: 'Analytics', icon: DollarSign }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedSPG ? renderSPGDetails() : (
          <>
  {activeTab === 'dashboard' && renderDashboard()}
  {activeTab === 'spg-directory' && renderSPGDirectory()}
  {activeTab === 'scheduling' && renderScheduling()}
            {activeTab === 'inventory' && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Inventory Management</h3>
                <p className="text-gray-600">Uniform and promotional material tracking would be implemented here</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Reports</h3>
                <p className="text-gray-600">Performance analytics and financial reports would be implemented here</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SPGManagementDashboard;
