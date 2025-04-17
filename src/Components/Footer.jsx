import React from 'react'

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t-2 border-black-300 flex justify-between items-center flex-wrap gap-5">
      {/* <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div> */}

      <div className="flex gap-3">
        {/* <div className="social-icon">
          <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
        </div> */}
        <div className="social-icon">
          <a
            href="https://www.instagram.com/innovesta.mitblr/profilecard"
            className="text-white flex p-1"
          >
            <img
              src="assets/instagram.svg"
              alt="instagram"
              className="w-6 h-6"
            />
          </a>
        </div>
        <div className="social-icon">
          <a
            href="https://www.linkedin.com/company/innovestamitblr"
            className="text-white flex p-1"
          >
            <img
              src="assets/linkedin.svg"
              alt="linkedin"
              className="w-7 h-7"
            />
          </a>
        </div>
      </div>

      <p className="text-white-500">Copyright © 2024 Innovesta Club MIT Bengaluru - All rights reserved.</p>
    </footer>
  );
};

export default Footer;