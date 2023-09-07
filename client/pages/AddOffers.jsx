import { Form, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

let imageValue;

export const action = async ({ request }) => {
  const token = localStorage.getItem("token");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.picture = imageValue;
  try {
    await axios.post(`/api/v1/items/users`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Article ajouté");
    return redirect("/dashboarduser");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddOffers = () => {
  const handleChange = async (e) => {
    const token = localStorage.getItem("token");
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(`/api/v1/items/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      imageValue = src;
    } catch (error) {
      imageValue = null;
      console.log(error);
    }
  };

  return (
    <div className="background">
      <section>
        <Form method="POST">
          <div className="form-control">
            <h1>Proposer ma place de parking</h1>
            <label htmlFor="title">Titre de l&apos;annonce</label>
            <input type="text" name="title" id="title" />

            <label htmlFor="picture">Photo</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleChange}
              id="picture"
            />

            <label htmlFor="price">Prix</label>
            <input type="text" name="price" id="price" />

            <label htmlFor="city">Ville</label>
            <input type="text" name="city" id="city" />

            <label htmlFor="street">Rue</label>
            <input type="text" name="street" id="street" />

            <label htmlFor="message">Description</label>
            <textarea name="description" id="" cols="30" rows="10"></textarea>

            <label htmlFor="date">Prochaine disponibilité</label>
            <input type="date" name="available_date" id="date" />

            <button type="submit" className="btn">
              Valider !
            </button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default AddOffers;
