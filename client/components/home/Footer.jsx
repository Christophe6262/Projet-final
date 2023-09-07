import { BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <section className="section" id="contact">
      <div className="link-text-contact">
        <h2>Nous rejoindre</h2>
      </div>

      <a
        href="https://www.instagram.com/"
        className="link"
        id="profile-link"
        target="_blank"
        rel="noreferrer"
      >
        <BsInstagram />
        Instagram
      </a>
      <a
        href="https://www.facebook.com/"
        className="link"
        id="profile-link"
        target="_blank"
        rel="noreferrer"
      >
        <BsFacebook />
        Facebook
      </a>
      <p className="copyright">
        Copyright &copy;
        <span id="date"></span>. All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
