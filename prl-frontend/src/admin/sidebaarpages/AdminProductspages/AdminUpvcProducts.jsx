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
} from "lucide-react";

const API_URL = "http://localhost:3000/api/upvcmachines";

// 🔹 NEW: Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = "dr5myqvnp";
const CLOUDINARY_UPLOAD_PRESET = "jaikvik";
// Base URL for Cloudinary API
const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

// (Purana UPLOAD_URL constant hata diya gaya hai)

// ============================================================================
// COMPONENT 1: MachineForm (Koi change nahi)
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
              Description
            </label>
            <textarea
              name="description"
              value={currentMachine.description || ""}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
              className="border p-3 w-full rounded-lg"
            />
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
    	    value={currentMachine.technicalDrawing || ""}
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
    	            value={item.question || ""}
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
    	            value={item.answer || ""}
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
// COMPONENT 2: PreviewModal (Koi change nahi)
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
    technicalDrawingFront: "", // Added to match schema
    technicalDrawingSide: "", // Added to match schema
    faq: [],
    inStock: true, // Added to match schema
  };

  // Example data for uPVC machine
  const exampleMachine = {
    code: "UPVC-WELD-01",
    name: "Automatic uPVC Welding Machine",
    description: "A four-head seamless welding machine for uPVC profiles.",
    images: [
      "https://images.unsplash.com/photo-1579552940218-f6a896d8a8f1?auto=format&fit=crop&w=1350&q=80",
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-a-bended-pvc-pipe-in-a-factory-4421-large.mp4",
    ],
    specifications: {
      "Welding Range": "400-3500mm",
      "Welding Height": "20-120mm",
      "Air Pressure": "0.5-0.8MPa",
      Power: "4.5kW",
    },
    technicalDrawing:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1350&q=80",
    technicalDrawingFront: "",
    technicalDrawingSide: "",
    faq: [
      {
        question: "What is the seam cleaning quality?",
        answer: "The seam is cleaned seamlessly for a perfect finish.",
      },
    ],
    inStock: true,
  };

  const [currentMachine, setCurrentMachine] = useState(emptyMachine);

  useEffect(() => {
    const loadMachines = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URL);
        console.log("Fetched machines:", res.data); // Debug log
        setMachines(res.data || []);
      } catch (error) {
        console.error(
          "Error loading machines:",
          error.response?.data || error.message
        );
        showNotification("Error loading machines", "error");
        setMachines([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadMachines();
  }, []);

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
      if (newKey) {
        updatedSpecs[newKey] = value;
      }
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
      if (value !== null) {
        handleSpecChange(key, value);
      }
    } else if (key) {
      alert("This specification key already exists.");
    }
  };

  const handleRemoveSpec = (key) => {
    setCurrentMachine((prev) => {
      const updatedSpecs = { ...prev.specifications };
      delete updatedSpecs[key];
      return { ...prev, specifications: updatedSpecs };
    });
  };

  // 🔹 UPDATED: handleFileUpload function ab Cloudinary ka istemaal karega
  const handleFileUpload = async (e, field) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);
    showNotification(`Uploading ${files.length} file(s)...`, "info");

    // 'field' "images" ya "videos" hoga
    // Cloudinary ko batayein ki yeh 'image' hai ya 'video'
    const resourceType = field === "images" ? "image" : "video";
    const uploadUrl = `${CLOUDINARY_API_BASE}/${resourceType}/upload`;

    // Har file ko ek-ek karke upload karein
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await axios.post(uploadUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data.secure_url; // Cloudinary se URL prapt karein
      } catch (uploadError) {
        console.error(
          "Error uploading file to Cloudinary:",
          uploadError.response?.data || uploadError.message
        );
        return null; // Failed uploads ko null mark karein
      }
    });

    try {
      // Sabhi uploads poore hone ka intezaar karein
      const uploadedUrls = await Promise.all(uploadPromises);
      const newFiles = uploadedUrls.filter((url) => url !== null); // Failed uploads ko hata dein

      if (newFiles.length > 0) {
        setCurrentMachine((prev) => ({
          ...prev,
          [field]: [...(prev[field] || []), ...newFiles], // Naye URLs ko state mein jodein
        }));
        showNotification(`✅ ${newFiles.length} file(s) uploaded successfully!`);
      }

      if (newFiles.length < files.length) {
        showNotification(
          `❌ Failed to upload ${files.length - newFiles.length} file(s).`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error during file upload process:", error);
      showNotification("An unexpected error occurred during upload.", "error");
    } finally {
      setUploading(false);
      e.target.value = null; // File input ko clear karein
    }
  };

  const handleAdd = async () => {
    if (!currentMachine.name?.trim() || !currentMachine.code?.trim()) {
      showNotification("Machine name and code are required!", "error");
      return;
    }
    try {
      setUploading(true);
      const payload = {
        ...currentMachine,
        specifications: currentMachine.specifications || {},
        faq: currentMachine.faq || [],
        images: currentMachine.images || [], // Ab yeh Cloudinary URLs hain
        videos: currentMachine.videos || [], // Ab yeh Cloudinary URLs hain
        technicalDrawing: currentMachine.technicalDrawing || "",
        technicalDrawingFront: currentMachine.technicalDrawingFront || "",
        technicalDrawingSide: currentMachine.technicalDrawingSide || "",
        inStock: currentMachine.inStock ?? true,
      };
      console.log("Adding machine:", payload); // Debug log
      const res = await axios.post(API_URL, payload);
      setMachines((prev) => [...prev, res.data]);
      handleCancel();
      showNotification("✅ Machine added successfully!");
    } catch (error) {
      console.error(
        "Error adding machine:",
        error.response?.data || error.message
      );
      showNotification(
        `❌ Error adding machine: ${
          error.response?.data?.message || error.message
        }`,
        "error"
      );
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
    if (!currentMachine._id) {
      showNotification("Machine ID is required!", "error");
      return;
    }
    try {
      setUploading(true);
      const payload = {
        ...currentMachine,
        specifications: currentMachine.specifications || {},
        faq: currentMachine.faq || [],
        images: currentMachine.images || [], // Ab yeh Cloudinary URLs hain
        videos: currentMachine.videos || [], // Ab yeh Cloudinary URLs hain
        technicalDrawing: currentMachine.technicalDrawing || "",
        technicalDrawingFront: currentMachine.technicalDrawingFront || "",
        technicalDrawingSide: currentMachine.technicalDrawingSide || "",
        inStock: currentMachine.inStock ?? true,
      };
      console.log("Updating machine:", payload); // Debug log
      const res = await axios.put(`${API_URL}/${currentMachine._id}`, payload);
      const updated = [...machines];
      updated[editingIndex] = res.data;
      setMachines(updated);
      handleCancel();
      showNotification("✅ Machine updated successfully!");
    } catch (error) {
      console.error(
        "Error updating machine:",
        error.response?.data || error.message
      );
      showNotification(
        `❌ Error updating machine: ${
          error.response?.data?.message || error.message
        }`,
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (index) => {
    const machine = machines[index];
    if (!machine._id) {
      showNotification("Machine ID is missing!", "error");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete "${machine.name}"?`))
      return;

    try {
      await axios.delete(`${API_URL}/${machine._id}`);
      setMachines(machines.filter((_, i) => i !== index));
      showNotification("✅ Machine deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting machine:",
        error.response?.data || error.message
      );
      showNotification(
        `❌ Error deleting machine: ${
          error.response?.data?.message || error.message
        }`,
        "error"
      );
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentMachine(emptyMachine);
    setShowAddModal(false);
    setShowEditModal(false);
    setUploading(false);
  };

  const handlePreview = (url, type) => {
    setPreviewItem({ url, type, visible: true });
  };

  const handleLoadExample = () => {
    setCurrentMachine(exampleMachine);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-violet-600">
          <h1 className="text-3xl font-bold mb-2 text-violet-800">
            uPVC Machine Manager
          </h1>
          <p className="text-gray-600">Manage uPVC window machines</p>
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
                className="bg-violet-600 text-white px-6 py-3 rounded-lg flex items-center"
              >
                <Plus size={18} className="mr-2" /> Add New Machine
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-violet-800">
              Machines ({machines.length})
            </h2>
            {machines.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500 mb-4">No machines found</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                >
                  Add Your First Machine
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {machines.map((machine, index) => (
                  <div
                    key={machine._id || index}
                    className="border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">
                        {machine.name || "Unnamed"}
                      </h3>
                      <span className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded">
                        {machine.code || "No Code"}
                      </span>
                    </div>
               <p className="text-gray-700 mb-4 line-clamp-2">
                      {machine.description || "No description"}
                    </p>
                    {machine.images?.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto mb-4">
                        {machine.images.slice(0, 3).map((img, i) => (
                     <img
                            key={i}
                            src={img}
                            alt=""
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-500">
                        {Object.keys(machine.specifications || {}).length} specs
                      </div>
                      <div className="flex gap-2">
              <button
                          onClick={() => handleEdit(index)}
                          className="bg-violet-100 p-2 rounded-lg hover:bg-violet-200"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                      className="bg-red-100 p-2 rounded-lg hover:bg-red-200"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                  	</div>
                  </div>
              	))}
          	  </div>
        	  )}
      	  </>
    	  )}

    	  {/* 🔹 UPDATED: Notification component ab 'info' type (blue) ko support karta hai */}
    	  {saveStatus && (
    	    <div
    	      className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
    	        saveStatus.type === "error"
    	          ? "bg-red-500"
    	          : saveStatus.type === "info"
    	          ? "bg-blue-500"
    	          : "bg-green-500"
    	      } text-white flex items-center`}
    	    >
    	      {saveStatus.message}
    	    </div>
    	  )}

    	  {showAddModal && (
    	    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500] p-4 overflow-y-auto">
    	      <MachineForm
    	        isEdit={false}
    	        currentMachine={currentMachine}
    	        uploading={uploading}
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

  	  {showEditModal && (
  	    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500] p-4 overflow-y-auto">
  	      <MachineForm
  	        isEdit={true}
    	        currentMachine={currentMachine}
    	        uploading={uploading}
    	        handleSave={handleSave}
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