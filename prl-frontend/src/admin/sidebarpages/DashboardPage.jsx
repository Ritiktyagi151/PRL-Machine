import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  Legend,
} from "recharts";
import {
  Package, Users, ShoppingCart, Phone, DollarSign, Clock, Star, Eye,
  Download, Filter, TrendingUp, TrendingDown, AlertCircle, ServerCrash
} from "lucide-react";

// --- API Simulation ---
// In a real application, this function would make a network request to your backend.
// e.g., using fetch(`https://your-api.com/dashboard?timeframe=${timeframe}`)
const fetchDashboardData = async (timeframe) => {
  console.log(`Fetching data for: ${timeframe}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate potential API failure
  if (Math.random() > 0.95) {
    throw new Error("Failed to connect to the server.");
  }

  // Generate dynamic data based on the timeframe
  const multiplier = { week: 0.25, month: 1, quarter: 3, year: 12 };
  const m = multiplier[timeframe];

  const generateChartData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dataCount = { week: 7, month: 6, quarter: 3, year: 12 };
    const labels = { week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], month: months.slice(0,6), quarter: ["Q1", "Q2", "Q3"], year: months };
    
    return labels[timeframe].map((label, i) => {
        const enquiries = Math.floor(Math.random() * 20 + 20 * m * (i * 0.1 + 1));
        const orders = Math.floor(enquiries * (Math.random() * 0.3 + 0.4));
        return {
            name: label,
            Enquiries: enquiries,
            Orders: orders,
            Revenue: orders * (Math.random() * 2000 + 1500),
            Conversion: parseFloat(((orders / enquiries) * 100).toFixed(1)),
        };
    });
  };
  
  return {
    stats: [
      { name: "Products", value: 120, growth: 12.5, icon: <Package size={30} />, color: "bg-gradient-to-r from-blue-500 to-blue-600", trend: "up" },
      { name: "Enquiries", value: Math.round(58 * m), growth: 8.3 * m, icon: <Phone size={30} />, color: "bg-gradient-to-r from-green-500 to-green-600", trend: "up" },
      { name: "Orders", value: Math.round(34 * m), growth: -2.1, icon: <ShoppingCart size={30} />, color: "bg-gradient-to-r from-yellow-500 to-yellow-600", trend: "down" },
      { name: "Revenue", value: Math.round(95420 * m), growth: 15.7 * m, icon: <DollarSign size={30} />, color: "bg-gradient-to-r from-purple-500 to-purple-600", trend: "up", prefix: "₹" },
    ],
    secondaryStats: [
      { name: "Active Users", value: Math.round(210 * m), icon: <Users size={20} />, color: "text-blue-600" },
      { name: "Avg Response Time", value: `${(2.4 / m).toFixed(1)}h`, icon: <Clock size={20} />, color: "text-green-600" },
      { name: "Customer Rating", value: "4.8/5", icon: <Star size={20} />, color: "text-yellow-600" },
      { name: "Page Views", value: `${(12.5 * m).toFixed(1)}K`, icon: <Eye size={20} />, color: "text-purple-600" },
    ],
    chartData: generateChartData(),
    pieData: [
      { name: "uPVC Machines", value: 45 + Math.round(Math.random() * 10), color: "#3B82F6" },
      { name: "Aluminium Machines", value: 30 + Math.round(Math.random() * 10), color: "#10B981" },
      { name: "Services", value: 15 + Math.round(Math.random() * 5), color: "#F59E0B" },
      { name: "Spare Parts", value: 10 + Math.round(Math.random() * 5), color: "#EF4444" },
    ],
    recentActivity: [ // This data is often paginated in real apps
        { name: "Rahul Sharma", email: "rahul@gmail.com", message: "Need quotation for uPVC Machine", time: "2 min ago", status: "pending", priority: "high" },
        { name: "Anjali Verma", email: "anjali@yahoo.com", message: "Looking for Aluminium welding machine", time: "15 min ago", status: "responded", priority: "medium" },
        { name: "Karan Singh", email: "karan@hotmail.com", message: "Book a demo for next week", time: "1 hour ago", status: "scheduled", priority: "high" },
        { name: "Priya Patel", email: "priya@company.com", message: "Technical support needed", time: "2 hours ago", status: "in-progress", priority: "urgent" },
        { name: "Vikash Kumar", email: "vikash@email.com", message: "Bulk order inquiry", time: "3 hours ago", status: "pending", priority: "high" },
    ],
    topProducts: [
        { name: "uPVC Window Machine", sales: Math.round(25 * m), revenue: Math.round(125000 * m), growth: 15 },
        { name: "Aluminium Door Machine", sales: Math.round(18 * m), revenue: Math.round(90000 * m), growth: 8 },
        { name: "Glass Processing Unit", sales: Math.round(12 * m), revenue: Math.round(60000 * m), growth: -3 },
        { name: "Welding Equipment", sales: Math.round(10 * m), revenue: Math.round(50000 * m), growth: 22 },
    ]
  };
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Effect for fetching data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Replace this with your actual API call
        const data = await fetchDashboardData(selectedTimeframe);
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedTimeframe]); // Re-fetch when timeframe changes

  // Animation effect for stat counters
  useEffect(() => {
    if (!dashboardData) return;

    const newAnimatedValues = {};
    dashboardData.stats.forEach((stat, index) => {
      newAnimatedValues[index] = stat.value;
    });
    setAnimatedValues(newAnimatedValues);
  }, [dashboardData]);

  // Helper functions (no changes needed)
  const formatValue = (value, prefix = "") => {
    if (typeof value === 'number' && value >= 100000) {
      return `${prefix}${(value / 100000).toFixed(2)}L`;
    }
    if (typeof value === 'number' && value >= 1000) {
       return `${prefix}${(value / 1000).toFixed(1)}K`;
    }
    return prefix + value;
  };
  const getStatusColor = (status) => ({ pending: "bg-yellow-100 text-yellow-800", responded: "bg-blue-100 text-blue-800", scheduled: "bg-green-100 text-green-800", "in-progress": "bg-purple-100 text-purple-800" }[status] || "bg-gray-100 text-gray-800");
  const getPriorityColor = (priority) => ({ urgent: "text-red-500", high: "text-orange-500", medium: "text-yellow-500", low: "text-green-500" }[priority] || "text-gray-500");

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Dashboard...</h2>
        <style jsx>{`.loader { border-top-color: #3498db; animation: spinner 1.5s linear infinite; } @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-red-500">
        <ServerCrash size={48} className="mb-4" />
        <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.stats.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl text-white flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${item.color}`}
            style={{ animation: `slideInUp 0.6s ease-out ${idx * 0.1}s both` }}
          >
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-2xl font-bold">
                  {formatValue(animatedValues[idx] || 0, item.prefix)}
                </p>
                {item.trend === 'up' ?
                  <TrendingUp size={16} className="text-green-200" /> :
                  <TrendingDown size={16} className="text-red-200" />
                }
              </div>
              <p className="text-sm opacity-90">{item.name}</p>
              <p className={`text-xs flex items-center gap-1 mt-1 ${item.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}% from last period
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardData.secondaryStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            style={{ animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-50 ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.value}</p>
                <p className="text-sm text-gray-600">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div
          className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ animation: 'slideInLeft 0.7s ease-out' }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enquiries & Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
              <Legend />
              <Bar dataKey="Enquiries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Orders" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ animation: 'slideInRight 0.7s ease-out' }}
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {dashboardData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* ... Rest of the JSX remains largely the same, just replace hardcoded data with dashboardData ... */}
      {/* For brevity, only showing one more example. Apply this to all sections. */}
      
      {/* Recent Enquiries Table */}
      <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Enquiries</h2>
          <div className="overflow-x-auto">
              <table className="w-full">
                  <thead>
                      <tr className="border-b border-gray-200">
                          <th className="text-left p-3 font-semibold text-gray-700">Customer</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Message</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Priority</th>
                      </tr>
                  </thead>
                  <tbody>
                      {dashboardData.recentActivity.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="p-3">
                                  <div>
                                      <p className="font-medium text-gray-800">{item.name}</p>
                                      <p className="text-sm text-gray-500">{item.email}</p>
                                  </div>
                              </td>
                              <td className="p-3">
                                  <p className="text-gray-700 truncate max-w-xs">{item.message}</p>
                              </td>
                              <td className="p-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                      {item.status}
                                  </span>
                              </td>
                              <td className="p-3">
                                  <div className={`flex items-center gap-1 ${getPriorityColor(item.priority)}`}>
                                      <AlertCircle size={14} />
                                      <span className="text-sm capitalize">{item.priority}</span>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>


      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;