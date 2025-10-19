import { Layout } from "antd";
import Navbar from "./navbar";

const Appshell = ({ children }) => {
  return (
    <Layout style={{ height: "100%", width: "100%" }}>
      <Navbar />
      <div className="bg-[url(./bg-image.png)] w-full h-full">{children}</div>
    </Layout>
  );
};

export default Appshell;
