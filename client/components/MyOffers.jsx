import { Link, Form } from "react-router-dom";
import { BsVectorPen, BsFillTrash3Fill } from "react-icons/bs";

/* eslint-disable react/prop-types */
const MyOffers = ({ article }) => {
  const {
    title,
    picture,
    price,
    city,
    street,
    description,
    available_date,
    article_id,
  } = article;

  const timeServer = new Date(available_date);

  const date = new Intl.DateTimeFormat().format(timeServer);

  return (
    <div className="card img">
      <img src={picture} alt="photo parking" />
      <title>{title}</title>
      <p>{price}€ / mois</p>
      <p>{city}</p>
      <p>{street}</p>
      <span>{description}</span>
      <p>{date}</p>
      <button className="btn">
        <Link to={`/dashboarduser/editoffers/${article_id}`}>
          Modifier <BsVectorPen />
        </Link>
      </button>
      <Form method="POST" action={`/dashboarduser/deleteoffers/${article_id}`}>
        <button className=" btn" type="submit">
          Supprimer <BsFillTrash3Fill />
        </button>
      </Form>
    </div>
  );
};

export default MyOffers;
