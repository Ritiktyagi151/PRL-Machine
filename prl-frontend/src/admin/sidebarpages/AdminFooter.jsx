import React, { useState, useEffect } from "react";
import axios from "axios";

// 🔹 FIX: API_URL ko component se bahar move kiya
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/footer`;

export default function FooterManager() {
  // 🔹 States
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });
  const [editingSection, setEditingSection] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // 🔹 Fetch Footer Data

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = () => {
    setLoading(true);
    setError("");
    axios
      .get(API_URL) // 🔹 FIX: API_URL ab constant hai
      .then((res) => {
        const data = res.data;
        setLogo(data.logo || "");
        setDescription(data.description || ""); // 🔹 FIX: socialLinks ko normalize karein. // Yeh API se 'icon' ya 'name' kuch bhi aaye, use 'name' mein badal dega jo aapka modal expect karta hai.

        const normalizedSocials = (data.socialLinks || []).map((link) => ({
          name: link.name || link.icon || "",
          link: link.link || "#",
        }));
        setSocialLinks(normalizedSocials);

        setQuickLinks(data.quickLinks || []); // 🔹 FIX: contactInfo ko merge karein taaki koi field missing na ho

        const defaultContact = { address: "", phone: "", email: "" };
        setContactInfo({ ...defaultContact, ...(data.contactInfo || {}) });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching footer:", err);
        setError(
          "Failed to load footer data. Please check if the server is running."
        );
        setLoading(false);
      });
  }; // 🔹 Save Footer Data

  const handleSave = () => {
    setError(""); // 🔹 FIX: Ab socialLinks hamesha { name: "...", link: "..." } format mein save honge
    // Taaki frontend 'name' ko 'icon' ki tarah render kar sake
    const payload = { logo, description, socialLinks, quickLinks, contactInfo };

    axios
      .put(API_URL, payload) // 🔹 FIX: API_URL ab constant hai
      .then(() => {
        setEditingSection(null);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      })
      .catch((err) => {
        console.error("Error saving footer:", err);
        setError("Failed to save changes. Please try again.");
      });
  }; // 🔹 Reset to Default

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all footer data to default?"
      )
    ) {
      setError("");
      axios
        .delete(API_URL) // 🔹 FIX: API_URL ab constant hai
        .then(() => {
          fetchFooterData();
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        })
        .catch((err) => {
          console.error("Error resetting footer:", err);
          setError("Failed to reset data. Please try again.");
        });
    }
  }; // 🔹 Loading State

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-red-50">
               {" "}
        <div className="text-center">
                   {" "}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600 mx-auto mb-4"></div>
                   {" "}
          <p className="text-gray-700 text-lg font-medium">Loading Footer...</p>
                 {" "}
        </div>
             {" "}
      </div>
    );
  } // 🔹 Modal Renderer

  const renderModal = () => {
    if (!editingSection) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm">
               {" "}
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-violet-500 transform scale-95 animate-scaleIn">
                   {" "}
          <h2 className="text-2xl font-bold mb-4 text-violet-800">
                        Edit {editingSection}         {" "}
          </h2>
                    {/* Logo Edit */}         {" "}
          {editingSection === "logo" && (
            <div className="space-y-3">
                           {" "}
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="Logo URL"
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
                           {" "}
              <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                               {" "}
                <p className="text-sm text-gray-600 mb-2">Preview:</p>         
                     {" "}
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-16 mx-auto border rounded-lg p-2 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150x80?text=Invalid+URL";
                  }}
                />
                             {" "}
              </div>
                       {" "}
            </div>
          )}
                    {/* Description Edit */}         {" "}
          {editingSection === "description" && (
            <div className="space-y-3">
                           {" "}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Footer description"
                rows="6"
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
                       {" "}
            </div>
          )}
                    {/* Social Links Edit */}         {" "}
          {editingSection === "socialLinks" && (
            <div className="space-y-4">
                           {" "}
              {socialLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="space-y-3 border-2 border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-white transition-colors"
                >
                                   {" "}
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[idx].name = e.target.value;
                      setSocialLinks(updated);
                    }}
                    placeholder="Platform Name (e.g., facebook)"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                                   {" "}
                  <input
                    type="text"
                    value={link.link}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[idx].link = e.target.value;
                      setSocialLinks(updated);
                    }}
                    placeholder="URL"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                                   {" "}
                  <button
                    onClick={() =>
                      setSocialLinks(socialLinks.filter((_, i) => i !== idx))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors w-full"
                  >
                                        Delete                {" "}
                  </button>
                                 {" "}
                </div>
              ))}
                           {" "}
              <button
                onClick={() =>
                  setSocialLinks([...socialLinks, { name: "", link: "" }])
                }
                className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-3 rounded-lg transition-colors w-full"
              >
                                + Add New Social Link            {" "}
              </button>
                         {" "}
            </div>
          )}
                    {/* Quick Links Edit */}         {" "}
          {editingSection === "quickLinks" && (
            <div className="space-y-4">
                           {" "}
              {quickLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="space-y-3 border-2 border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-white transition-colors"
                >
                                 {" "}
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const updated = [...quickLinks];
                      updated[idx].name = e.target.value;
                      setQuickLinks(updated);
                    }}
                    placeholder="Link Name"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                                 {" "}
                  <input
                    type="text"
                    value={link.link}
                    onChange={(e) => {
                      const updated = [...quickLinks];
                      updated[idx].link = e.target.value;
                      setQuickLinks(updated);
                    }}
                    placeholder="URL"
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                                 {" "}
                  <button
                    onClick={() =>
                      setQuickLinks(quickLinks.filter((_, i) => i !== idx))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors w-full"
                  >
                                      Delete                {" "}
                  </button>
                             {" "}
                </div>
              ))}
                         {" "}
              <button
                onClick={() =>
                  setQuickLinks([...quickLinks, { name: "", link: "" }])
                }
                className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-3 rounded-lg transition-colors w-full"
              >
                            + Add New Quick Link            {" "}
              </button>
                       {" "}
            </div>
          )}
                  {/* Contact Info Edit */}       {" "}
          {editingSection === "contactInfo" && (
            <div className="space-y-4">
                         {" "}
              <div>
                             {" "}
                <label className="block text-gray-700 mb-1">Address</label>     
                       {" "}
                <textarea
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
                  }
                  placeholder="Address"
                  rows="3"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                           {" "}
              </div>
                         {" "}
              <div>
                             {" "}
                <label className="block text-gray-700 mb-1">Phone</label>       
                     {" "}
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  placeholder="Phone"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                           {" "}
              </div>
                         {" "}
              <div>
                             {" "}
                <label className="block text-gray-700 mb-1">Email</label>       
                     {" "}
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="Email"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                           {" "}
              </div>
                       {" "}
            </div>
          )}
                  {/* Buttons */}       {" "}
          <div className="flex justify-end gap-3 mt-6">
                     {" "}
            <button
              onClick={() => setEditingSection(null)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
            >
                          Cancel          {" "}
            </button>
                     {" "}
            <button
              onClick={handleSave}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
            >
                          Save Changes          {" "}
            </button>
                   {" "}
          </div>
               {" "}
        </div>
           {" "}
      </div>
    );
  }; // 🔹 Save Notification

  const SaveConfirmation = () => {
    if (!isSaved) return null;
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
              ✅ Changes saved successfully!    {" "}
      </div>
    );
  }; // 🔹 Error Notification

  const ErrorNotification = () => {
    if (!error) return null;
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
              ❌ {error}   {" "}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
           {" "}
      <div className="max-w-4xl mx-auto">
               {" "}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-violet-600 animate-fadeIn">
                   {" "}
          <div className="flex justify-between items-center">
                     {" "}
            <div>
                         {" "}
              <h1 className="text-3xl font-bold mb-2 text-violet-800">
                              Footer Manager            {" "}
              </h1>
                         {" "}
              <p className="text-gray-600">Customize your website's footer</p> 
                     {" "}
            </div>
                     {" "}
            <div className="flex gap-2">
                         {" "}
              <button
                onClick={fetchFooterData}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
              >
                            Refresh            {" "}
              </button>
                         {" "}
              <button
                onClick={handleReset}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                            Reset to Default            {" "}
              </button>
                       {" "}
            </div>
                   {" "}
          </div>
               {" "}
        </div>
              {/* Logo */}     {" "}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
                 {" "}
          <div className="flex justify-between items-center mb-4">
                     {" "}
            <h2 className="text-xl font-bold text-violet-700">Logo</h2>         {" "}
            <button
              onClick={() => setEditingSection("logo")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
                        Edit Logo        {" "}
            </button>
                   {" "}
          </div>
                 {" "}
          <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
                     {" "}
            <img
              src={logo}
              alt="Logo"
              className="h-20 object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150x80?text=Invalid+URL";
              }}
            />
                   {" "}
          </div>
               {" "}
        </div>
              {/* Description */}     {" "}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
                 {" "}
          <div className="flex justify-between items-center mb-4">
                     {" "}
            <h2 className="text-xl font-bold text-violet-700">Description</h2> 
                   {" "}
            <button
              onClick={() => setEditingSection("description")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
                        Edit Description        {" "}
            </button>
                   {" "}
          </div>
                 {" "}
          <div className="p-4 bg-violet-50 rounded-lg border-l-4 border-violet-500">
                      <p>{description || "No description set"}</p>       {" "}
          </div>
               {" "}
        </div>
              {/* Social Links */}     {" "}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
                 {" "}
          <div className="flex justify-between items-center mb-4">
                     {" "}
            <h2 className="text-xl font-bold text-violet-700">Social Links</h2> 
                   {" "}
            <button
              onClick={() => setEditingSection("socialLinks")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
                        Edit Social Links        {" "}
            </button>
                   {" "}
          </div>
                 {" "}
          <div className="overflow-x-auto">
                     {" "}
            {socialLinks.length > 0 ? (
              <table className="w-full border-collapse">
                             {" "}
                <thead>
                                 {" "}
                  <tr className="bg-violet-100">
                                     {" "}
                    <th className="border-2 border-violet-200 p-3 text-left text-violet-700">
                                          Platform                  {" "}
                    </th>
                                     {" "}
                    <th className="border-2 border-violet-200 p-3 text-left text-violet-700">
                                          URL                  {" "}
                    </th>
                                   {" "}
                  </tr>
                               {" "}
                </thead>
                             {" "}
                <tbody>
                                 {" "}
                  {socialLinks.map((item, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-violet-50 hover:bg-violet-100 transition-colors"
                    >
                                       {" "}
                      <td className="border-2 border-violet-100 p-3">
                                              {item.name}                   {" "}
                      </td>
                                         {" "}
                      <td className="border-2 border-violet-100 p-3 truncate max-w-xs">
                                              {item.link}                   {" "}
                      </td>
                                       {" "}
                    </tr>
                  ))}
                               {" "}
                </tbody>
                           {" "}
              </table>
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                              No social links added yet            {" "}
              </div>
            )}
                   {" "}
          </div>
               {" "}
        </div>
              {/* Quick Links */}     {" "}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
                 {" "}
          <div className="flex justify-between items-center mb-4">
                     {" "}
            <h2 className="text-xl font-bold text-violet-700">Quick Links</h2> 
                   {" "}
            <button
              onClick={() => setEditingSection("quickLinks")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
                        Edit Quick Links        {" "}
            </button>
                 {" "}
          </div>
                 {" "}
          <div className="overflow-x-auto">
                     {" "}
            {quickLinks.length > 0 ? (
              <table className="w-full border-collapse">
                             {" "}
                <thead>
                                 {" "}
                  <tr className="bg-red-100">
                                     {" "}
                    <th className="border-2 border-red-200 p-3 text-left text-red-700">
                                          Link Name                  {" "}
                    </th>
                                     {" "}
                    <th className="border-2 border-red-200 p-3 text-left text-red-700">
                                          URL                {" "}
                    </th>
                                   {" "}
                  </tr>
                             {" "}
                </thead>
                             {" "}
                <tbody>
                                 {" "}
                  {quickLinks.map((item, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-red-50 hover:bg-red-100 transition-colors"
                    >
                                         {" "}
                      <td className="border-2 border-red-100 p-3">
                                              {item.name}                   {" "}
                      </td>
                                         {" "}
                      <td className="border-2 border-red-100 p-3 truncate max-w-xs">
                                              {item.link}                   {" "}
                      </td>
                                       {" "}
                    </tr>
                  ))}
                               {" "}
                </tbody>
                           {" "}
              </table>
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                              No quick links added yet            {" "}
              </div>
            )}
                   {" "}
          </div>
               {" "}
        </div>
              {/* Contact Info */}     {" "}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
                 {" "}
          <div className="flex justify-between items-center mb-4">
                     {" "}
            <h2 className="text-xl font-bold text-violet-700">Contact Info</h2> 
                   {" "}
            <button
              onClick={() => setEditingSection("contactInfo")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
              s
            >
                        Edit Contact Info          {" "}
            </button>
                   {" "}
          </div>
                 {" "}
          <div className="grid md:grid-cols-2 gap-4">
                     {" "}
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <p className="font-semibold text-red-700">Address</p> 
                        <p>{contactInfo.address || "Not set"}</p>         {" "}
            </div>
                     {" "}
            <div className="p-4 bg-violet-50 rounded-lg border-l-4 border-violet-500">
                          <p className="font-semibold text-violet-700">Phone</p>
                          <p>{contactInfo.phone || "Not set"}</p>         {" "}
            </div>
                     {" "}
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500 md:col-span-2">
                          <p className="font-semibold text-red-700">Email</p>   
                      <p>{contactInfo.email || "Not set"}</p>         {" "}
            </div>
                   {" "}
          </div>
               {" "}
        </div>
              {renderModal()}
              <SaveConfirmation />
              <ErrorNotification />   {" "}
      </div>
         {" "}
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
       {" "}
    </div>
  );
}
