import React from 'react';

function Footer() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Company Logo */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <span style={{ color: '#000' }}>UC</span> Urban Company
          </h2>
        </div>

        {/* Company Links */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>About us</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Investor Relations</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Terms & conditions</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Privacy policy</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Anti-discrimination policy</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>ESG Impact</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Careers</a></li>
          </ul>
        </div>

        {/* For Customers */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>For customers</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>UC reviews</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Categories near you</a></li>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Contact us</a></li>
          </ul>
        </div>

        {/* For Professionals */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>For professionals</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Register as a professional</a></li>
          </ul>
        </div>

        {/* Social Links and App Downloads */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Social links</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/twitter.png" alt="Twitter" /></a>
            <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/instagram-new.png" alt="Instagram" /></a>
            <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/linkedin.png" alt="LinkedIn" /></a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#">
              <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" style={{ width: '120px' }} />
            </a>
            <a href="#">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" style={{ width: '140px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>
          * As on December 31, 2024
        </p>
        <p>
          © Copyright 2025 Urban Company Ltd. (formerly known as UrbanClap Technologies INDIA LIMITED and UrbanClap Technologies INDIA INDIA LIMITED). All rights reserved. | CIN: U71440DL2014PTC2714413
        </p>
      </div>
    </div>
  );
}

export default Footer;