import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NavbarManager() {
  // 🔹 States
  const [logo, setLogo] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
  const [editingSection, setEditingSection] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const API_URL = "http://localhost:3000/api/navbar";

  // 🔹 Fetch Navbar Data
  useEffect(() => {
    fetchNavbarData();
  }, []);

  const fetchNavbarData = () => {
    setLoading(true);
    setError("");
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data;
        setLogo(data.logo || "");
        setAnnouncements(data.announcements || []);
        setSocialLinks(data.socialLinks || []);
        setContactInfo(data.contactInfo || { phone: "", email: "" });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching navbar:", err);
        setError(
          "Failed to load navbar data. Please check if the server is running."
        );
        setLoading(false);
      });
  };

  // 🔹 Handle Logo Upload
 const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Check if file is an image
  if (!file.type.match("image.*")) {
    setError("Please select an image file");
    return;
  }

  setUploading(true);
  setError("");

  const formData = new FormData();
  formData.append("file", file); // 👈 "logo" → "file" (backend ke saath match karne ke liye)

  axios
    .post(`${API_URL}/upload-logo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setLogo(res.data.logo); // 👈 "logoUrl" → "logo"
      setUploading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    })
    .catch((err) => {
      console.error("Error uploading logo:", err);
      setError("Failed to upload logo. Please try again.");
      setUploading(false);
    });
};


  // 🔹 Save Navbar Data
  const handleSave = () => {
    setError("");
    const payload = { logo, announcements, socialLinks, contactInfo };

    axios
      .put(API_URL, payload)
      .then(() => {
        setEditingSection(null);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      })
      .catch((err) => {
        console.error("Error saving navbar:", err);
        setError("Failed to save changes. Please try again.");
      });
  };

  // 🔹 Reset to Default
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all navbar data to default?"
      )
    ) {
      setError("");
      axios
        .delete(API_URL)
        .then(() => {
          fetchNavbarData();
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        })
        .catch((err) => {
          console.error("Error resetting navbar:", err);
          setError("Failed to reset data. Please try again.");
        });
    }
  };

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading Navbar...</p>
        </div>
      </div>
    );
  }

  // 🔹 Modal Renderer
  const renderModal = () => {
    if (!editingSection) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-2xl border-2 border-violet-500 transform scale-95 animate-scaleIn">
          <h2 className="text-2xl font-bold mb-4 text-violet-800">
            Edit {editingSection}
          </h2>

          {/* Logo Edit */}
          {editingSection === "logo" && (
            <div className="space-y-3">
              <div className="flex flex-col gap-3">
                <label className="block text-gray-700 mb-1">Upload Logo</label>
                <div className="flex items-center gap-2">
                  <label className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    {uploading ? "Uploading..." : "Choose File"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {uploading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-violet-600"></div>
                  )}
                </div>
                <p className="text-sm text-gray-500">Or enter URL manually:</p>
              </div>

              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="Logo URL"
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-16 mx-auto border rounded-lg p-2 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150x80?text=Invalid+URL";
                  }}
                />
              </div>
            </div>
          )}

          {/* Announcements Edit */}
          {editingSection === "announcements" && (
            <div className="space-y-3">
              {announcements.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...announcements];
                      updated[idx] = e.target.value;
                      setAnnouncements(updated);
                    }}
                    className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={() =>
                      setAnnouncements(
                        announcements.filter((_, i) => i !== idx)
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => setAnnouncements([...announcements, ""])}
                className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-2 rounded-lg transition-colors w-full"
              >
                + Add New Announcement
              </button>
            </div>
          )}

          {/* Social Links Edit */}
          {editingSection === "socialLinks" && (
            <div className="space-y-4 max-h-96 overflow-y-auto p-1">
              {socialLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="space-y-3 border-2 border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-white transition-colors"
                >
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[idx].platform = e.target.value;
                      setSocialLinks(updated);
                    }}
                    placeholder="Platform"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    value={link.icon}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[idx].icon = e.target.value;
                      setSocialLinks(updated);
                    }}
                    placeholder="Icon (e.g., FaFacebook)"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[idx].url = e.target.value;
                      setSocialLinks(updated);
                    }}
                    placeholder="URL"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={() =>
                      setSocialLinks(socialLinks.filter((_, i) => i !== idx))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors w-full"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setSocialLinks([
                    ...socialLinks,
                    { platform: "", icon: "", url: "" },
                  ])
                }
                className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-3 rounded-lg transition-colors w-full"
              >
                + Add New Social Link
              </button>
            </div>
          )}

          {/* Contact Info Edit */}
          {editingSection === "contactInfo" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  placeholder="Phone"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="Email"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setEditingSection(null)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Save Notification
  const SaveConfirmation = () => {
    if (!isSaved) return null;
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
        ✅ Changes saved successfully!
      </div>
    );
  };

  // 🔹 Error Notification
  const ErrorNotification = () => {
    if (!error) return null;
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
        ❌ {error}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-violet-600 animate-fadeIn">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-violet-800">
                Navbar Manager
              </h1>
              <p className="text-gray-600">
                Customize your website's navigation bar
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchNavbarData}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={handleReset}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">Logo</h2>
            <button
              onClick={() => setEditingSection("logo")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Logo
            </button>
          </div>
          <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
            <img
              src={logo}
              alt="Logo"
              className="h-20 object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150x80?text=Invalid+URL";
              }}
            />
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">Announcements</h2>
            <button
              onClick={() => setEditingSection("announcements")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Announcements
            </button>
          </div>
          <ul className="space-y-2">
            {announcements.length > 0 ? (
              announcements.map((item, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fadeIn"
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="p-3 bg-gray-100 border-l-4 border-gray-400 rounded-r-lg text-gray-500">
                No announcements yet
              </li>
            )}
          </ul>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">Social Media</h2>
            <button
              onClick={() => setEditingSection("socialLinks")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Social Links
            </button>
          </div>
          <div className="overflow-x-auto">
            {socialLinks.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-violet-100">
                    <th className="border-2 border-violet-200 p-3 text-left text-violet-700">
                      Platform
                    </th>
                    <th className="border-2 border-violet-200 p-3 text-left text-violet-700">
                      Icon
                    </th>
                    <th className="border-2 border-violet-200 p-3 text-left text-violet-700">
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {socialLinks.map((item, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-violet-50 hover:bg-violet-100 transition-colors"
                    >
                      <td className="border-2 border-violet-100 p-3">
                        {item.platform}
                      </td>
                      <td className="border-2 border-violet-100 p-3 font-mono">
                        {item.icon}
                      </td>
                      <td className="border-2 border-violet-100 p-3 truncate max-w-xs">
                        {item.url}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                No social links added yet
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">Contact Info</h2>
            <button
              onClick={() => setEditingSection("contactInfo")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Contact Info
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p className="font-semibold text-red-700">Phone</p>
              <p>{contactInfo.phone || "Not set"}</p>
            </div>
            <div className="p-4 bg-violet-50 rounded-lg border-l-4 border-violet-500">
              <p className="font-semibold text-violet-700">Email</p>
              <p>{contactInfo.email || "Not set"}</p>
            </div>
          </div>
        </div>

        {renderModal()}
        <SaveConfirmation />
        <ErrorNotification />
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
