import React from "react";
import AppProvider from "./provider/AppProvider";
import Routing from "./routes/Routing";

const App = () => {
  return (
    <AppProvider>
      <Routing />
    </AppProvider>
  );
};

export default App;
