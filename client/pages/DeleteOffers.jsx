import { redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`/api/v1/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Article supprimé");
    return redirect("/dashboarduser");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DeleteOffers = () => {
  return <div></div>;
};

export default DeleteOffers;
