import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Logo from '../assets/logo.svg';
import NetxIcon from '../assets/netx.svg';
import IpIcon from '../assets/ip.svg'; 
import { Avatar, Badge, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import axios from 'axios';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector , useDispatch } from 'react-redux';
import {  openSidebar , closeSidebar } from '../Store/store';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
type SidebarItems = {
  title: string, 
  icon: string
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar({children} : {children: any}) {
  const theme = useTheme();

  const SidebarItems: SidebarItems[] = [
    {
      title: 'NetX', 
      icon: NetxIcon 
    },
    {
      title: 'NetGraph', 
      icon: NetxIcon 
    }, 
    {
      title: 'IP Subnet Calculater', 
      icon: IpIcon 
    }, 
  ]
  
  // const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state: any) => state.sidebar.isSidebarOpen); 

  const handleDrawerOpen = () => {    
    dispatch(openSidebar());
  };

  const handleDrawerClose = () => {
    dispatch(closeSidebar())
  };

  const { user , isLoading , loginWithRedirect , isAuthenticated , logout , getAccessTokenSilently } = useAuth0();

  const getUserToken = async () => {
        console.log("GET USER TOKEN");
        if(isAuthenticated) {
          try {
            const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_INDENTIFIER,
              scope:'openid'
            },
          })
          } catch (error) {
            console.log("ERROR WITH GET TOKEN");
            console.error(error)
          }
        }
        else {
          loginWithRedirect()
        }

      
    //   axios.get('https://dev-ahuld6ubcjhsdks5.us.auth0.com/authorize', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //     }
    // })
    // .then(response => console.log(response.data))
    // .catch(error => console.error(error));
  }

  const handleLogout = () => {
    logout();
  }


  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={isSidebarOpen} sx={{backgroundColor: "#6680D9" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" onClick={() => getUserToken()}>
            Persistent drawer
          </Typography>
          <Box sx={{ paddingLeft: '40px' ,  flex: 1 , alignItems: 'center' , display: { xs: 'none', md: 'flex' } }}>
            <SearchIcon sx={{ color: 'white', mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{ color: 'white', '&::placeholder': { color: 'white', opacity: 0.7 } }}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ color: 'white' }} onClick={() => handleLogout()}>
              <LogoutIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: 'white', ml: 1 }}>
              <Avatar alt="User" src={user?.picture} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        <DrawerHeader sx={{justifyContent: 'space-between' , alignItems: 'center'}}>
          <img src={Logo} alt='Logo'/>
          <IconButton onClick={handleDrawerClose} sx={{ '&:hover': { backgroundColor: '#9EADEA' , color: 'white' } }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Typography textAlign={'left'} paddingLeft={'8px'} color={"#A8AABC"}> Tools </Typography>
         <List sx={{borderRadius: '8px' }}>
          {SidebarItems.map((item) => (
            <ListItem sx={{ '&:hover': { backgroundColor: '#9EADEA' , color: 'white' } }} key={item.title} disablePadding>
              <ListItemButton sx={{ borderRadius: '8px' , gap:'20px'}}>
                <img src={item.icon}/>
                <ListItemText primary={item.title} sx={{ color: 'inherit', fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={isSidebarOpen} sx={{height: '100vh' , background: '#EEE' , padding: '0', textAlign: 'left'}}>
        <DrawerHeader />
          {children}
      </Main>
    </Box>
  );
}