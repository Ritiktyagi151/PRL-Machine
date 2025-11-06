import { useState, useRef, useEffect } from "react";

const ParidaRedLionChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to Parida Red Lion India Pvt Ltd. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        response = "Hello! How can I assist you today?";
      } else if (
        lowerInput.includes("contact") ||
        lowerInput.includes("address")
      ) {
        response = `Here are our contact details:\nPhone: +91 7065500903\nEmail: r.k.parida015@gmail.com\n\nAddress:\nPARIDA RED LION INDIA PVT LTD\nPlot No-106, Ecotec-3\nUdhyog Kendra-1, Greater Noida\nGautam Buddha Nagar, Uttar Pradesh 201306\n\nGST NO: 09AAJCP6402H1ZC`;
      } else if (
        lowerInput.includes("form") ||
        lowerInput.includes("enquiry")
      ) {
        response =
          "I can help you with that. Would you like to share your contact details so we can connect on WhatsApp?";
      } else if (lowerInput.includes("upvc") || lowerInput.includes("uPVC")) {
        response = `Our uPVC Window Machines:\n1. uPVC Welding Machine\n2. uPVC Cutting Machine\n3. uPVC Cleaning Machine\n4. uPVC Copy Router & Lock Hole Machine\n\nWould you like to get detailed information on WhatsApp?`;
      } else if (
        lowerInput.includes("aluminum") ||
        lowerInput.includes("aluminium")
      ) {
        response = `Our Aluminum Window Machines:\n1. Aluminum Cutting Machine\n2. Aluminum Lock Hole Machine\n3. Aluminum Mullion Machine\n4. Aluminum Punching & Crimping Machine\n\nWould you like to get detailed information on WhatsApp?`;
      } else if (
        lowerInput.includes("product") ||
        lowerInput.includes("machine")
      ) {
        response =
          "We manufacture:\n1. uPVC Window Machines\n2. Aluminum Window Machines\n\nWhich type are you interested in?";
      } else if (
        lowerInput.includes("about") ||
        lowerInput.includes("company")
      ) {
        response =
          "PARIDA RED LION INDIA PVT LTD is a leading manufacturer of window machinery.\n\nGST NO: 09AAJCP6402H1ZC\n\nAddress:\nPlot No-106, Ecotec-3\nUdhyog Kendra-1, Greater Noida\nGautam Buddha Nagar, Uttar Pradesh 201306";
      } else if (lowerInput.includes("whatsapp")) {
        response =
          "Great! Please share your contact details and we'll connect with you on WhatsApp shortly.";
        setShowForm(true);
      } else {
        response =
          "I can help with:\n- Product information (uPVC/Aluminum machines)\n- Company information\n- Contact details\n- Connecting on WhatsApp\nWhat would you like to know?";
      }

      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }, 1000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Create WhatsApp message
      const whatsappMessage = `New Enquiry from Parida Red Lion Website:%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;

      // Open WhatsApp with pre-filled message
      window.open(
        `https://wa.me/917065500903?text=${whatsappMessage}`,
        "_blank"
      );

      setMessages([
        ...messages,
        {
          text: "Thank you for your details! We're opening WhatsApp so you can connect with us directly.",
          sender: "bot",
        },
      ]);
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const quickReplies = [
    { text: "uPVC Machines", action: () => showUPVCMachines() },
    { text: "Aluminum Machines", action: () => showAluminumMachines() },
    { text: "Contact info", action: () => showContactDetails() },
    {
      text: "Connect on WhatsApp",
      action: () => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Great! Please share your details to connect on WhatsApp.",
            sender: "bot",
          },
        ]);
        setShowForm(true);
      },
    },
  ];

  const showContactDetails = () => {
    setMessages((prev) => [
      ...prev,
      { text: "Here are our contact details:", sender: "bot" },
      {
        text: `Phone: +91 7065500903\nEmail: r.k.parida015@gmail.com\n\nAddress:\nPARIDA RED LION INDIA PVT LTD\nPlot No-106, Ecotec-3\nUdhyog Kendra-1, Greater Noida\nGautam Buddha Nagar, Uttar Pradesh 201306\n\nGST NO: 09AAJCP6402H1ZC`,
        sender: "bot",
      },
    ]);
  };

  const showUPVCMachines = () => {
    setMessages((prev) => [
      ...prev,
      { text: "Our uPVC Window Machines:", sender: "bot" },
      {
        text: `1. uPVC Welding Machine\n2. uPVC Cutting Machine\n3. uPVC Cleaning Machine\n4. uPVC Copy Router & Lock Hole Machine\n\nWould you like to get detailed information on WhatsApp?`,
        sender: "bot",
      },
    ]);
  };

  const showAluminumMachines = () => {
    setMessages((prev) => [
      ...prev,
      { text: "Our Aluminum Window Machines:", sender: "bot" },
      {
        text: `1. Aluminum Cutting Machine\n2. Aluminum Lock Hole Machine\n3. Aluminum Mullion Machine\n4. Aluminum Punching & Crimping Machine\n\nWould you like to get detailed information on WhatsApp?`,
        sender: "bot",
      },
    ]);
  };

  return (
    <div className="fixed bottom-16 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-white rounded-t-lg shadow-xl flex flex-col">
          {/* Chatbot header */}
          <div className="bg-red-600 text-white p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-lg">Parida Red Lion</h2>
                <p className="text-xs opacity-80">
                  Industrial Machinery Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  {msg.sender === "bot" && msg.text.includes("WhatsApp") && (
                    <div className="mt-2">
                      <svg
                        className="w-5 h-5 inline-block mr-1 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                      </svg>
                      <span className="text-xs text-green-500">WhatsApp</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {showForm && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
                <h3 className="font-bold mb-3 text-red-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                  </svg>
                  Connect on WhatsApp
                </h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded-md flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                          </svg>
                          Open WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {!showForm && messages.length > 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={reply.action}
                  className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 flex items-center"
                >
                  {reply.text.includes("WhatsApp") && (
                    <svg
                      className="w-3 h-3 mr-1 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                    </svg>
                  )}
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          {!showForm && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-all flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default ParidaRedLionChatbot;
