import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
];

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Twitter / X" },
  { href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__accent-line" />
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <Image
                src="/logo.png"
                alt="VSC Logo"
                width={50}
                height={50}
                className="footer__logo-img"
              />
              <div>
                <h3 className="footer__logo-title">
                  Vivekanand Study Circle
                </h3>
                <p className="footer__logo-subtitle">NIT Patna</p>
              </div>
            </Link>
            <p className="footer__description">
              Inspired by the timeless wisdom of Swami Vivekananda, we are a
              dynamic student community dedicated to building a brighter future
              through knowledge, service, and leadership.
            </p>
            <p className="footer__quote">
              &quot;Arise, awake, and stop not till the goal is reached.&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer__col">
            <h4 className="footer__col-title">Follow Us</h4>
            <ul className="footer__list">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <MapPin size={16} />
                <span>NIT Patna, Ashok Rajpath, Patna, Bihar 800005</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} />
                <span>vsc@nitp.ac.in</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Vivekanand Study Circle, NIT
            Patna. All rights reserved.
          </p>
          <p className="footer__credits">
            Built with ❤️ by VSC Tech Team
          </p>
        </div>
      </div>
    </footer>
  );
}
