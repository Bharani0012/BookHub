import {
  FaGoogle,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedin,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <button className="icon-button" type="button">
        <a
          href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bharanitharan695@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <FaGoogle />
        </a>
      </button>
      <button className="icon-button" type="button">
        <a
          href="mailto:bharanitharan695@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </button>
      <button className="icon-button" type="button">
        <a
          href="https://www.instagram.com/soul_comrade_12?igsh=Z3RiYWM1ZnNrZTQw"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      </button>
      <button className="icon-button" type="button">
        <a
          href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bharanitharan695@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
      </button>
      <button className="icon-button" type="button">
        <a
          href="https://www.linkedin.com/in/bharani-tharan"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
      </button>
    </div>
    <p className="contact-para">Contact us</p>
  </>
)

export default Footer
