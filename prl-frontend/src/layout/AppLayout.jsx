import React, { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GetQuoteModal from "../common/GetAquote/Getaquote";
import ParidaRedLionChatbot from "../chatbot/Chatbot";
import CatalogDownload from "../common/downloadcatelog/CatalogDownload";
import SideButtons from "../common/Sidebaar/SideBar";


const AppLayout = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleOpenQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <>
      <ScrollRestoration />
      <Navbar onOpenQuote={handleOpenQuote} />
      <GetQuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuote} />
      <SideButtons />
      <ParidaRedLionChatbot />
      <CatalogDownload />
      
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
