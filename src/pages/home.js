import { useContext, useState } from "react";
import { Button, Drawer } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import { NavbarHeadingContext } from "../context/navbarHeading";
import AddSegment from "../components/addSegment";
import styles from "./home.module.css";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setHeading } = useContext(NavbarHeadingContext);

  setHeading("View Audience");

  return (
    <div className="w-full h-full backdrop-blur-lg bg-black/30 p-2">
      <Button
        size="large"
        ghost
        style={{
          color: "white",
          borderRadius: "0",
          border: "2px solid white",
          margin: "1rem 0 0 3rem",
        }}
        onClick={() => setDrawerOpen(true)}
      >
        Save Segment
      </Button>
      <Drawer
        width={400}
        className={styles.drawer}
        title={
          <div className="h-16 bg-[#53A1B2] w-full flex gap-2 items-center p-2">
            <LeftOutlined
              onClick={() => setDrawerOpen(false)}
              style={{
                fontSize: "18px",
                color: "white",
                stroke: "white",
                strokeWidth: "50",
              }}
            />
            <h2 className="text-white text-lg">Saving Segment</h2>
          </div>
        }
        open={drawerOpen}
        closable={false}
      >
        <AddSegment />
      </Drawer>
    </div>
  );
};
export default Home;
