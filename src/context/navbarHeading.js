import { createContext } from "react";

export const NavbarHeadingContext = createContext({
  heading: null,
  setHeading: () => {},
});
