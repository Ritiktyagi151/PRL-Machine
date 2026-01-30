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
  FileDown,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;

// 🔹 Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = "dr5myqvnp";
const CLOUDINARY_UPLOAD_PRESET = "jaikvik";
const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

// ============================================================================
// COMPONENT 1: MachineForm
// ============================================================================
const MachineForm = memo(
  ({
    isEdit = false,
    currentMachine,
    uploading,
    handleChange,
    handleSave,
    handleAdd,
    handleCancel,
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
  }) => {
    return (
      <div className="bg-white rounded-xl max-h-[85vh] overflow-y-auto shadow-md p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-violet-700">
            {isEdit ? "Edit uPVC Machine" : "Add New uPVC Machine"}
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
              <label className="block text-sm font-medium mb-1">Code *</label>
              <input
                type="text"
                name="code"
                value={currentMachine.code || ""}
                onChange={handleChange}
                placeholder="Machine Code"
                className="border p-3 rounded-lg w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={currentMachine.name || ""}
                onChange={handleChange}
                placeholder="Machine Name"
                className="border p-3 rounded-lg w-full"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description (HTML Supported)
            </label>
            <textarea
              name="description"
              value={currentMachine.description || ""}
              onChange={handleChange}
              placeholder="You can use HTML tags like <b>, <i>, <ul>, <li> etc."
              rows="5"
              className="border p-3 w-full rounded-lg font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1 italic">
              Example: &lt;b&gt;High Speed&lt;/b&gt; &lt;ul&gt;&lt;li&gt;Feature
              1&lt;/li&gt;&lt;/ul&gt;
            </p>
          </div>

          {/* Images Section */}
          <div className="mb-4 border-b pb-4">
            <label className="block text-sm font-medium mb-2 flex items-center">
              <ImageIcon size={16} className="mr-1" /> Product Images (Upload or
              URL)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {currentMachine.images?.map((img, i) => (
                <div key={`image-${i}`} className="relative border rounded p-2">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) =>
                      handleArrayChange(i, "images", e.target.value)
                    }
                    placeholder="Image URL"
                    className="border p-1 text-xs w-full mb-1"
                  />
                  <div className="relative h-20 bg-gray-50 flex items-center justify-center overflow-hidden rounded">
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-gray-300" />
                    )}
                    <button
                      onClick={() => handleRemoveField("images", i)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="flex-1 border-2 border-dashed p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-50 transition-colors">
                <Upload size={16} className="mr-2" /> Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "images")}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => handleAddField("images")}
                className="px-4 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-600 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Videos Section */}
          <div className="mb-4 border-b pb-4">
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Video size={16} className="mr-1" /> Product Videos (Upload or
              URL)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {currentMachine.videos?.map((vid, i) => (
                <div key={`video-${i}`} className="border rounded p-2">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={vid}
                      onChange={(e) =>
                        handleArrayChange(i, "videos", e.target.value)
                      }
                      placeholder="Video URL"
                      className="border p-1 text-xs flex-1"
                    />
                    <button
                      onClick={() => handleRemoveField("videos", i)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {vid && (
                    <video
                      src={vid}
                      className="h-20 w-full object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="flex-1 border-2 border-dashed p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-50 transition-colors">
                <Upload size={16} className="mr-2" /> Upload Videos
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e, "videos")}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => handleAddField("videos")}
                className="px-4 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-600 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Brochure/PDF Section */}
          <div className="mb-4 border-b pb-4">
            <label className="block text-sm font-medium mb-2 flex items-center">
              <FileDown size={16} className="mr-1" /> PDF Brochure / Catalog
              (Upload or URL)
            </label>
            <div className="space-y-2 mb-3">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="brochureUrl"
                  value={currentMachine.brochureUrl || ""}
                  onChange={handleChange}
                  placeholder="Enter PDF URL or Upload below"
                  className="border p-3 flex-1 rounded-lg"
                />
                {currentMachine.brochureUrl && (
                  <a
                    href={currentMachine.brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-gray-100 rounded-lg text-violet-600"
                  >
                    <Eye size={20} />
                  </a>
                )}
              </div>
              <label className="border-2 border-dashed p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-50 transition-colors">
                <Upload size={16} className="mr-2" /> Upload PDF Brochure
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileUpload(e, "brochureUrl")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Technical Drawings Section */}
          <div className="mb-4 border-b pb-4">
            <label className="block text-sm font-medium mb-2 flex items-center">
              <ImageIcon size={16} className="mr-1" /> Technical Drawings
              (Upload or URL)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "technicalDrawing",
                "technicalDrawingFront",
                "technicalDrawingSide",
              ].map((field) => (
                <div key={field} className="space-y-2">
                  <span className="text-xs font-semibold uppercase text-gray-500">
                    {field.replace("technicalDrawing", "") || "Main"} View
                  </span>
                  <input
                    type="text"
                    name={field}
                    value={currentMachine[field] || ""}
                    onChange={handleChange}
                    placeholder="URL"
                    className="border p-2 text-xs w-full rounded"
                  />
                  <label className="border border-dashed p-2 rounded flex items-center justify-center cursor-pointer text-xs hover:bg-gray-50">
                    <Upload size={12} className="mr-1" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, field)}
                      className="hidden"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-4 border-b pb-4">
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
                      placeholder="Key (e.g. Power)"
                      onChange={(e) => handleSpecKeyUpdate(key, e.target.value)}
                      className="border p-2 flex-1 rounded"
                    />
                    <input
                      type="text"
                      value={value}
                      placeholder="Value (e.g. 5kW)"
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
                ),
              )}
            </div>
            <button
              onClick={handleAddSpec}
              className="text-violet-600 hover:text-violet-800 flex items-center text-sm font-medium"
            >
              <Plus size={16} className="mr-1" /> Add Specification
            </button>
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
                  className="border p-3 rounded-lg relative bg-gray-50"
                >
                  <div className="mb-2">
                    <input
                      type="text"
                      value={item.question || ""}
                      placeholder="Question"
                      onChange={(e) =>
                        handleFaqChange(i, "question", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <div>
                    <textarea
                      value={item.answer || ""}
                      placeholder="Answer"
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
              className="text-violet-600 hover:text-violet-800 flex items-center text-sm font-medium"
            >
              <Plus size={16} className="mr-1" /> Add FAQ Item
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4 border-t">
          {!isEdit && (
            <button
              onClick={handleLoadExample}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg"
            >
              Load Example
            </button>
          )}
          <button
            onClick={handleCancel}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg flex items-center"
          >
            <X size={18} className="mr-2" /> Cancel
          </button>
          <button
            onClick={isEdit ? handleSave : handleAdd}
            className="bg-violet-600 text-white px-6 py-3 rounded-lg flex items-center"
            disabled={uploading}
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {isEdit ? "Save Changes" : "Add Machine"}
          </button>
        </div>
      </div>
    );
  },
);
MachineForm.displayName = "MachineForm";

// ============================================================================
// COMPONENT 2: PreviewModal
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
const AdminUpvcWindowMachine = () => {
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
    code: "",
    name: "",
    description: "",
    images: [],
    videos: [],
    specifications: {},
    technicalDrawing: "",
    technicalDrawingFront: "",
    technicalDrawingSide: "",
    brochureUrl: "",
    faq: [],
    inStock: true,
  };

  const [currentMachine, setCurrentMachine] = useState(emptyMachine);

  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setMachines(res.data || []);
    } catch (error) {
      showNotification("Error loading machines", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setSaveStatus({ message, type });
    setTimeout(() => setSaveStatus(null), 5000);
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
    if (oldKey === newKey) return;
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
    setCurrentMachine((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddSpec = () => {
    const key = prompt("Enter specification key:");
    if (key && !currentMachine.specifications?.[key]) {
      const value = prompt(`Enter value for ${key}:`);
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

  const handleFileUpload = async (e, field) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);
    showNotification(`Uploading...`, "info");

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      // Resource type determination
      let resourceType = "image";
      if (file.type.includes("video")) resourceType = "video";
      if (file.type.includes("pdf")) resourceType = "raw"; // Cloudinary uses 'raw' for PDFs

      try {
        const res = await axios.post(
          `${CLOUDINARY_API_BASE}/${resourceType}/upload`,
          formData,
        );
        return res.data.secure_url;
      } catch (err) {
        console.error("Cloudinary Error:", err);
        return null;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUrls = uploadedUrls.filter((u) => u !== null);

      if (successfulUrls.length > 0) {
        setCurrentMachine((prev) => {
          if (Array.isArray(prev[field])) {
            return { ...prev, [field]: [...prev[field], ...successfulUrls] };
          } else {
            // For single fields like brochureUrl, technicalDrawing etc.
            return { ...prev, [field]: successfulUrls[0] };
          }
        });
        showNotification("Uploaded successfully!");
      }
    } catch (error) {
      showNotification("Upload failed", "error");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleAdd = async () => {
    if (!currentMachine.name?.trim() || !currentMachine.code?.trim()) {
      showNotification("Name and code are required!", "error");
      return;
    }
    try {
      setUploading(true);
      const res = await axios.post(API_URL, currentMachine);
      setMachines((prev) => [...prev, res.data]);
      handleCancel();
      showNotification("Machine added!");
    } catch (error) {
      showNotification("Error adding machine", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentMachine({ ...machines[index] });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      setUploading(true);
      const res = await axios.put(
        `${API_URL}/${currentMachine._id}`,
        currentMachine,
      );
      const updated = [...machines];
      updated[editingIndex] = res.data;
      setMachines(updated);
      handleCancel();
      showNotification("Machine updated!");
    } catch (error) {
      showNotification("Error updating machine", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete this machine?")) return;
    try {
      await axios.delete(`${API_URL}/${machines[index]._id}`);
      setMachines(machines.filter((_, i) => i !== index));
      showNotification("Deleted successfully!");
    } catch (error) {
      showNotification("Delete failed", "error");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentMachine(emptyMachine);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handlePreview = (url, type) =>
    setPreviewItem({ url, type, visible: true });
  const handleLoadExample = () =>
    setCurrentMachine({
      ...emptyMachine,
      code: "UPVC-EX-01",
      name: "Example Machine",
      description: "<b>Powerful</b> welding machine.",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-violet-600">
          <h1 className="text-3xl font-bold mb-2 text-violet-800">
            uPVC Machine Manager
          </h1>
          <p className="text-gray-600">
            Manage machines, brochures, and technical drawings.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setCurrentMachine(emptyMachine);
                setShowAddModal(true);
              }}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg flex items-center mb-8"
            >
              <Plus size={18} className="mr-2" /> Add New Machine
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {machines.map((machine, index) => (
                <div
                  key={machine._id || index}
                  className="border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{machine.name}</h3>
                    <span className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded">
                      {machine.code}
                    </span>
                  </div>
                  <div
                    className="text-gray-700 mb-4 line-clamp-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: machine.description }}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-violet-100 p-2 rounded-lg hover:bg-violet-200"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-100 p-2 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {saveStatus && (
          <div
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[1000] text-white ${saveStatus.type === "error" ? "bg-red-500" : "bg-green-500"}`}
          >
            {saveStatus.message}
          </div>
        )}

        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500] p-4 overflow-y-auto">
            <MachineForm
              isEdit={showEditModal}
              currentMachine={currentMachine}
              uploading={uploading}
              handleSave={handleSave}
              handleAdd={handleAdd}
              handleCancel={handleCancel}
              handleChange={handleChange}
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
            />
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

export default AdminUpvcWindowMachine;
