import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TestimonialManager() {
  // 🔹 States
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({
    machinesSold: "500+",
    satisfaction: "98%",
    experience: "15+",
    support: "24/7",
  });
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    video: "",
  });

  const [editingSection, setEditingSection] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔹 API URLs
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Production URL banane ke liye '/api' ko '/uploads' se replace kiya
  const IMAGE_BASE_URL = BASE_URL.replace("/api", "/uploads");
  const TESTIMONIAL_API = `${BASE_URL}/testimonials`;
  const STATS_API = `${BASE_URL}/testimonials/data/stats`;

  // 🔹 Helper function: Full image URL handle karne ke liye
  const getFullImgPath = (imgName) => {
    if (!imgName) return "https://via.placeholder.com/60";
    // Agar link localhost wala hai ya pura URL hai, toh direct return karein
    if (imgName.startsWith("http")) return imgName;
    // Agar sirf filename hai, toh server ka base path lagayein
    return `${IMAGE_BASE_URL}/${imgName}`;
  };

  // 🔹 Fetch Data on Load
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError("");
    try {
      const [testRes, statsRes] = await Promise.all([
        axios.get(TESTIMONIAL_API),
        axios.get(STATS_API),
      ]);

      setTestimonials(testRes.data || []);

      if (statsRes.data) {
        const statsData = Array.isArray(statsRes.data)
          ? statsRes.data[0]
          : statsRes.data;
        if (statsData) {
          setStats({
            machinesSold: statsData.machinesSold || "0",
            satisfaction: statsData.satisfaction || "0",
            experience: statsData.experience || "0",
            support: statsData.support || "0",
          });
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data from server.");
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    const uploadData = new FormData();
    // ⚠️ Backend middleware "image" field expect kar raha hai
    uploadData.append("image", file);
    try {
      const res = await axios.post(`${BASE_URL}/upload`, uploadData);
      // ⚠️ DB mein sirf filename save karein taaki localhost URL save na ho
      setFormData({ ...formData, image: res.data.filename });
      setUploading(false);
    } catch (err) {
      setError("Image upload failed.");
      setUploading(false);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${TESTIMONIAL_API}/${editId}`, formData);
      } else {
        await axios.post(TESTIMONIAL_API, formData);
      }
      resetForm();
      fetchInitialData();
      showSuccess();
    } catch (err) {
      setError("Failed to save testimonial.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        await axios.delete(`${TESTIMONIAL_API}/${id}`);
        fetchInitialData();
        showSuccess();
      } catch (err) {
        setError("Delete failed.");
      }
    }
  };

  const handleStatsUpdate = async () => {
    try {
      await axios.post(STATS_API, stats);
      setEditingSection(null);
      showSuccess();
    } catch (err) {
      setError("Failed to update stats.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      image: "",
      video: "",
    });
    setEditId(null);
    setEditingSection(null);
  };

  const openEdit = (item) => {
    setFormData({
      name: item.name || "",
      role: item.role || "",
      company: item.company || "",
      content: item.content || "",
      rating: item.rating || 5,
      image: item.image || "",
      video: item.video || "",
    });
    setEditId(item._id);
    setEditingSection("testimonial");
  };

  const showSuccess = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-red-600 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Testimonial Manager
            </h1>
            <p className="text-gray-600">
              Manage client reviews and business stats
            </p>
          </div>
          <button
            onClick={() => setEditingSection("testimonial")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            + Add New Review
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Business Stats
                </h2>
                <button
                  onClick={() => setEditingSection("stats")}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Edit Stats
                </button>
              </div>
              <div className="space-y-4">
                {Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 bg-red-50 rounded-lg border border-red-100 text-center"
                  >
                    <p className="text-2xl font-bold text-red-600">
                      {String(value)}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Live Testimonials
            </h2>
            {testimonials.length > 0 ? (
              testimonials.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl shadow-md flex gap-4 items-start border border-gray-100"
                >
                  <img
                    src={getFullImgPath(item.image)}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-red-100"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-red-600 font-medium">
                          {item.role} at {item.company}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3 text-sm italic">
                      "{item.content}"
                    </p>
                    <div className="mt-2 text-yellow-400">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center p-10 bg-white rounded-xl text-gray-400">
                No testimonials found.
              </p>
            )}
          </div>
        </div>

        {/* --- MODAL --- */}
        {editingSection && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editId ? "Edit" : "Add"}{" "}
                  {editingSection === "stats" ? "Stats" : "Review"}
                </h2>
                <button onClick={resetForm} className="text-gray-400 text-2xl">
                  &times;
                </button>
              </div>
              <div className="p-6">
                {editingSection === "testimonial" ? (
                  <form
                    onSubmit={handleTestimonialSubmit}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={getFullImgPath(formData.image)}
                        className="w-16 h-16 rounded-full object-cover"
                        alt="preview"
                      />
                      <label className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm">
                        {uploading ? "Uploading..." : "Upload Photo"}
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Role"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="p-3 border rounded-xl"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="p-3 border rounded-xl"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Feedback Content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full p-3 border rounded-xl h-32"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Rating"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.target.value })
                        }
                        className="p-3 border rounded-xl"
                        min="1"
                        max="5"
                      />
                      <input
                        type="text"
                        placeholder="Video Embed URL"
                        value={formData.video}
                        onChange={(e) =>
                          setFormData({ ...formData, video: e.target.value })
                        }
                        className="p-3 border rounded-xl"
                      />
                    </div>
                    <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold">
                      Save Testimonial
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {Object.keys(stats).map((key) => (
                      <div key={key}>
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={stats[key]}
                          onChange={(e) =>
                            setStats({ ...stats, [key]: e.target.value })
                          }
                          className="w-full p-3 border rounded-xl mt-1"
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleStatsUpdate}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold"
                    >
                      Update Statistics
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {isSaved && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100]">
            ✅ Saved!
          </div>
        )}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100]">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}
