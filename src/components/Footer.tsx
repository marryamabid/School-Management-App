"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Smart<span className="text-lamaPurple">Learn</span>
          </h2>
          <p className="text-sm leading-relaxed">
            SmartLearn is your digital learning companion, helping students
            access smarter education through technology, innovation, and
            creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-lamaPurple transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="hover:text-lamaPurple transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-lamaPurple transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-lamaPurple" />
              <span>support@smartlearn.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-lamaPurple" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-lamaPurple" />
              <span>Lahore, Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-lamaPurple transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-lamaPurple transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-lamaPurple transition-colors">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SmartLearn. All rights reserved.
      </div>
    </footer>
  );
}
