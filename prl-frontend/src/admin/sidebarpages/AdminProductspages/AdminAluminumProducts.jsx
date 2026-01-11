const CLOUDINARY_CLOUD_NAME = "dr5myqvnp";
const CLOUDINARY_UPLOAD_PRESET = "jaikvik";
// Base URL for Cloudinary API
const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  Video,
  FileText,
  Save,
  Upload,
  Eye,
  Code,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/aluminum-machines`;

// ============================================================================
// MOVED COMPONENT 1: MachineForm
// ============================================================================
const MachineForm = memo(
  ({
    isEdit = false,
    currentMachine,
    handleChange,
    handleCancel,
    handleSave,
    handleAdd,
    handleSpecChange,
    handleSpecKeyUpdate,
    handleAddSpec,
    handleRemoveSpec,
    handleFaqChange,
    handleAddField,
    handleRemoveField,
    handleArrayChange,
    handleFileUpload,
    handlePreview,
    handleLoadExample,
    uploading,
  }) => {
    const [showHtmlPreview, setShowHtmlPreview] = useState(false);

    return (
      <div className="bg-white rounded-xl max-h-[85vh] overflow-y-auto shadow-md p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-violet-700">
            {isEdit ? "Edit Machine" : "Add New Machine"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="grid gap-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID *</label>
              <input
                type="text"
                name="id"
                value={currentMachine.id}
                onChange={handleChange}
                placeholder="Machine ID"
                className="border p-3 rounded-lg w-full"
                readOnly={isEdit}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Code *</label>
              <input
                type="text"
                name="code"
                value={currentMachine.code}
                onChange={handleChange}
                placeholder="Machine Code"
                className="border p-3 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={currentMachine.name}
                onChange={handleChange}
                placeholder="Machine Name"
                className="border p-3 rounded-lg w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium flex items-center">
                <Code size={16} className="mr-1" /> Description (HTML Supported)
              </label>
              <button
                type="button"
                onClick={() => setShowHtmlPreview(!showHtmlPreview)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border"
              >
                {showHtmlPreview ? "Show Editor" : "Preview HTML"}
              </button>
            </div>

            {showHtmlPreview ? (
              <div
                className="border p-3 w-full rounded-lg min-h-[150px] bg-gray-50 prose prose-sm max-w-none overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html:
                    currentMachine.description ||
                    "<p className='text-gray-400 italic'>No description to preview</p>",
                }}
              />
            ) : (
              <textarea
                name="description"
                value={currentMachine.description}
                onChange={handleChange}
                placeholder="Enter description (You can use HTML tags like <b>, <ul>, <li> etc.)"
                rows="6"
                className="border p-3 w-full rounded-lg font-mono text-sm"
              />
            )}
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">
              HTML Tags are allowed for styling
            </p>
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <ImageIcon size={16} className="mr-1" /> Images
            </label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
              {currentMachine.images?.map((img, i) => (
                <div key={`image-${i}`} className="relative group">
                  <img
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => handlePreview(img, "image")}
                      className="text-white"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveField("images", i)}
                      className="text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) =>
                      handleArrayChange(i, "images", e.target.value)
                    }
                    className="border p-1 text-xs w-full mt-1"
                  />
                </div>
              ))}
            </div>
            <label className="border-2 border-dashed p-4 rounded-lg flex items-center justify-center cursor-pointer">
              <Upload size={16} className="mr-2" /> Upload Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "images")}
                className="hidden"
              />
            </label>
          </div>

          {/* Videos */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Video size={16} className="mr-1" /> Videos
            </label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
              {currentMachine.videos?.map((vid, i) => (
                <div key={`video-${i}`} className="relative group">
                  <video
                    src={vid}
                    className="h-24 w-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => handlePreview(vid, "video")}
                      className="text-white"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveField("videos", i)}
                      className="text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={vid}
                    onChange={(e) =>
                      handleArrayChange(i, "videos", e.target.value)
                    }
                    className="border p-1 text-xs w-full mt-1"
                  />
                </div>
              ))}
            </div>
            <label className="border-2 border-dashed p-4 rounded-lg flex items-center justify-center cursor-pointer">
              <Upload size={16} className="mr-2" /> Upload Videos
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => handleFileUpload(e, "videos")}
                className="hidden"
              />
            </label>
          </div>

          {/* Specifications */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FileText size={16} className="mr-1" /> Specifications
            </label>
            <div className="space-y-2 mb-2">
              {Object.entries(currentMachine.specifications || {}).map(
                ([key, value], i) => (
                  <div key={`spec-${i}`} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={key}
                      placeholder="Key"
                      onChange={(e) => handleSpecKeyUpdate(key, e.target.value)}
                      className="border p-2 flex-1 rounded"
                    />
                    <input
                      type="text"
                      value={value}
                      placeholder="Value"
                      onChange={(e) => handleSpecChange(key, e.target.value)}
                      className="border p-2 flex-1 rounded"
                    />
                    <button
                      onClick={() => handleRemoveSpec(key)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )
              )}
            </div>
            <button
              onClick={handleAddSpec}
              className="text-violet-600 hover:text-violet-800 flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Specification
            </button>
          </div>

          {/* Technical Drawing */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Technical Drawing
            </label>
            <input
              type="text"
              name="technicalDrawing"
              value={currentMachine.technicalDrawing}
              onChange={handleChange}
              placeholder="Enter technical drawing URL"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* FAQ */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FileText size={16} className="mr-1" /> FAQ
            </label>
            <div className="space-y-4 mb-2">
              {currentMachine.faq?.map((item, i) => (
                <div
                  key={`faq-${i}`}
                  className="border p-3 rounded-lg relative"
                >
                  <div className="mb-2">
                    <label className="block text-xs font-medium mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        handleFaqChange(i, "question", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Answer
                    </label>
                    <textarea
                      value={item.answer}
                      onChange={(e) =>
                        handleFaqChange(i, "answer", e.target.value)
                      }
                      rows="2"
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveField("faq", i)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAddField("faq")}
              className="text-violet-600 hover:text-violet-800 flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add FAQ Item
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {!isEdit && (
            <button
              onClick={handleLoadExample}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg flex items-center"
            >
              Load Example
            </button>
          )}
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg flex items-center"
          >
            <X size={18} className="mr-2" /> Cancel
          </button>
          <button
            onClick={isEdit ? handleSave : handleAdd}
            className="bg-violet-600 text-white px-6 py-3 rounded-lg flex items-center"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {isEdit ? "Saving..." : "Adding..."}
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />{" "}
                {isEdit ? "Save Changes" : "Add Machine"}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }
);
MachineForm.displayName = "MachineForm";

// ============================================================================
// MOVED COMPONENT 2: PreviewModal
// ============================================================================
const PreviewModal = ({ item, onClose }) => {
  if (!item.visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[600] p-4">
      <div className="bg-white rounded-xl p-4 max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex justify-center">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt="Preview"
              className="max-h-[70vh] max-w-full object-contain"
            />
          ) : (
            <video
              src={item.url}
              controls
              autoPlay
              className="max-h-[70vh] max-w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const AdminAluminumWindowMachine = () => {
  const [machines, setMachines] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [previewItem, setPreviewItem] = useState({
    type: "",
    url: "",
    visible: false,
  });

  const emptyMachine = {
    id: "",
    code: "",
    name: "",
    description: "",
    images: [],
    videos: [],
    specifications: {},
    technicalDrawing: "",
    faq: [],
    inStock: true,
  };

  const exampleMachine = {
    id: "puc-600",
    code: "AL-PUC600",
    name: "Corner 8 Punch Machine (PUC-600)",
    description:
      "<h3>Professional Heavy Duty Machine</h3><p>Eight-corner aluminum punching machine for <b>complex frame</b> production.</p><ul><li>High Precision</li><li>Hydraulic System</li></ul>",
    images: [
      "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    videos: [],
    specifications: {
      Operation: "Hydraulic",
      Weight: "500 kg",
    },
    technicalDrawing: "",
    faq: [],
    inStock: true,
  };

  const [currentMachine, setCurrentMachine] = useState(emptyMachine);

  useEffect(() => {
    const loadMachines = async () => {
      try {
        const res = await axios.get(API_URL);
        setMachines(res.data || []);
      } catch (error) {
        console.error("Error loading machines:", error);
        setMachines([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadMachines();
  }, []);

  const showNotification = (message, type = "success") => {
    setSaveStatus({ message, type });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMachine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (key, value) => {
    setCurrentMachine((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };

  const handleSpecKeyUpdate = (oldKey, newKey) => {
    setCurrentMachine((prev) => {
      const updatedSpecs = { ...prev.specifications };
      const value = updatedSpecs[oldKey];
      delete updatedSpecs[oldKey];
      if (newKey) updatedSpecs[newKey] = value;
      return { ...prev, specifications: updatedSpecs };
    });
  };

  const handleFaqChange = (index, field, value) => {
    setCurrentMachine((prev) => {
      const updatedFaq = [...(prev.faq || [])];
      updatedFaq[index] = { ...updatedFaq[index], [field]: value };
      return { ...prev, faq: updatedFaq };
    });
  };

  const handleArrayChange = (index, field, value) => {
    setCurrentMachine((prev) => {
      const updated = [...(prev[field] || [])];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleAddField = (field) => {
    setCurrentMachine((prev) => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
        field === "faq" ? { question: "", answer: "" } : "",
      ],
    }));
  };

  const handleRemoveField = (field, index) => {
    setCurrentMachine((prev) => {
      const updated = (prev[field] || []).filter((_, i) => i !== index);
      return { ...prev, [field]: updated };
    });
  };

  const handleAddSpec = () => {
    const key = prompt("Enter specification key:");
    if (key) {
      const value = prompt("Enter specification value:");
      if (value !== null) handleSpecChange(key, value);
    }
  };

  const handleRemoveSpec = (key) => {
    setCurrentMachine((prev) => {
      const updatedSpecs = { ...prev.specifications };
      delete updatedSpecs[key];
      return { ...prev, specifications: updatedSpecs };
    });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await axios.post(`${CLOUDINARY_API_BASE}/upload`, formData);
      return res.data.secure_url;
    } catch (error) {
      throw new Error("Upload failed");
    }
  };

  const handleFileUpload = async (e, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setCurrentMachine((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), ...urls],
      }));
      showNotification("Upload successful!");
    } catch (error) {
      showNotification("Upload failed", "error");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleAdd = async () => {
    if (!currentMachine.id.trim() || !currentMachine.name.trim()) {
      showNotification("ID and Name are required", "error");
      return;
    }
    try {
      const res = await axios.post(API_URL, currentMachine);
      setMachines((prev) => [...prev, res.data]);
      setCurrentMachine(emptyMachine);
      setShowAddModal(false);
      showNotification("✅ Added!");
    } catch (error) {
      showNotification("❌ Error adding", "error");
    }
  };

  const handleEdit = (index) => {
    const machine = machines[index];
    setEditingIndex(index);
    setCurrentMachine({ ...machine, id: machine.id || machine._id });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/${currentMachine.id}`,
        currentMachine
      );
      const updated = [...machines];
      updated[editingIndex] = res.data;
      setMachines(updated);
      setShowEditModal(false);
      showNotification("✅ Updated!");
    } catch (error) {
      showNotification("❌ Error updating", "error");
    }
  };

  const handleDelete = async (index) => {
    const machine = machines[index];
    if (!window.confirm("Delete this machine?")) return;
    try {
      await axios.delete(`${API_URL}/${machine.id || machine._id}`);
      setMachines((prev) => prev.filter((_, i) => i !== index));
      showNotification("✅ Deleted!");
    } catch (error) {
      showNotification("❌ Error deleting", "error");
    }
  };

  const handleCancel = () => {
    setCurrentMachine(emptyMachine);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handlePreview = (url, type) =>
    setPreviewItem({ url, type, visible: true });
  const handleLoadExample = () => setCurrentMachine(exampleMachine);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-violet-600">
          <h1 className="text-3xl font-bold mb-2 text-violet-800">
            Aluminum Machine Manager
          </h1>
          <p className="text-gray-600">
            Manage aluminum window machines with HTML support
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <button
                onClick={() => {
                  setCurrentMachine(emptyMachine);
                  setShowAddModal(true);
                }}
                className="bg-violet-600 text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-violet-700 transition-colors"
              >
                <Plus size={18} className="mr-2" /> Add New Machine
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {machines.map((machine, index) => (
                <div
                  key={machine.id || machine._id || index}
                  className="border rounded-xl p-5 shadow-md bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{machine.name}</h3>
                    <span className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded">
                      {machine.code}
                    </span>
                  </div>

                  {/* Card HTML Render */}
                  <div
                    className="text-gray-700 mb-4 line-clamp-2 text-sm prose prose-xs"
                    dangerouslySetInnerHTML={{
                      __html: machine.description || "No description",
                    }}
                  />

                  {machine.images?.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto mb-4">
                      {machine.images.slice(0, 3).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end gap-2 mt-4 border-t pt-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-violet-100 p-2 rounded-lg text-violet-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-100 p-2 rounded-lg text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500] p-4">
            <MachineForm
              isEdit={false}
              currentMachine={currentMachine}
              handleChange={handleChange}
              handleCancel={handleCancel}
              handleAdd={handleAdd}
              handleSpecChange={handleSpecChange}
              handleSpecKeyUpdate={handleSpecKeyUpdate}
              handleAddSpec={handleAddSpec}
              handleRemoveSpec={handleRemoveSpec}
              handleFaqChange={handleFaqChange}
              handleAddField={handleAddField}
              handleRemoveField={handleRemoveField}
              handleArrayChange={handleArrayChange}
              handleFileUpload={handleFileUpload}
              handlePreview={handlePreview}
              handleLoadExample={handleLoadExample}
              uploading={uploading}
            />
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500] p-4">
            <MachineForm
              isEdit={true}
              currentMachine={currentMachine}
              handleChange={handleChange}
              handleCancel={handleCancel}
              handleSave={handleSave}
              handleSpecChange={handleSpecChange}
              handleSpecKeyUpdate={handleSpecKeyUpdate}
              handleAddSpec={handleAddSpec}
              handleRemoveSpec={handleRemoveSpec}
              handleFaqChange={handleFaqChange}
              handleAddField={handleAddField}
              handleRemoveField={handleRemoveField}
              handleArrayChange={handleArrayChange}
              handleFileUpload={handleFileUpload}
              handlePreview={handlePreview}
              uploading={uploading}
            />
          </div>
        )}

        {saveStatus && (
          <div
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${
              saveStatus.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {saveStatus.message}
          </div>
        )}

        <PreviewModal
          item={previewItem}
          onClose={() => setPreviewItem({ ...previewItem, visible: false })}
        />
      </div>
    </div>
  );
};

export default AdminAluminumWindowMachine;
