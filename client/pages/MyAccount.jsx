import {
  Link,
  useOutletContext,
  redirect,
  useLoaderData,
} from "react-router-dom";
import axios from "axios";
import MyOffers from "../components/MyOffers";

export const loader = async () => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios("/api/v1/items/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/login");
  }
};

const MyAccount = () => {
  const { user } = useOutletContext();
  const {
    data: { articles },
  } = useLoaderData();

  if (user) {
    return (
      <div className="background">
        <section>
          <div className="cards">
            <div className="card img">
              <h3>Ajouter une place de parking</h3>
              <img
                className="card"
                src="./public/Add_Parking.png"
                alt="img_add_parking"
              />

              <Link to={"addoffer"} className="link-to">
                Proposer ma place de parking
              </Link>
            </div>
            {articles.map((article) => {
              return <MyOffers key={article.article_id} article={article} />;
            })}
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="background">
        <section>
          <h1>VOUS DEVEZ ETRE CONNECTER</h1>
        </section>
      </div>
    );
  }
};
export default MyAccount;
