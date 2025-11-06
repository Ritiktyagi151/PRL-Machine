import React, { useState, useEffect } from "react";

export default function AdminContact() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
    hours: "",
  });
  const [mapEmbed, setMapEmbed] = useState("");
  const [formFields, setFormFields] = useState([]);

  const [editing, setEditing] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/site-config`);
        if (!res.ok) throw new Error("Failed to fetch site config");
        const { data } = await res.json();
        if (data) {
          setContactInfo(data.contactInfo || {});
          setMapEmbed(data.mapEmbed || "");
          setFormFields(data.formFields || []);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Failed to load settings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [API_BASE]);

  // Basic validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = (phone) =>
    /^[+\d\s()-]{7,}$/.test(phone.trim()); // basic pattern allowing +, digits, spaces, parentheses, dashes

  const handleSave = async () => {
    setError("");
    // Validation checks before save
    if (contactInfo.email && !isValidEmail(contactInfo.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (contactInfo.phone && !isValidPhone(contactInfo.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = { contactInfo, mapEmbed, formFields };

      const res = await fetch(`${API_BASE}/site-config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save changes");

      setEditing(null);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setError("Could not save changes. Please try again.");
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const renderModal = () => {
    if (!editing) return null;

    return (
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-2xl border-2 border-violet-500 transform scale-95 animate-scaleIn max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-violet-800">
            Edit{" "}
            {editing === "contactInfo"
              ? "Contact Information"
              : editing === "map"
              ? "Google Map"
              : "Form Fields"}
          </h2>

          {/* Show error message inside modal */}
          {error && (
            <div className="mb-4 text-red-600 font-semibold">{error}</div>
          )}

          {editing === "contactInfo" && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Address:
                </label>
                <textarea
                  id="address"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
                  }
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500"
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Phone:
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label
                  htmlFor="hours"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Business Hours:
                </label>
                <textarea
                  id="hours"
                  value={contactInfo.hours}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, hours: e.target.value })
                  }
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500"
                  rows={3}
                />
              </div>
            </div>
          )}

          {editing === "map" && (
            <div>
              <label
                htmlFor="mapEmbed"
                className="block mb-2 font-semibold text-gray-700"
              >
                Google Maps Embed Link:
              </label>
              <textarea
                id="mapEmbed"
                value={mapEmbed}
                onChange={(e) => setMapEmbed(e.target.value)}
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500"
                rows={3}
              />
            </div>
          )}

          {editing === "formFields" && (
            <div className="space-y-4 max-h-96 overflow-y-auto p-1">
              {formFields.map((field, idx) => (
                <div
                  key={idx}
                  className="space-y-3 border-2 p-4 rounded-lg bg-gray-50"
                >
                  <input
                    aria-label={`Field Label ${idx + 1}`}
                    value={field.label}
                    onChange={(e) => {
                      const updated = [...formFields];
                      updated[idx].label = e.target.value;
                      setFormFields(updated);
                    }}
                    className="border-2 border-gray-300 p-2 w-full rounded-lg"
                    placeholder="Field Label"
                  />
                  <select
                    aria-label={`Field Type ${idx + 1}`}
                    value={field.type}
                    onChange={(e) => {
                      const updated = [...formFields];
                      updated[idx].type = e.target.value;
                      setFormFields(updated);
                    }}
                    className="border-2 border-gray-300 p-2 w-full rounded-lg"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Textarea</option>
                  </select>
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => {
                        const updated = [...formFields];
                        updated[idx].required = e.target.checked;
                        setFormFields(updated);
                      }}
                      className="h-4 w-4"
                    />
                    <span>Required</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this field?"
                        )
                      ) {
                        setFormFields(formFields.filter((_, i) => i !== idx));
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg w-full"
                  >
                    Delete Field
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFormFields([
                    ...formFields,
                    {
                      name: `field_${Date.now()}`,
                      label: "",
                      type: "text",
                      required: false,
                    },
                  ])
                }
                className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-3 rounded-lg w-full"
              >
                + Add New Field
              </button>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg shadow-md disabled:bg-violet-400"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Saving overlay */}
        {isSaving && (
          <div className="absolute inset-0 bg-black/30 flex justify-center items-center z-50 rounded-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-violet-600"></div>
          </div>
        )}
      </div>
    );
  };

  const SaveConfirmation = () => {
    if (!saveStatus) return null;
    const isSuccess = saveStatus === "success";
    return (
      <div
        role="alert"
        className={`fixed top-4 right-4 ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        } text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut`}
      >
        {isSuccess
          ? "✅ Changes saved successfully!"
          : "❌ Failed to save changes."}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Contact Settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-violet-600">
          <h1 className="text-3xl font-bold text-violet-800">
            Admin Contact Manager
          </h1>
          <p className="text-gray-600">
            Customize your website's contact information and form
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">
              📞 Contact Information
            </h2>
            <button
              onClick={() => setEditing("contactInfo")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
            >
              Edit Info
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-violet-50 rounded-lg">
              <p className="font-semibold mb-2">Address</p>
              <p className="whitespace-pre-line">{contactInfo.address}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-semibold mb-2">Phone</p>
              <p>{contactInfo.phone}</p>
            </div>
            <div className="p-4 bg-violet-50 rounded-lg">
              <p className="font-semibold mb-2">Email</p>
              <p>{contactInfo.email}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-semibold mb-2">Business Hours</p>
              <p className="whitespace-pre-line">{contactInfo.hours}</p>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-violet-700">
              📄 Export Contacts
            </h2>
            <a
              href={`${API_BASE}/contact/export`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Download Excel File
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">📍 Google Map</h2>
            <button
              onClick={() => setEditing("map")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
            >
              Edit Map
            </button>
          </div>
          <iframe
            src={mapEmbed}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-lg shadow-md"
            title="Company Location"
          ></iframe>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-violet-700">
              📋 Contact Form Fields
            </h2>
            <button
              onClick={() => setEditing("formFields")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
            >
              Edit Fields
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {formFields.length > 0 ? (
              formFields.map((f, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    f.required
                      ? "bg-red-50 border-red-500"
                      : "bg-violet-50 border-violet-500"
                  }`}
                >
                  <p className="font-semibold">{f.label || "(No Label)"}</p>
                  <p className="text-sm capitalize">
                    {f.type}{" "}
                    {f.required && <span className="text-red-500">(Required)</span>}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No form fields configured.</p>
            )}
          </div>
        </div>

        {renderModal()}
        <SaveConfirmation />
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
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
          20%,
          80% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
