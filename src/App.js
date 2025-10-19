import Appshell from "./components/appshell";
import Home from "./pages/home";
import { NavbarHeadingContext } from "./context/navbarHeading";
import { useState } from "react";

const App = () => {
  const [heading, setHeading] = useState("");

  return (
    <NavbarHeadingContext.Provider
      value={{
        heading,
        setHeading,
      }}
    >
      <Appshell>
        <Home />
      </Appshell>
    </NavbarHeadingContext.Provider>
  );
};

export default App;
