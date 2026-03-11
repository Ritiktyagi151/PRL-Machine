import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

const AppProvider = ({ children }) => {
  return (
    <HelmetProvider>
      <Suspense fallback={<h2>Loading...</h2>}>{children}</Suspense>
    </HelmetProvider>
  );
};

export default AppProvider;
