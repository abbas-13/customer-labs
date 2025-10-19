import { Layout } from "antd";
import Navbar from "./navbar";

const Appshell = ({ children }) => {
  return (
    <Layout className="h-full w-full">
      <Navbar />
      <div className="bg-[url(./bg-image.png)] w-full h-full">{children}</div>
    </Layout>
  );
};

export default Appshell;
