import React, { useEffect, useRef, useState } from 'react';
import { IconButton, AppBar, Toolbar, Collapse, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserInfo } from '../UserInfo';
import * as theme from '../../../theme';
import { Navigation } from '../Navigation';
import { useGetUserData } from '../../hooks/userHooks';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMatchesDesctop = useMediaQuery(theme.MEDIA.desktop);
  const isMatchesTablet = useMediaQuery(theme.MEDIA.tablet);
  const isMatchesMobile = useMediaQuery(theme.MEDIA.mobile);
  const isMatchesMobileOrTablet = isMatchesMobile || isMatchesTablet;

  const { data } = useGetUserData();

  const appBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocumentClickHandler = (e: MouseEvent) => {
      if (e.target instanceof Node && !appBarRef.current?.contains(e.target)) {
        setIsNavOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', onDocumentClickHandler);
    return () => document.removeEventListener('click', onDocumentClickHandler);
  }, []);

  const navHandleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const menuHandleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const collapseMinHeight = '140px';

  return (
    <AppBar sx={{ p: theme.SPACES.s }} ref={appBarRef}>
      {isMatchesMobileOrTablet && (
        <Toolbar
          sx={{ justifyContent: 'space-between', alignItems: 'start' }}
          disableGutters
          variant="dense"
        >
          <Box>
            <IconButton size="large" onClick={navHandleClick} color="inherit">
              <MenuIcon />
            </IconButton>
            <Collapse
              in={isNavOpen}
              timeout="auto"
              unmountOnExit
              style={{ minHeight: collapseMinHeight }}
            >
              <Navigation closeNav={navHandleClick} />
            </Collapse>
          </Box>
          {data?.user && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end'
              }}
            >
              <IconButton size="large" onClick={menuHandleClick} color="inherit">
                <AccountCircle />
              </IconButton>
              <Collapse
                in={isMenuOpen}
                timeout="auto"
                unmountOnExit
                style={{ minHeight: collapseMinHeight }}
              >
                <UserInfo closeMenu={menuHandleClick} />
              </Collapse>
            </Box>
          )}
        </Toolbar>
      )}
      {isMatchesDesctop && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Navigation closeNav={navHandleClick} />
          <UserInfo closeMenu={menuHandleClick} />
        </Box>
      )}
    </AppBar>
  );
};
