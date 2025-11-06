import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put("/api/admin/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  if (!profile) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-purple-200 dark:border-purple-800">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={profile.avatar || "/default-avatar.png"}
            alt="Admin Avatar"
            className="w-20 h-20 rounded-full border-2 border-purple-400 shadow-md"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-purple-600">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.role}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 text-gray-800 dark:text-gray-200">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Admin ID:</strong> {profile._id}</p>
        <p><strong>Department:</strong> {profile.department || "Management"}</p>
        <p>
          <strong>Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
              profile.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {profile.isActive ? "Active" : "Inactive"}
          </span>
        </p>
        <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        <p><strong>Last Login:</strong> {profile.lastLogin ? new Date(profile.lastLogin).toLocaleString() : "N/A"}</p>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-lg relative">
            <h3 className="text-xl font-bold text-purple-600 mb-4">Edit Profile</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Avatar URL</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar || ""}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-900"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
