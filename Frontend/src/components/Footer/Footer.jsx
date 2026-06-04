// src/components/Footer/Footer.jsx
import { Leaf, Heart, AtSign, MessageCircle, Briefcase, ThumbsUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">

          {/* Brand */}
          <div>
            <div className="footer-brand-logo">
              <span className="footer-brand-logo-icon">
                <Leaf size={16} strokeWidth={2.5} color="#fff" />
              </span>
              SavePlate
            </div>
            <p className="footer-tagline">
              Fighting food waste, one plate at a time. Join thousands of businesses
              and individuals making a difference every single day.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Contact us"><AtSign size={16} strokeWidth={1.8} /></a>
              <a href="#" className="social-btn" aria-label="Messages"><MessageCircle size={16} strokeWidth={1.8} /></a>
              <a href="#" className="social-btn" aria-label="Careers"><Briefcase size={16} strokeWidth={1.8} /></a>
              <a href="#" className="social-btn" aria-label="Support"><ThumbsUp size={16} strokeWidth={1.8} /></a>
            </div>
          </div>

          {/* Platform */}
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              {/* TODO: link to /browse once router is set up */}
              <li><a href="#">Browse food</a></li>
              <li><a href="#">List surplus</a></li>
              <li><a href="#">Charity hub</a></li>
              <li><a href="#">Mobile app</a></li>
              <li><a href="#">API access</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press kit</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help centre</a></li>
              <li><a href="#contact">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Cookie settings</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2025 SavePlate Ltd. All rights reserved.</span>
          <span>
            Made with{' '}
            <Heart size={13} className="footer-bottom-heart" />{' '}
            for the planet
          </span>
        </div>
      </div>
    </footer>
  );
}
