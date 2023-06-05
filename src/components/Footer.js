import React from 'react'
import '../styles/Footer.css'

import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="https://twitter.com/your-twitter-link">
            <TwitterIcon />
        </a>
        <a href="https://github.com/4bhish">
            <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/abhishek-hadimani/">
            <LinkedInIcon />
        </a>
      </div>
      <p className="footer__text">by Abhishek Hadimani</p>
    </footer>
  )
}

export default Footer
