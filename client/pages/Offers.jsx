import { redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

let imageValue;

export const action = async ({ request, params }) => {
  const { id } = params;
  const token = localStorage.getItem("token");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.picture = imageValue;
  try {
    await axios.put(`/api/v1/items/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Article modifié");
    return redirect("/dashboarduser");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const loader = async () => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios(`/api/v1/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/");
  }
};

const Offers = () => {
  const { data } = useLoaderData();
  const articles = data.articles;

  return (
    <div className="background">
      <section>
        <div className="cards">
          {articles.map((article, index) => {
            const {
              title,
              picture,
              price,
              city,
              street,
              description,
              available_date,
            } = article;

            const timeServer = new Date(available_date);
            console.log(available_date);
            const date = new Intl.DateTimeFormat().format(timeServer);
            return (
              <div key={index} className="card img">
                <img src={picture} alt="photo parking" />
                <title>{title}</title>
                <p>{price}€ / mois</p>
                <p>{city}</p>
                <p>{street}</p>
                <span>{description}</span>
                {available_date && <p>{date}</p>}
                {/* SI AVAILABLE8DATE ALORS AFFICHE LES INFOS SINON NON */}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Offers;
