import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#68b5c2] text-white py-8 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Assistive Equipment Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Assistive Equipment</h2>
            <p className="text-sm">
              Helping improve lives through innovative assistive devices.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul>
              <li>
                <a
                  href="/about"
                  className="text-sm hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-sm hover:underline"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Support</h2>
            <ul>
              <li>
                <a
                  href="/faq"
                  className="text-sm hover:underline"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm hover:underline"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://facebook.com" className="text-white hover:text-gray-200">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="text-white hover:text-gray-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="text-white hover:text-gray-200">
              <FaInstagram />
            </a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Assistive Equipment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
