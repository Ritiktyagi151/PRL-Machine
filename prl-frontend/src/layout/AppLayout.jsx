import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GetQuoteModal from "../common/GetAquote/Getaquote";
import ParidaRedLionChatbot from "../chatbot/Chatbot";
import CatalogDownload from "../common/downloadcatelog/CatalogDownload";
import SideButtons from "../common/Sidebaar/SideBar";
import RouteSeo from "../common/seo/RouteSeo";
import { scrollToHash } from "../utils/hashScroll";

const HashScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    let timeoutId;
    let attempts = 0;
    const maxAttempts = 50;

    const tryScroll = () => {
      attempts += 1;
      const didScroll = scrollToHash(location.hash);
      if (didScroll || attempts >= maxAttempts) return;
      timeoutId = window.setTimeout(tryScroll, 100);
    };

    timeoutId = window.setTimeout(tryScroll, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.hash]);

  return null;
};

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
      <RouteSeo />
      <ScrollRestoration />
      <HashScrollManager />
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
