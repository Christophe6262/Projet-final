import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const resp = await axios.post("/api/v1/auth/login", data);
    localStorage.setItem("token", resp.data.token);
    toast.success("Connexion réussie");
    return redirect("/dashboarduser");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const LoginForm = () => {
  return (
    <section className="background">
      <Form method="POST">
        <div className="login form">
          <h1>Connexion</h1>
          <label htmlFor="email">
            <p>Email</p>
          </label>
          <input
            type="email"
            placeholder="Entrer le mail d'utilisateur"
            name="email"
          />
          <label>
            <p>Mot de passe</p>
          </label>
          <input
            type="password"
            placeholder="Entrer le mot de passe"
            name="password"
          />
          <button className="btn" type="submit">
            Connexion
          </button>
          <p style={{ textAlign: "center", marginTop: "1em" }}>
            Vous n&apos;êtes pas inscrit ?
            <Link to="/register">S&apos;inscrire</Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default LoginForm;
