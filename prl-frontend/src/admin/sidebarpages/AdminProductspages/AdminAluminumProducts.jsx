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
  FileDown,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/aluminum-machines`;

// 🔹 Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = "dr5myqvnp";
const CLOUDINARY_UPLOAD_PRESET = "jaikvik";
const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

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
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-xl font-bold text-violet-700">
            {isEdit ? "Edit Aluminum Machine" : "Add New Aluminum Machine"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid gap-6 mt-4">
          {/* Basic Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID *</label>
              <input
                type="text"
                name="id"
                value={currentMachine.id}
                onChange={handleChange}
                placeholder="Unique ID"
                className="border p-3 rounded-lg w-full bg-gray-50"
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

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium flex items-center">
                <Code size={16} className="mr-1" /> Description (HTML)
              </label>
              <button
                type="button"
                onClick={() => setShowHtmlPreview(!showHtmlPreview)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border"
              >
                {showHtmlPreview ? "Show Editor" : "Preview"}
              </button>
            </div>
            {showHtmlPreview ? (
              <div
                className="border p-3 w-full rounded-lg min-h-[150px] bg-gray-50 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    currentMachine.description || "<i>No preview available</i>",
                }}
              />
            ) : (
              <textarea
                name="description"
                value={currentMachine.description}
                onChange={handleChange}
                rows="5"
                className="border p-3 w-full rounded-lg font-mono text-sm"
              />
            )}
          </div>

          {/* Images Section */}
          <div className="border p-4 rounded-xl bg-gray-50/50">
            <label className="block text-sm font-bold mb-3 flex items-center text-gray-700">
              <ImageIcon size={18} className="mr-2 text-violet-600" /> Images
              (URL or Upload)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {currentMachine.images?.map((img, i) => (
                <div
                  key={i}
                  className="group relative border rounded-lg bg-white p-1 shadow-sm"
                >
                  <input
                    type="text"
                    value={img}
                    onChange={(e) =>
                      handleArrayChange(i, "images", e.target.value)
                    }
                    className="border-b w-full text-[10px] mb-1 p-1 outline-none"
                    placeholder="Image URL"
                  />
                  <div className="h-20 overflow-hidden rounded relative">
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      onClick={() => handleRemoveField("images", i)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
                <Upload size={16} className="inline mr-2" />{" "}
                <span className="text-sm">Upload New Images</span>
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
                className="bg-white border border-violet-600 text-violet-600 px-4 rounded-lg"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="border p-4 rounded-xl bg-gray-50/50">
            <label className="block text-sm font-bold mb-3 flex items-center text-gray-700">
              <Video size={18} className="mr-2 text-violet-600" /> Videos (URL
              or Upload)
            </label>
            <div className="space-y-2 mb-3">
              {currentMachine.videos?.map((vid, i) => (
                <div
                  key={i}
                  className="flex gap-2 items-center bg-white p-2 border rounded-lg shadow-sm"
                >
                  <input
                    type="text"
                    value={vid}
                    onChange={(e) =>
                      handleArrayChange(i, "videos", e.target.value)
                    }
                    className="flex-1 text-sm outline-none"
                    placeholder="Video URL"
                  />
                  <button
                    onClick={() => handleRemoveField("videos", i)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
                <Upload size={16} className="inline mr-2" />{" "}
                <span className="text-sm">Upload Video</span>
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
                className="bg-white border border-violet-600 text-violet-600 px-4 rounded-lg"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Brochure/PDF Section */}
          <div className="border p-4 rounded-xl bg-gray-50/50">
            <label className="block text-sm font-bold mb-3 flex items-center text-gray-700">
              <FileDown size={18} className="mr-2 text-violet-600" /> Machine
              PDF Brochure
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                name="brochureUrl"
                value={currentMachine.brochureUrl || ""}
                onChange={handleChange}
                placeholder="Enter PDF Brochure URL"
                className="flex-1 border p-3 rounded-lg bg-white shadow-sm"
              />
              {currentMachine.brochureUrl && (
                <a
                  href={currentMachine.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-violet-100 rounded-lg text-violet-700"
                >
                  <Eye size={20} />
                </a>
              )}
            </div>
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all block">
              <Upload size={16} className="inline mr-2" /> Upload PDF File
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, "brochureUrl")}
                className="hidden"
              />
            </label>
          </div>

          {/* Technical Drawings */}
          <div className="border p-4 rounded-xl">
            <label className="block text-sm font-bold mb-3 text-gray-700">
              Technical Drawings (Views)
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "technicalDrawing",
                "technicalDrawingFront",
                "technicalDrawingSide",
              ].map((field) => (
                <div key={field} className="bg-gray-50 p-3 rounded-lg border">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    {field.replace("technicalDrawing", "") || "Main View"}
                  </span>
                  <input
                    type="text"
                    name={field}
                    value={currentMachine[field] || ""}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full text-xs p-1 border-b mb-2 bg-transparent outline-none"
                  />
                  <label className="flex items-center justify-center gap-1 border border-dashed p-2 rounded text-xs cursor-pointer hover:bg-white transition-colors">
                    <Upload size={12} /> Upload
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

          {/* Specs & FAQ */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-xl">
              <label className="block text-sm font-bold mb-3 flex items-center">
                <FileText size={16} className="mr-2" /> Specifications
              </label>
              <div className="space-y-2 mb-4">
                {Object.entries(currentMachine.specifications || {}).map(
                  ([key, value], i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) =>
                          handleSpecKeyUpdate(key, e.target.value)
                        }
                        className="border p-2 text-xs flex-1 rounded"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSpecChange(key, e.target.value)}
                        className="border p-2 text-xs flex-1 rounded"
                      />
                      <button
                        onClick={() => handleRemoveSpec(key)}
                        className="text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ),
                )}
              </div>
              <button
                onClick={handleAddSpec}
                className="text-violet-600 text-sm font-bold flex items-center"
              >
                <Plus size={14} className="mr-1" /> Add Spec
              </button>
            </div>

            <div className="border p-4 rounded-xl">
              <label className="block text-sm font-bold mb-3 flex items-center">
                <FileText size={16} className="mr-2" /> FAQ
              </label>
              <div className="space-y-3 mb-4">
                {currentMachine.faq?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-2 rounded border relative"
                  >
                    <input
                      value={item.question}
                      onChange={(e) =>
                        handleFaqChange(i, "question", e.target.value)
                      }
                      className="w-full text-xs p-1 mb-1 border-b"
                      placeholder="Question"
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) =>
                        handleFaqChange(i, "answer", e.target.value)
                      }
                      className="w-full text-xs p-1 h-12"
                      placeholder="Answer"
                    />
                    <button
                      onClick={() => handleRemoveField("faq", i)}
                      className="absolute top-1 right-1 text-red-400"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleAddField("faq")}
                className="text-violet-600 text-sm font-bold flex items-center"
              >
                <Plus size={14} className="mr-1" /> Add FAQ
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 border-t pt-6 sticky bottom-0 bg-white z-10">
          {!isEdit && (
            <button
              onClick={handleLoadExample}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium"
            >
              Load Example
            </button>
          )}
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleSave : handleAdd}
            className="bg-violet-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg flex items-center"
            disabled={uploading}
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {isEdit ? "Update Machine" : "Save Machine"}
          </button>
        </div>
      </div>
    );
  },
);
MachineForm.displayName = "MachineForm";

// ============================================================================
// MOVED COMPONENT 2: PreviewModal
// ============================================================================
const PreviewModal = ({ item, onClose }) => {
  if (!item.visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[600] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-4 max-w-4xl max-h-[90vh] overflow-auto shadow-2xl">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex justify-center">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt="Preview"
              className="max-h-[70vh] rounded-lg object-contain"
            />
          ) : (
            <video
              src={item.url}
              controls
              autoPlay
              className="max-h-[70vh] rounded-lg"
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
    technicalDrawingFront: "",
    technicalDrawingSide: "",
    brochureUrl: "",
    faq: [],
    inStock: true,
  };

  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setMachines(res.data || []);
    } catch (error) {
      showNotification("Error loading data", "error");
    } finally {
      setIsLoading(false);
    }
  };

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
    const key = prompt("Key:");
    if (key) {
      const val = prompt("Value:");
      if (val !== null) handleSpecChange(key, val);
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
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    showNotification("Uploading...", "info");

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      let resourceType = "image";
      if (file.type.includes("video")) resourceType = "video";
      if (file.type.includes("pdf")) resourceType = "raw";

      try {
        const res = await axios.post(
          `${CLOUDINARY_API_BASE}/${resourceType}/upload`,
          formData,
        );
        return res.data.secure_url;
      } catch (err) {
        return null;
      }
    });

    try {
      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter((u) => u !== null);
      if (validUrls.length > 0) {
        setCurrentMachine((prev) => {
          if (Array.isArray(prev[field])) {
            return { ...prev, [field]: [...prev[field], ...validUrls] };
          }
          return { ...prev, [field]: validUrls[0] };
        });
        showNotification("Uploaded!");
      }
    } catch (e) {
      showNotification("Upload failed", "error");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleAdd = async () => {
    if (!currentMachine.id.trim() || !currentMachine.name.trim())
      return showNotification("ID/Name required", "error");
    try {
      const res = await axios.post(API_URL, currentMachine);
      setMachines((prev) => [...prev, res.data]);
      handleCancel();
      showNotification("✅ Added!");
    } catch (e) {
      showNotification("Error adding", "error");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentMachine({ ...machines[index] });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/${currentMachine.id || currentMachine._id}`,
        currentMachine,
      );
      const updated = [...machines];
      updated[editingIndex] = res.data;
      setMachines(updated);
      handleCancel();
      showNotification("✅ Updated!");
    } catch (e) {
      showNotification("Update error", "error");
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(
        `${API_URL}/${machines[index].id || machines[index]._id}`,
      );
      setMachines((prev) => prev.filter((_, i) => i !== index));
      showNotification("Deleted!");
    } catch (e) {
      showNotification("Delete failed", "error");
    }
  };

  const [currentMachine, setCurrentMachine] = useState(emptyMachine);
  const handleCancel = () => {
    setCurrentMachine(emptyMachine);
    setShowAddModal(false);
    setShowEditModal(false);
  };
  const handlePreview = (url, type) =>
    setPreviewItem({ url, type, visible: true });
  const handleLoadExample = () =>
    setCurrentMachine({
      ...emptyMachine,
      id: "ALU-101",
      code: "AL-EX",
      name: "Example Aluminum Machine",
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Aluminum Machines
            </h1>
            <p className="text-gray-500 font-medium">
              Control inventory and technical documentation
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentMachine(emptyMachine);
              setShowAddModal(true);
            }}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-200"
          >
            Add Machine
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-violet-100 border-t-violet-600"></div>
            <p className="text-gray-400 font-bold animate-pulse">
              Loading Machines...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine, index) => (
              <div
                key={machine._id || index}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-violet-50 text-violet-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                    {machine.code}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 bg-gray-50 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {machine.name}
                </h3>
                <div
                  className="text-xs text-gray-400 line-clamp-2 h-8"
                  dangerouslySetInnerHTML={{ __html: machine.description }}
                />
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {machine.images?.slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover bg-gray-100"
                      />
                    ))}
                    {machine.images?.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">
                        +{machine.images.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-gray-300">
                    ID: {machine.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[500] p-4">
            <MachineForm
              isEdit={showEditModal}
              currentMachine={currentMachine}
              handleChange={handleChange}
              handleCancel={handleCancel}
              handleSave={handleSave}
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

        {saveStatus && (
          <div
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50 text-white font-bold animate-bounce ${saveStatus.type === "error" ? "bg-red-600" : "bg-gray-900"}`}
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
