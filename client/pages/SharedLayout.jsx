/* eslint-disable react-refresh/only-export-components */
import Navbar from "../components/navbar/Navbar";
import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "../components/home/Footer";
import axios from "axios";

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

const SharedLayout = () => {
  const { user } = useLoaderData();
  return (
    <>
      <Navbar user={user} />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
