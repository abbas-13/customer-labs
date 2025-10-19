import { useContext } from "react";
import { LeftOutlined } from "@ant-design/icons";

import { NavbarHeadingContext } from "../context/navbarHeading";

const Navbar = () => {
  const { heading } = useContext(NavbarHeadingContext);

  return (
    <div className="h-16 bg-[#53A1B2] w-full flex gap-2 items-center p-2">
      <LeftOutlined className="text-lg text-white stroke-white stroke-[50]" />
      <h2 className="text-white text-lg">{heading}</h2>
    </div>
  );
};

export default Navbar;
