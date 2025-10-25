// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Bus, MapPin, Clock, Globe, Share, Mail } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import "../styles/footer.css";
// import { socialMediaLinks } from "../utils/translationKeyMap";

// function Footer() {
//   const { t } = useTranslation();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [email, setEmail] = useState("");
//   const [subscriptionStatus, setSubscriptionStatus] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // 🟩 ADD HERE — Newsletter local state
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   useEffect(() => {
//     const timeInterval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timeInterval);
//   }, []);

//   const handleNewsletterSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       setSubscriptionStatus(t("newsletter.enterEmail"));
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setSubscriptionStatus(t("newsletter.invalidEmail"));
//       return;
//     }

//     setIsLoading(true);
//     setSubscriptionStatus("");

//     try {
//       const API_BASE_URL = 'http://localhost:8000';
//       const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSubscriptionStatus(t("newsletter.success"));
//         setEmail("");
//       } else {
//         setSubscriptionStatus(data.message || t("newsletter.error"));
//       }
//     } catch (error) {
//       console.error('Newsletter subscription error:', error);
//       setSubscriptionStatus(t("newsletter.error"));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <footer className="footer w-full">
//       <div className="footer-bg-overlay" />
//       <div className="footer-time">
//         <div className="footer-time-content">
//           <Globe className="footer-time-icon" />
//           <span>{currentTime.toLocaleTimeString()}</span>
//         </div>
//         <div className="footer-date-content">
//           <Clock className="footer-date-icon" />
//           <span>{currentTime.toLocaleDateString()}</span>
//         </div>
//       </div>

//       <div className="footer-container">
//         <div className="footer-header">
//           <div className="footer-logo">
//             <Bus className="footer-logo-icon" />
//             <h2 className="footer-title">Haryana Roadways</h2>
//           </div>
//         </div>

//         {/* 🟩 ADD HERE — Newsletter Subscription Section */}
//         <div className="footer-newsletter">
//           <div className="footer-newsletter-header">
//             <Mail className="footer-newsletter-icon" />
//             <h3>{t("footer.newsletterTitle") || "Subscribe to our Newsletter"}</h3>
//           </div>

//           {!subscribed ? (
//             <form onSubmit={handleSubscribe} className="footer-newsletter-form">
//               <input
//                 type="email"
//                 placeholder={t("footer.emailPlaceholder") || "Enter your email"}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="footer-newsletter-input"
//               />
//               <div className="footer-newsletter-buttons">
//                 <button type="submit" className="footer-newsletter-btn">
//                   {t("footer.subscribe") || "Subscribe"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setEmail("")}
//                   className="footer-newsletter-cancel"
//                 >
//                   {t("footer.noThanks") || "No Thanks"}
//                 </button>
//               </div>
//               <p className="footer-newsletter-terms">
//                 By subscribing, you agree to our{" "}
//                 <Link to="/policy" className="footer-link">
//                   {t("footer.privacyPolicy") || "Privacy Policy"}
//                 </Link>{" "}
//                 and{" "}
//                 <Link to="/terms" className="footer-link">
//                   {t("footer.termsOfService") || "Terms of Service"}
//                 </Link>.
//               </p>
//             </form>
//           ) : (
//             <p className="footer-newsletter-success">
//               {t("footer.subscribedMessage") ||
//                 "Thank you for subscribing! You'll hear from us soon."}
//             </p>
//           )}
//         </div>
//         {/* 🟩 Newsletter section ends here */}

//         <div className="footer-sections">
//           {[
//             {
//               title: t("footer.company"),
//               icon: MapPin,
//               links: [
//                 { label: t("nav.about"), to: "/about" },
//                 { label: t("nav.services"), to: "/services" },
//                 { label: t("footer.privacy"), to: "/policy" },
//                 { label: t("affiliate.title"), to: "/affiliate" },
//               ],
//             },
//             {
//               title: t("footer.getHelp"),
//               icon: Bus,
//               links: [
//                 { label: t("reviews.title"), to: "/reviews" },
//                 { label: t("nav.contact"), to: "/contact" },
//                 { label: t("nav.track"), to: "/track" },
//                 { label: t("payment.title"), to: "/payment" },
//               ],
//             },
//             {
//               title: t("footer.rides"),
//               icon: Globe,
//               links: [
//                 { label: t("nav.trip"), to: "/trip" },
//                 { label: t("footer.luxury"), to: "/luxury" },
//                 { label: t("nav.travellocations"), to: "/travellocations" },
//                 { label: t("nav.bestrides"), to: "/bestrides" },
//               ],
//             },
//             // New Newsletter Section
//             {
//               title: t("newsletter.title"),
//               icon: Mail,
//               customContent: (
//                 <div className="footer-newsletter">
//                   <p className="footer-newsletter-description">
//                     {t("newsletter.description")}
//                   </p>
//                   <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
//                     <div className="footer-newsletter-input-group">
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder={t("newsletter.enterEmail")}
//                         className="footer-newsletter-input"
//                         disabled={isLoading}
//                       />
//                       <button
//                         type="submit"
//                         className="footer-newsletter-button"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? t("newsletter.subscribing") : t("newsletter.subscribe")}
//                       </button>
//                     </div>
//                     {subscriptionStatus && (
//                       <p className={`footer-newsletter-status ${subscriptionStatus === t("newsletter.success")
//                           ? "footer-newsletter-status-success"
//                           : "footer-newsletter-status-error"
//                         }`}>
//                         {subscriptionStatus}
//                       </p>
//                     )}
//                   </form>
//                 </div>
//               ),
//             },
//             {
//               title: t("footer.followUs"),
//               icon: Share,
//               links: [],
//             },
//           ].map((section, index) => (
//             <div key={index} className="footer-section">
//               <div className="footer-section-header">
//                 <section.icon className="footer-section-icon" />
//                 <h4 className="footer-section-title">{section.title}</h4>
//               </div>
//               {section.customContent ? (
//                 section.customContent
//               ) : section.links.length > 0 ? (
//                 <ul className="footer-links">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <Link to={link.to} className="footer-link">
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="footer-social-links">
//                   {socialMediaLinks.map(
//                     ({ Icon, color, href, target, rel, label }, idx) => (
//                       <a
//                         key={idx}
//                         href={href}
//                         target={target}
//                         rel={rel}
//                         aria-label={label}
//                         className="footer-social-link"
//                       >
//                         <Icon className={`footer-social-icon ${color}`} />
//                       </a>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="footer-bottom">
//           <div className="footer-bottom-content">
//             <p className="footer-bottom-text">{t("footer.copyright")}</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bus, MapPin, Clock, Globe, Share, Mail, X, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/footer.css";
import { socialMediaLinks } from "../utils/translationKeyMap";

function Footer() {
  const { t } = useTranslation();

  // 🕓 Current Time & Date
  const [currentTime, setCurrentTime] = useState(new Date());

  // 📧 Newsletter State
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // 📄 License Modal State
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showLicenseModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLicenseModal]);

  // 📩 Newsletter Subscription Handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setSubscriptionStatus(t("newsletter.enterEmail"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionStatus(t("newsletter.invalidEmail"));
      return;
    }

    setIsLoading(true);
    setSubscriptionStatus("");

    try {
      const API_BASE_URL = "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionStatus(t("newsletter.success"));
        setEmail("");
      } else {
        setSubscriptionStatus(data.message || t("newsletter.error"));
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscriptionStatus(t("newsletter.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className="footer w-full">
        <div className="footer-bg-overlay" />

        {/* 🕓 Time & Date Display */}
        <div className="footer-time">
          <div className="footer-time-content">
            <Globe className="footer-time-icon" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="footer-date-content">
            <Clock className="footer-date-icon" />
            <span>{currentTime.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="footer-container">
          {/* 🚍 Header */}
          <div className="footer-header">
            <div className="footer-logo">
              <Bus className="footer-logo-icon" />
              <h2 className="footer-title">Haryana Roadways</h2>
            </div>
          </div>

          {/* 🟩 Newsletter Subscription Section */}
          <div className="footer-newsletter">
            <div className="footer-newsletter-header">
              <Mail className="footer-newsletter-icon" />
              <h3>{t("footer.newsletterTitle") || "Subscribe to our Newsletter"}</h3>
            </div>

            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder") || "Enter your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="footer-newsletter-input"
                />
                <div className="footer-newsletter-buttons">
                  <button type="submit" className="footer-newsletter-btn">
                    {t("footer.subscribe") || "Subscribe"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmail("")}
                    className="footer-newsletter-cancel"
                  >
                    {t("footer.noThanks") || "No Thanks"}
                  </button>
                </div>
                <p className="footer-newsletter-terms">
                  By subscribing, you agree to our{" "}
                  <Link to="/policy" className="footer-link">
                    {t("footer.privacyPolicy") || "Privacy Policy"}
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="footer-link">
                    {t("footer.termsOfService") || "Terms of Service"}
                  </Link>.
                </p>
              </form>
            ) : (
              <p className="footer-newsletter-success">
                {t("footer.subscribedMessage") ||
                  "Thank you for subscribing! You'll hear from us soon."}
              </p>
            )}
          </div>

          {/* 📚 Footer Sections */}
          <div className="footer-sections">
            {[
              {
                title: t("footer.company"),
                icon: MapPin,
                links: [
                  { label: t("nav.about"), to: "/about" },
                  { label: t("nav.services"), to: "/services" },
                  { label: t("footer.privacy"), to: "/policy" },
                  { label: t("affiliate.title"), to: "/affiliate" },
                ],
              },
              {
                title: t("footer.getHelp"),
                icon: Bus,
                links: [
                  { label: t("reviews.title"), to: "/reviews" },
                  { label: t("nav.contact"), to: "/contact" },
                  { label: t("nav.track"), to: "/track" },
                  { label: t("payment.title"), to: "/payment" },
                ],
              },
              {
                title: t("footer.rides"),
                icon: Globe,
                links: [
                  { label: t("nav.trip"), to: "/trip" },
                  { label: t("footer.luxury"), to: "/luxury" },
                  { label: t("nav.travellocations"), to: "/travellocations" },
                  { label: t("nav.bestrides"), to: "/bestrides" },
                ],
              },
              {
                title: t("footer.followUs"),
                icon: Share,
                customContent: (
                  <div className="footer-social-links">
                    {socialMediaLinks.map(
                      ({ Icon, color, href, target, rel, label }, idx) => (
                        <a
                          key={idx}
                          href={href}
                          target={target}
                          rel={rel}
                          aria-label={label}
                          className="footer-social-link"
                        >
                          <Icon className={`footer-social-icon ${color}`} />
                        </a>
                      )
                    )}
                  </div>
                ),
              },
            ].map((section, index) => (
              <div key={index} className="footer-section">
                <div className="footer-section-header">
                  <section.icon className="footer-section-icon" />
                  <h4 className="footer-section-title">{section.title}</h4>
                </div>
                {section.customContent ? (
                  section.customContent
                ) : (
                  <ul className="footer-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link to={link.to} className="footer-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* 🟫 Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-bottom-text">
                {t("footer.copyright")} • All Rights Reserved •{" "}
                <button
                  onClick={() => setShowLicenseModal(true)}
                  className="footer-license-btn"
                  aria-label="View License"
                >
                  <FileText size={16} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} />
                  GPL v3 License
                </button>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 📄 License Modal */}
      {showLicenseModal && (
        <div className="license-modal-overlay" onClick={() => setShowLicenseModal(false)}>
          <div className="license-modal" onClick={(e) => e.stopPropagation()}>
            <div className="license-modal-header">
              <div className="license-modal-title-wrapper">
                <FileText className="license-modal-icon" />
                <h2 className="license-modal-title">GNU General Public License v3.0</h2>
              </div>
              <button
                onClick={() => setShowLicenseModal(false)}
                className="license-modal-close"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="license-modal-content">
              <pre className="license-text">
{`                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

Copyright (C) 2025 Nishant Rana

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;