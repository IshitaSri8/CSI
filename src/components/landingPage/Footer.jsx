import React from "react";
import "primeicons/primeicons.css";
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";
import logo from "../../assets/arahas_logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Column 1: Logo and Social Media */}
      <div className="flex align-items-center justify-content-center flex-column gap-1">
        <img src={logo} alt="Arahas" className="h-2rem"></img>
        <p className="w-15rem">Follow us on social media for the latest updates</p>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/Arahas.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-facebook text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
          <a
            href="https://youtube.com/@ArahasTech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-youtube text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
          <a
            href="https://instagram.com/arahas.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-instagram text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
          <a
            href="https://x.com/ArahasTech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-twitter text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/company/arahas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-linkedin text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
        </div>
      </div>

      {/* Column 2: Quick Links */}
      <div className="flex align-items-start justify-content-start flex-column gap-3">
        <p className="border-bottom-1 border-orange-600 text-xl p-0 m-0 font-medium">
          Quick Links
        </p>
        <div className="flex align-items-start justify-content-start flex-column gap-3">
          <div className="flex align-items-start justify-content-start gap-1">
            <i className="pi pi-angle-right text-orange-600"></i>
            <Link
              to="/"
              className="p-0 m-0 text-left font-light text-white hover:text-orange-500 no-underline transition-colors transition-duration-300"
            >
              Home
            </Link>
          </div>
          <div className="flex align-items-start justify-content-start gap-1">
            <i className="pi pi-angle-right text-orange-600"></i>
            <Link
              to="/citizen"
              className="p-0 m-0 text-left font-light text-white hover:text-orange-500 no-underline transition-colors transition-duration-300"
            >
              CSI for Citizen
            </Link>
          </div>
          <div className="flex align-items-start justify-content-start gap-1">
            <i className="pi pi-angle-right text-orange-600"></i>
            <Link
              to="/government"
              className="p-0 m-0 text-left font-light text-white hover:text-orange-500 no-underline transition-colors transition-duration-300"
            >
              CSI for Government
            </Link>
          </div>
          <div className="flex align-items-start justify-content-start gap-1">
            <i className="pi pi-angle-right text-orange-600"></i>
            <Link
              to="https://arahas.com/"
              className="p-0 m-0 text-left font-light text-white hover:text-orange-500 no-underline transition-colors transition-duration-300"
            >
              About Us
            </Link>
          </div>
          <div className="flex align-items-start justify-content-start gap-1">
            <i className="pi pi-angle-right text-orange-600"></i>
            <Link
              to="https://ayodhya.arahas.com/"
              className="p-0 m-0 text-left font-light text-white hover:text-orange-500 no-underline transition-colors transition-duration-300"
            >
              Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Column 3: Recent News */}
      <div className="flex align-items-start justify-content-start flex-column gap-3">
        <p className="border-bottom-1 border-orange-600 text-xl p-0 m-0 font-medium">
          Recent News
        </p>
        <div className="flex align-items-start justify-content-start gap-1">
          <i className="pi pi-angle-right text-orange-600"></i>
          <Link
            to="https://tinyurl.com/4pkmjksu"
            className="p-0 m-0 font-light text-white w-16rem hover:text-orange-500 no-underline transition-colors transition-duration-300"
          >
            Ayodhya, First city to have City Sustainability Index
          </Link>
        </div>
      </div>

      {/* Column 4: Contact Us  */}
      <div className="flex align-items-start justify-content-start flex-column gap-3">
        <p className="border-bottom-1 border-orange-600 text-xl p-0 m-0 font-medium">
          Contact US
        </p>
        <div className="flex align-items-start justify-content-start flex-column gap-3">
          <div className="flex align-items-center justify-content-start gap-3">
            <i className="pi pi-map-marker text-orange-600 text-xl"></i>
            <h1 className="p-0 m-0 text-left font-light">
              <span>
                10<sup>th </sup>Level, DLF Plaza Tower, DLF City Phase-I,
                <br />
                Gurugram-122002, Haryana, India
              </span>
            </h1>
          </div>
          <div className="flex align-items-center justify-content-start gap-3">
            <i className="pi pi-envelope text-orange-600 text-xl"></i>
            <h1 className="p-0 m-0 text-left font-light">contact@arahas.com</h1>
          </div>
          <div className="flex align-items-center justify-content-start gap-3">
            <i className="pi pi-phone text-orange-600 text-xl"></i>
            <h1 className="p-0 m-0 text-left font-light">+91-9810709003</h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
