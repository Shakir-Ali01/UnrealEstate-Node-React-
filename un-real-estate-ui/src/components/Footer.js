import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6 mb-3">
              <span className="accent-color footer-title" to="/about-us">
                About Us
              </span>{" "}
              <br />
              <Link className="footer-link" to="/aim-vision">
                Aim
              </Link>
              <br />
              <Link className="footer-link" to="/aim-vision">
                Vision
              </Link>
              <br />
              <Link className="footer-link" to="/Testimonials">
                Testimonials
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <span className="accent-color footer-title" to="/privacy-policy">
                Privacy & policy
              </span>
              <br />
              <Link className="footer-link" to="/our-policies">
                Our Policies
              </Link>
              <br />
              <Link className="footer-link" to="/privacy-notice">
                Privacy Notice
              </Link>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <span className="accent-color footer-title" to="/privacy-policy">
                Social Media
              </span>
              <br />
              <Link className="footer-link">Facebook</Link>
              <br />
              <Link className="footer-link">Instagram</Link>
              <br />
              <Link className="footer-link">Twitter</Link>
              <br />
            </div>
            <div className="col-md-3 col-6">
              <span className="accent-color footer-title" to="/privacy-policy">
                Contact Us
              </span>
              <br />
              <span className="footer-link" to="/mobile-number">
                &#128222; +91 &nbsp;9999999999
              </span>
              <br />
              <span className="footer-link" to="/email-id">
                &#128238; UnrealEstate@email.com
              </span>
              <br />
              <span className="footer-link" to="/address">
                &#128204; IT Park , Chandigarh.
              </span>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center m-1">
        Copyright &copy; UnReal Estate, 2023
      </div>
    </>
  );
};
export default Footer;
