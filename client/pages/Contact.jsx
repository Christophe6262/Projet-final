import { Form } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  return (
    <Form className="background" method="POST">
      <div className="form-control">
        <h1>Nous contacter</h1>
        <label htmlFor="name">Nom</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="name">Prenom</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="name">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" cols="30" rows="10"></textarea>

        <button type="submit" className="btn">
          ENVOYER
        </button>
      </div>
    </Form>
  );
};

export default Contact;
