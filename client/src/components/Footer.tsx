import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp
  } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
      <footer className="bg-[#09442d] text-[#f8f7e8] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#b9ff66] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#b9ff66] transition">Careers</a></li>
                <li><a href="#" className="hover:text-[#b9ff66] transition">Contact</a></li>
              </ul>
            </div>
  
            {/* Column 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#b9ff66] transition">Blog</a></li>
                <li><a href="#" className="hover:text-[#b9ff66] transition">FAQ</a></li>
                <li><a href="#" className="hover:text-[#b9ff66] transition">Documentation</a></li>
              </ul>
            </div>
  
            {/* Column 3 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#b9ff66] transition">Privacy</a></li>
                <li><a href="#" className="hover:text-[#b9ff66] transition">Terms</a></li>
                <li><a href="#" className="hover:text-[#b9ff66] transition">Security</a></li>
              </ul>
            </div>
  
            {/* Column 4 - Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="p-2 rounded text-[#333]"
                />
                <button className="bg-[#b9ff66] text-[#09442d] px-4 py-2 rounded hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
  
          {/* Bottom section */}
          <div className="border-t border-[#b9ff66]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex text-2xl space-x-6">
              <a href="#" className="hover:text-[#b9ff66] transition rounded-full"><FaInstagram/></a>
              <a href="#" className="hover:text-[#b9ff66] transition rounded-full"><FaFacebookF/></a>
              <a href="#" className="hover:text-[#b9ff66] transition rounded-full"><FaWhatsapp/></a>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} HopeHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;
