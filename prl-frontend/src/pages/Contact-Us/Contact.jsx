import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    contactInfo: { address: "", phone: "", email: "", hours: "" },
    mapEmbed: "",
  });
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch dynamic contact information and map embed URL
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/site-config`);
        if (!res.ok) {
          throw new Error("Failed to fetch page data");
        }
        const { data } = await res.json();
        if (data) {
          setPageData({
            contactInfo: data.contactInfo,
            mapEmbed: data.mapEmbed,
          });
        }
      } catch (error) {
        console.error("Failed to fetch page data:", error);
        // Fallback to static data in case of API failure
        setPageData({
          contactInfo: {
            address: `PARIDA RED LION INDIA PVT LTD\nGST NO - 09AAJCP6402H1ZC\nAddress - Plot No-106, Ecotec -3\nUdhyog Kendra-1, Greater Noida\nGautambuddha Nagar, Uttar Pradesh, 201306`,
            phone: "+91 7065500903",
            email: "r.k.parida015@gmail.com",
            hours:
              "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
          },
          mapEmbed:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.460614844185!2d77.45302757528562!3d28.543353075713554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9fb029d8a63%3A0x54c98e8d30aca0d6!2sPRL%20uPVC%20MACHINE%20(PARIDA%20RED%20LION%20INDIA%20PVT%20.LTD)!5e1!3m2!1sen!2sin!4v1755087574948!5m2!1sen!2sin",
        });
      } finally {
        setPageLoading(false);
      }
    };
    fetchPageData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.subject
    ) {
      setLoading(false);
      alert(
        "Please fill out all required fields: Name, Email, Subject, and Message."
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLoading(false);
      alert("Please enter a valid email address.");
      return;
    }

    try {
      console.log("Sending payload:", formData); // Debug payload
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Contact Page...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-8 from-white via-violet-50 to-red-50">
      {/* Header */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/vedios/contact-us.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content - Centered Text */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-red-500">Parida</span>{" "}
              <span className="text-violet-400">Red Lion</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Get in touch with us
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information - DYNAMIC */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-violet-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {pageData.contactInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">{pageData.contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">{pageData.contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {pageData.contactInfo.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map - DYNAMIC */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Us</h3>
              <div className="h-64 rounded-lg overflow-hidden">
                <iframe
                  src={pageData.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-violet-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  {loading ? "Sending..." : <Send className="h-5 w-5" />}
                  <span>{loading ? "Please Wait" : "Send Message"}</span>
                </button>

                {/* Engaging Content Below Form */}
                <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-red-50 rounded-xl border-l-4 border-violet-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Why Reach Out to Us?
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-violet-500 mt-1 mr-3">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Expert Assistance:</span>{" "}
                        Get personalized solutions from our industry experts.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-violet-500 mt-1 mr-3">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Quick Response:</span> We
                        typically respond within 24 hours on business days.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-violet-500 mt-1 mr-3">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">No Obligation:</span> Your
                        inquiry is free with no commitment required.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
                    <p className="text-center text-gray-700 italic">
                      "Your questions matter to us! Over 95% of inquiries
                      receive a complete solution in their first response."
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Parida Red Lion?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Service</h3>
                <p className="text-gray-600">
                  We deliver exceptional quality in everything we do.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Timely Response</h3>
                <p className="text-gray-600">
                  Quick response times and efficient service delivery.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support for your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
