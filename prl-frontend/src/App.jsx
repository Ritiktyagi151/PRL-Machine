import React from "react";
import ContentProtection from "./components/ContentProtection";
import AppProvider from "./provider/AppProvider";
import Routing from "./routes/Routing";

const App = () => {
  return (
    <ContentProtection>
      <AppProvider>
        <Routing />
      </AppProvider>
    </ContentProtection>
  );
};

export default App;
