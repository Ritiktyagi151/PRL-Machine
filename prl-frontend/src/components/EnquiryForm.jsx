import { useState, useEffect } from "react";
import { CheckCircle, MessageCircle } from "lucide-react"; // WhatsApp icon ke liye MessageCircle add kiya
import RecaptchaField from "./RecaptchaField";

const EnquiryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // WhatsApp Number (Apna number yaha change karein - bina '+' ke)
  const whatsappNumber = "919650508381";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/prlinquiry@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            recaptchaToken,
            "g-recaptcha-response": recaptchaToken,
            _subject: "New Enquiry from Parida Red Lion Website",
            _template: "table",
          }),
        },
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setRecaptchaToken("");

        // Success ke baad auto-close ko 10 sec kar diya taaki user WhatsApp button dekh sake
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
        }, 10000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="prl-enquiry-overlay fixed inset-0 z-50 flex items-start sm:items-center justify-center backdrop-blur-sm bg-black/40 overflow-y-auto px-3 py-4 sm:p-4">
      <div className="prl-enquiry-modal relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-red-600 p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Parida Red Lion
            </h2>
            <button
              onClick={closeModal}
              className="text-white hover:scale-125 transition-transform text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {!isSubmitted ? (
          /* Form Section */
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-3 sm:space-y-4"
          >
            <p className="text-gray-600 text-sm">We'd love to hear from you!</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base resize-none"
                placeholder="Tell us about your enquiry..."
              />
            </div>
            <div className="prl-enquiry-recaptcha">
              <RecaptchaField onChange={setRecaptchaToken} />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !recaptchaToken}
              className={`w-full text-white py-3 rounded-xl font-bold transition-all shadow-lg ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-red-600 to-purple-600 hover:brightness-110 active:scale-95"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        ) : (
          /* Thank You + WhatsApp Section */
          <div className="p-6 sm:p-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              Your enquiry has been received. Need an <b>instant</b> reply?
            </p>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi, I just submitted an enquiry on your website and would like to discuss further.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-bold transition-all shadow-md mb-4"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </a>

            <button
              onClick={closeModal}
              className="text-gray-500 text-sm hover:underline"
            >
              Close this window
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Privacy Guaranteed • Parida Red Lion
          </p>
        </div>
      </div>
      <style>{`
        .prl-enquiry-modal {
          max-height: calc(100dvh - 32px);
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .prl-enquiry-recaptcha {
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 2px;
        }

        .prl-enquiry-recaptcha > div {
          max-width: 100%;
        }

        @media (max-width: 380px) {
          .prl-enquiry-overlay {
            padding-left: 10px;
            padding-right: 10px;
          }

          .prl-enquiry-recaptcha {
            transform: scale(0.86);
            transform-origin: left center;
            width: 116.28%;
          }
        }

        @media (max-height: 680px) {
          .prl-enquiry-modal {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EnquiryForm;
