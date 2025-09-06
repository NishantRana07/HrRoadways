import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      const section = document.getElementById('mainSection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} className='w-full bg-[#1A202C]'>

      <img src="https://i.ibb.co/kg3RQQ1S/LogoHR.png" alt="Haryana Roadways" style={{ height: '40px', marginRight: '8px' }} />
      <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Haryana Roadways</span>
    </div>
  );
};

export default Header;
