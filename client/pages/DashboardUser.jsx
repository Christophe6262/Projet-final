import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";
import axios from "axios";
import { Outlet, useLoaderData } from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const {
        data: { user },
      } = await axios("/api/v1/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { user };
    } else {
      const user = "";
      return { user };
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
};

const DashboardUser = () => {
  const { user } = useLoaderData();
  return (
    <div>
      <Navbar user={user} />
      <Outlet context={{ user }} />
      <Footer />
    </div>
  );
};

export default DashboardUser;
