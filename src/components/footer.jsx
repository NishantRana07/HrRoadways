import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li><Link to="/about ">About us</Link></li>
                <li><a href="#">our services</a></li>
                <li><a href="#">privacy policy</a></li>
                <li><a href="#">affiliate program</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">contact us</a></li>
                <li><a href="#">Bus status</a></li>
                <li><a href="#">payment options</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4> Rides </h4>
              <ul>
                <li><a href="#">Trips </a></li>
                <li><a href="#">Luxary destination</a></li>
                <li><a href="#">Visit cities</a></li>
                <li><a href="#">Best rides</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          body {
            line-height: 1.5;
            font-family: 'Poppins', sans-serif;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            max-width: 1170px;
            margin: auto;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
          }
          ul {
            list-style: none;
          }
          .footer {
            background-color: #24262b;
            padding: 70px 0;
          }
          .footer-col {
            width: 25%;
            padding: 0 15px;
          }
          .footer-col h4 {
            font-size: 18px;
            color: #ffffff;
            text-transform: capitalize;
            margin-bottom: 35px;
            font-weight: 500;
            position: relative;
          }
          .footer-col h4::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -10px;
            background-color: #e91e63;
            height: 2px;
            box-sizing: border-box;
            width: 50px;
          }
          .footer-col ul li:not(:last-child) {
            margin-bottom: 10px;
          }
          .footer-col ul li a {
            font-size: 16px;
            text-transform: capitalize;
            color: #ffffff;
            text-decoration: none;
            font-weight: 300;
            color: #bbbbbb;
            display: block;
            transition: all 0.3s ease;
          }
          .footer-col ul li a:hover {
            color: #ffffff;
            padding-left: 8px;
          }
          .footer-col .social-links a {
            display: inline-block;
            height: 40px;
            width: 40px;
            background-color: rgba(255, 255, 255, 0.2);
            margin: 0 10px 10px 0;
            text-align: center;
            line-height: 40px;
            border-radius: 50%;
            color: #ffffff;
            transition: all 0.5s ease;
          }
          .footer-col .social-links a:hover {
            color: #24262b;
            background-color: #ffffff;
          }

          /* Responsive */
          @media (max-width: 767px) {
            .footer-col {
              width: 50%;
              margin-bottom: 30px;
            }
          }
          @media (max-width: 574px) {
            .footer-col {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Footer;
