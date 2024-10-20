import React from "react";
import "../../../index.css"
function Footer() {
  return (
    <footer className="bg-black text-white py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">NXTBooking Business</h4>
            <ul>
              <li className="mb-2"><a href="/teach" className="hover:text-red-500">Social Media</a></li>
              <li className="mb-2"><a href="/app" className="hover:text-red-500">Get the app</a></li>
              <li className="mb-2"><a href="/about" className="hover:text-red-500">About us</a></li>
              <li><a href="/contact" className="hover:text-red-500">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Company</h4>
            <ul>
              <li className="mb-2"><a href="/careers" className="hover:text-red-500">Careers</a></li>
              <li className="mb-2"><a href="/blog" className="hover:text-red-500">Blog</a></li>
              <li className="mb-2"><a href="/support" className="hover:text-red-500">Help and Support</a></li>
              <li className="mb-2"><a href="/affiliate" className="hover:text-red-500">Affiliate</a></li>
              <li><a href="/investors" className="hover:text-red-500">Investors</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Legal</h4>
            <ul>
              <li className="mb-2"><a href="/terms" className="hover:text-red-500">Terms</a></li>
              <li className="mb-2"><a href="/privacy" className="hover:text-red-500">Privacy policy</a></li>
              <li className="mb-2"><a href="/cookies" className="hover:text-red-500">Cookie settings</a></li>
              <li className="mb-2"><a href="/sitemap" className="hover:text-red-500">Sitemap</a></li>
              <li><a href="/accessibility" className="hover:text-red-500">Accessibility statement</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
          <button className="border border-white text-white py-2 px-4 hover:border-red-500 hover:text-red-500">
            English
          </button>
          <p className="text-sm">&copy; {new Date().getFullYear()} NXTBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

