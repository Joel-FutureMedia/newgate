import { Link, useLocation } from "react-router-dom";
import { Phone, Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ContactForm from "./ContactForm";

const Header = () => {
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/services", label: "Services" },
    { path: "/news", label: "News" },
    { path: "/about", label: "About us" },
  ];

  return (
    <>
      <header className="w-full py-0 px-2 fixed top-4 left-0 right-0 z-50 flex justify-center">
        <nav className="bg-primary rounded-full px-6 md:px-8 py-0.5 md:py-1 shadow-medium flex items-center justify-between max-w-[90%] w-full">
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Newgate Investments" className="h-14 md:h-16 w-auto" />
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm md:text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-2.5 flex-1 justify-end">
            <a
              href="tel:+264612222222"
              className="hidden md:flex items-center gap-1.5 text-white hover:text-white/90 transition-colors rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">+264 61 222 222</span>
            </a>
            <Button
              onClick={() => setIsContactOpen(true)}
              className="hidden md:inline-flex rounded-full bg-white text-primary hover:bg-white/90 px-3 md:px-4 py-1 text-xs font-medium"
            >
              Contact Us
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        isActive(link.path)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="tel:+264612222222"
                    className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5" />
                    +264 61 222 222
                  </a>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="w-full rounded-lg bg-primary text-white hover:bg-primary/90"
                  >
                    Contact Us
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <ContactForm onSuccess={() => setIsContactOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
