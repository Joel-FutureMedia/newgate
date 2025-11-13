import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <img src={logo} alt="Newgate Investments" className="h-24 w-auto mb-4" />
            <p className="text-white/80 text-sm">
              Building Namibia's future through strategic real estate investment and development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="/projects" className="text-white/80 hover:text-white transition-colors">Projects</a></li>
              <li><a href="/services" className="text-white/80 hover:text-white transition-colors">Services</a></li>
              <li><a href="/news" className="text-white/80 hover:text-white transition-colors">News</a></li>
              <li><a href="/about" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Real Estate Investment</li>
              <li>Construction Management</li>
              <li>Property Design</li>
              <li>Development Consulting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">Windhoek, Namibia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/80 flex-shrink-0" />
                <a href="tel:+264618291310" className="text-white/80 hover:text-white text-sm transition-colors">
                  +264 61 829 1310
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/80 flex-shrink-0" />
                <a href="mailto:info@newgate.com.na" className="text-white/80 hover:text-white text-sm transition-colors">
                  info@newgate.com.na
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Newgate Investments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
