import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const resp = await axios.post("/api/v1/auth/register", data);
    localStorage.setItem("token", resp.data.token);
    toast.success("Inscription réussie");
    return redirect("/dashboarduser");
  } catch (error) {
    toast.error(error?.response?.data?.msg); // LE ? RETOURNE INDEFINED ET NE PLANTE PAS.
    //  SA S'APPELLE OPTIONAL CHAINING
    return error;
  }
};
const RegisterForm = () => {
  return (
    <section className="background">
      <Form action="" method="POST">
        <div className="register form">
          <h1>Inscription</h1>
          <label>
            <p>Nom</p>
          </label>
          <input
            type="text"
            placeholder="Entrer le nom d'utilisateur"
            name="first_name"
          />
          <label>
            <p>Prenom</p>
          </label>
          <input
            type="text"
            placeholder="Entrer le Prenom d'utilisateur"
            name="last_name"
          />
          <label>
            <p>Email</p>
          </label>
          <input
            type="email"
            placeholder="Entrer l'email d'utilisateur"
            name="email"
          />
          <label>
            <p>telephone</p>
          </label>
          <input
            type="tel"
            placeholder="Entrer votre numero de telephone"
            name="phone"
            pattern="[0-9]{10}"
          />
          <label>
            <p>Mot de passe</p>
          </label>
          <input
            type="password"
            placeholder="Entrer votre mot de passe"
            name="password"
          />
          <button className="btn" type="submit">
            Inscription
          </button>
          <p style={{ textAlign: "center", marginTop: "1em" }}>
            Vous êtes déja inscrit ?<Link to="/login">Se connecté</Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default RegisterForm;
