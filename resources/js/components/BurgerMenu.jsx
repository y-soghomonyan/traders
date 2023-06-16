import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Link, useNavigate, useLocation } from "react-router-dom";
import requireAuth from './requireAuth';
import LogoutButton from './user/LogoutButton';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const toggleMenu = () => {
    setOpen(!open);
  };

  const socials = t('menu', { returnObjects: true });

  const handleLogout = () => {
    navigate('/login');
  };

  const user =  requireAuth();

  useEffect(() => {

    if (user == 'error' && location.pathname !== '/login') {
      window.location.href = 'login';
      // navigate('/login');

    }
  }, [user, location.pathname, navigate]);

  return (
    <nav className="navbar navbar-header navbar-expand-lg navbar-light py-2 px-3">
      <a className="navbar-brand" href="/">
        <img src="/img/logo.png" alt="" className="header_logo" />
      </a>
      <button
        className={`navbar-toggler ${open ? 'collapsed' : ''}`}
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarSupportedContent"
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {socials.map((social, i) => (
            <li className="nav-item" key={i}>
              <Link to={social.link} className="nav-link">{social.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <LanguageSwitcher />

      {user != 'error' ? (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                Dashboard
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>
                  <Link to={'/profile'} className="nav-link">Profile</Link>
                </MenuItem>
                <MenuItem onClick={popupState.close}>My account</MenuItem>
                <MenuItem >
                  <LogoutButton/>
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      ) : null}
    </nav>
  );
};

export default BurgerMenu;
