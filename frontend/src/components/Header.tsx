import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Command, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "About", path: "/aboutus" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact us", path: "/contactus" },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-200">
      {/* SaaS Top Banner (Optional - common in SaaS for updates) */}
      <div className="bg-yellow-400 py-1.5 text-center text-[11px] font-bold uppercase tracking-widest text-black">
        New: Two Min Web AI is now in Beta →
      </div>

      <div className={`w-full border-b transition-all duration-300 ${
        scrolled 
          ? "bg-black/70 backdrop-blur-xl border-white/10 py-3" 
          : "bg-black border-transparent py-5"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-white p-1.5 rounded-md group-hover:bg-yellow-400 transition-colors">
              <Command size={18} className="text-black" />
            </div>
            <span className="text-white font-semibold tracking-tight text-lg">
              TwoMin<span className="text-gray-500 font-medium">Web</span>
            </span>
          </Link>

          {/* SaaS Centered Navigation (The "Dock" Style) */}
          <nav className="hidden md:flex items-center bg-white/[0.03] border border-white/10 px-1.5 py-1 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  location.pathname === link.path 
                    ? "bg-white/10 text-white shadow-sm" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="hidden sm:block text-[13px] font-medium text-gray-400 hover:text-white px-3 py-1.5 transition"
            >
              Sign in
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-black text-[13px] font-bold px-4 py-1.5 rounded-md hover:bg-yellow-400 transition-all active:scale-[0.98]"
            >
              Start Free
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-2 text-gray-400 hover:text-white"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[100px] bg-black z-[-1] md:hidden px-6"
          >
            <div className="flex flex-col gap-1 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/5 text-xl font-medium text-white group"
                >
                  {link.name}
                  <ChevronRight size={20} className="text-gray-600 group-hover:text-yellow-400" />
                </Link>
              ))}
              <div className="mt-8 flex flex-col gap-4">
                <Link to="/register" className="w-full bg-white text-black text-center py-4 rounded-xl font-bold">
                  Get Started
                </Link>
                <Link to="/login" className="w-full border border-white/10 text-white text-center py-4 rounded-xl font-bold">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;