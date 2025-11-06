import React, { useState } from "react";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newsList = [
    {
      id: 1,
      title: "Galaxy PackTech Expands to 25+ Countries",
      date: "July 2025",
      category: "expansion",
      excerpt:
        "Parida Red Lion's flagship division, Galaxy PackTech, has successfully expanded its operations to over 25 countries worldwide, strengthening its global presence in packaging solutions.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "2 min read",
      fullContent: `
        <p>Parida Red Lion is proud to announce that our flagship division, Galaxy PackTech, has successfully expanded its operations to over 25 countries across the globe. This strategic expansion marks a significant milestone in our mission to provide world-class packaging solutions to clients worldwide.</p>
        <p class="mt-4">The expansion includes new regional offices in Europe, Southeast Asia, and Latin America, allowing us to better serve our international clients with localized support and faster response times. Our team has grown to include over 200 professionals dedicated to delivering exceptional packaging machinery and solutions.</p>
        <p class="mt-4">"This expansion represents our commitment to being a truly global partner in the packaging industry," said Mr. Rajesh Parida, CEO of Parida Red Lion. "We're now better positioned than ever to understand and meet the unique needs of clients in diverse markets."</p>
      `
    },
    {
      id: 2,
      title: "Launch of Eco-Friendly Packaging Machines",
      date: "June 2025",
      category: "innovation",
      excerpt:
        "Parida Red Lion introduces a new line of sustainable packaging solutions that reduce environmental impact while maintaining high efficiency standards for our clients.",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "3 min read",
      fullContent: `
        <p>Parida Red Lion has launched a groundbreaking line of eco-friendly packaging machines designed to help our clients reduce their environmental footprint while maintaining operational efficiency.</p>
        <p class="mt-4">The new GreenPack series features energy-efficient motors, reduced material consumption technology, and compatibility with biodegradable packaging materials. These machines can reduce energy consumption by up to 30% compared to conventional packaging equipment.</p>
        <p class="mt-4">"Sustainability is no longer an option—it's a necessity," said Dr. Priya Sharma, Head of R&D at Parida Red Lion. "Our GreenPack series represents our commitment to developing solutions that benefit both our clients and the planet."</p>
        <p class="mt-4">The initial response from clients has been overwhelmingly positive, with several major companies already placing orders for the new equipment.</p>
      `
    },
    {
      id: 3,
      title: "New State-of-the-Art Manufacturing Facility",
      date: "May 2025",
      category: "expansion",
      excerpt:
        "Parida Red Lion inaugurates a new advanced manufacturing plant in Greater Noida, increasing production capacity by 40% and incorporating Industry 4.0 technologies.",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "4 min read",
      fullContent: `
        <p>Parida Red Lion has inaugurated a new state-of-the-art manufacturing facility in Greater Noida, representing a significant investment in our production capabilities and technological infrastructure.</p>
        <p class="mt-4">The 100,000 square foot facility incorporates Industry 4.0 technologies, including IoT-enabled machinery, automated production lines, and real-time quality monitoring systems. This expansion increases our production capacity by 40% and allows us to reduce delivery times by approximately 25%.</p>
        <p class="mt-4">The facility also features dedicated R&D labs, testing centers, and training facilities for both our team and clients. "This new plant represents the future of manufacturing at Parida Red Lion," said Mr. Amit Kumar, Operations Director. "We're now better equipped than ever to meet the growing demand for our packaging solutions."</p>
        <p class="mt-4">The inauguration ceremony was attended by industry leaders, government officials, and long-term clients, who were given tours of the advanced facilities.</p>
      `
    },
    {
      id: 4,
      title: "Wins 'Innovation Excellence' Award",
      date: "April 2025",
      category: "awards",
      excerpt:
        "Parida Red Lion receives the prestigious 'Innovation Excellence Award' for its groundbreaking automation solutions in the packaging industry.",
      image:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "2 min read",
      fullContent: `
        <p>Parida Red Lion has been honored with the prestigious "Innovation Excellence Award" at the Global Packaging Summit for our groundbreaking automation solutions that are transforming the packaging industry.</p>
        <p class="mt-4">The award recognizes our AutoPack Pro series, which incorporates artificial intelligence and machine learning to optimize packaging processes, reduce material waste, and increase production efficiency. The system can adapt to different product types and packaging materials without manual reconfiguration.</p>
        <p class="mt-4">"We're incredibly proud to receive this recognition," said Ms. Neha Singh, Lead Engineer on the AutoPack Pro project. "This award validates our approach to innovation—focusing on practical solutions that deliver real value to our clients."</p>
        <p class="mt-4">The Innovation Excellence Award is considered one of the highest honors in the packaging industry, recognizing companies that demonstrate exceptional creativity, technical achievement, and market impact.</p>
      `
    },
    {
      id: 5,
      title: "Strategic Partnership with European Pharma Giant",
      date: "March 2025",
      category: "partnerships",
      excerpt:
        "Parida Red Lion announces a strategic partnership with a leading European pharmaceutical company to develop specialized packaging solutions.",
      image:
        "https://images.unsplash.com/photo-1581092581310-0c2f13e83c8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "3 min read",
      fullContent: `
        <p>Parida Red Lion has entered into a strategic partnership with BioPharm Europe, one of the continent's leading pharmaceutical companies, to develop specialized packaging solutions for sensitive medical products.</p>
        <p class="mt-4">The collaboration will focus on creating advanced packaging systems that maintain sterility, ensure tamper evidence, and provide precise dosing capabilities for pharmaceutical products. The partnership combines Parida Red Lion's engineering expertise with BioPharm Europe's deep understanding of pharmaceutical requirements.</p>
        <p class="mt-4">"This partnership represents a significant opportunity to expand our presence in the pharmaceutical packaging sector," said Mr. Vikram Mehta, Business Development Director at Parida Red Lion. "BioPharm Europe's stringent quality standards and innovative approach make them an ideal partner for this initiative."</p>
        <p class="mt-4">The first products from this collaboration are expected to reach the market in early 2026, with initial focus on packaging solutions for vaccines and temperature-sensitive medications.</p>
      `
    },
    {
      id: 6,
      title: "Opens Advanced R&D Center",
      date: "February 2025",
      category: "innovation",
      excerpt:
        "Parida Red Lion establishes a new Research & Development center focused on creating next-generation packaging technologies and automation solutions.",
      image:
        "https://images.unsplash.com/photo-1581092446335-53dbfe7e46a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "3 min read",
      fullContent: `
        <p>Parida Red Lion has established a new Advanced Research & Development Center dedicated to creating the next generation of packaging technologies and automation solutions.</p>
        <p class="mt-4">The 20,000 square foot facility houses state-of-the-art laboratories, prototyping workshops, and testing facilities. It will serve as the innovation hub for developing new packaging technologies, with initial focus on sustainable materials, smart packaging, and Industry 4.0 integration.</p>
        <p class="mt-4">The center will employ over 50 researchers, engineers, and technicians, making it one of the largest dedicated packaging R&D facilities in the region. "This investment underscores our commitment to innovation and technological leadership," said Dr. Anjali Patel, Director of R&D. "We're creating an environment where our team can push the boundaries of what's possible in packaging technology."</p>
        <p class="mt-4">The R&D center will also collaborate with several academic institutions and research organizations to stay at the forefront of packaging innovation.</p>
      `
    },
  ];

  const categories = [
    { id: "all", name: "All News" },
    { id: "expansion", name: "Expansion" },
    { id: "innovation", name: "Innovation" },
    { id: "awards", name: "Awards" },
    { id: "partnerships", name: "Partnerships" },
  ];

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  const filteredNews =
    selectedCategory === "all"
      ? newsList
      : newsList.filter((news) => news.category === selectedCategory);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#281E5A] mb-4">
            Parida Red Lion News
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments, innovations, and
            achievements from Parida Red Lion, a leader in packaging machinery
            solutions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#281E5A] text-white"
                  : "bg-white text-[#281E5A] border border-[#281E5A] hover:bg-[#281E5A] hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-[#EC1C24] uppercase tracking-wide">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">{news.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[#281E5A] mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <button 
                    onClick={() => openModal(news)}
                    className="text-[#281E5A] font-medium flex items-center group"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-[#281E5A] to-[#1c1345] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated with Parida Red Lion
          </h3>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Subscribe to our newsletter to receive the latest news, product
            updates, and industry insights directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#EC1C24]"
            />
            <button className="bg-[#EC1C24] px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Company Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#281E5A]">
            <div className="w-12 h-12 bg-[#281E5A] rounded-full flex items-center justify-center text-white mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#281E5A] mb-2">
              Global Presence
            </h3>
            <p className="text-gray-600">
              Serving clients in over 25 countries with reliable packaging
              solutions and dedicated support.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#EC1C24]">
            <div className="w-12 h-12 bg-[#EC1C24] rounded-full flex items-center justify-center text-white mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#281E5A] mb-2">
              Innovation Driven
            </h3>
            <p className="text-gray-600">
              Continuously developing cutting-edge technology to meet evolving
              industry needs and sustainability goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#281E5A]">
            <div className="w-12 h-12 bg-[#281E5A] rounded-full flex items-center justify-center text-white mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#281E5A] mb-2">
              Quality Assurance
            </h3>
            <p className="text-gray-600">
              Rigorous quality control processes ensure our machinery meets the
              highest standards of performance and reliability.
            </p>
          </div>
        </div>
      </div>

      {/* News Detail Modal */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 z-50 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 backdrop-blur-sm transition-opacity" 
              onClick={closeModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-[#EC1C24] uppercase tracking-wide">
                        {selectedNews.category}
                      </span>
                      <span className="text-xs text-gray-500">{selectedNews.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#281E5A] mb-4">
                      {selectedNews.title}
                    </h3>
                    
                    <div className="h-64 overflow-hidden rounded-lg mb-6">
                      <img
                        src={selectedNews.image}
                        alt={selectedNews.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="text-gray-600 mb-6 prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: selectedNews.fullContent }} />
                    </div>
                    
                    <div className="flex justify-between items-center border-t pt-4">
                      <span className="text-sm text-gray-500">{selectedNews.date}</span>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#281E5A] text-base font-medium text-white hover:bg-[#1c1345] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#281E5A] sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;