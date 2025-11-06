import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    theme: "light",
    language: "en",
    fontSize: "medium",
    notifications: true,
  });

  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("token");

  // Load settings
  useEffect(() => {
    axios.get("/api/site-config", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // Save general settings
  const handleSaveSettings = () => {
    axios.put("/api/site-config", settings, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => showMessage("Settings updated!", "success"))
      .catch(() => showMessage("Failed to update settings", "error"));
  };

  // Change password
  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) return showMessage("Passwords do not match", "error");
    axios.post("/api/users/change-password", { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        showMessage("Password changed!", "success");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch(err => showMessage(err.response?.data?.error || "Failed to change password", "error"));
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">Admin Settings</h2>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message.text}</div>
      )}

      {/* General Settings */}
      <div className="space-y-4">
        <label>Site Title</label>
        <input value={settings.siteTitle} onChange={e => setSettings({ ...settings, siteTitle: e.target.value })} className="w-full p-2 border rounded" />

        <label>Site Description</label>
        <input value={settings.siteDescription} onChange={e => setSettings({ ...settings, siteDescription: e.target.value })} className="w-full p-2 border rounded" />

        <label>Theme</label>
        <select value={settings.theme} onChange={e => setSettings({ ...settings, theme: e.target.value })} className="w-full p-2 border rounded">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>

        <label>Language</label>
        <select value={settings.language} onChange={e => setSettings({ ...settings, language: e.target.value })} className="w-full p-2 border rounded">
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>

        <label>Font Size</label>
        <select value={settings.fontSize} onChange={e => setSettings({ ...settings, fontSize: e.target.value })} className="w-full p-2 border rounded">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label>
          <input type="checkbox" checked={settings.notifications} onChange={e => setSettings({ ...settings, notifications: e.target.checked })} /> Enable Notifications
        </label>

        <button onClick={handleSaveSettings} className="px-4 py-2 bg-purple-600 text-white rounded">Save Settings</button>
      </div>

      {/* Password Change */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold">Change Password</h3>
        <input type="password" placeholder="Current Password" value={passwordData.currentPassword} onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="w-full p-2 border rounded" />
        <input type="password" placeholder="New Password" value={passwordData.newPassword} onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full p-2 border rounded" />
        <input type="password" placeholder="Confirm Password" value={passwordData.confirmPassword} onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full p-2 border rounded" />
        <button onClick={handlePasswordChange} className="px-4 py-2 bg-red-600 text-white rounded">Change Password</button>
      </div>
    </div>
  );
};

export default AdminSettings;
