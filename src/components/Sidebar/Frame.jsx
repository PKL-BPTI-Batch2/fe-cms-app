import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PeopleIcon from '@mui/icons-material/People';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Menu,MenuItem, Tooltip } from '@mui/material';
import { Logout,   Settings } from '@mui/icons-material';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  {path: "/", label: "Dashboard", icon: <HomeIcon sx={{color:'#fff'}}/>},
  {path: "/news", label: "News", icon:<ArticleIcon sx={{color:'#fff'}}/> },
  {path: "/pages", label: "Pages", icon: <LayersIcon sx={{color:'#fff'}}/>},
  {path: "/menus", label: "Menus", icon: <MenuBookIcon sx={{color:'#fff'}}/>},
  {path: "/media-library", label: "Media Library", icon: <PermMediaIcon sx={{color:'#fff'}}/>},
  {path: "/users", label: "Users", icon: <PeopleIcon sx={{color:'#fff'}}/>},
]

export default function Frame({children}) {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);

  const handleLabel = menuItems.find((item) => item.path === location.pathname)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const profile = Boolean(anchorEl);
  const handleOpenProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar sx={{bgcolor:'rgba(255, 255, 255, 1)'}}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <div style={{
            alignItems:'center',
            display:'flex',
            justifyContent:'space-between',
            width:'100%'
          }}>
          <Typography variant="h6" noWrap component="div" color='black'>
          {handleLabel ? handleLabel.label : 'cms'}
          </Typography>
          <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleOpenProfile}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={profile}
        onClose={handleCloseProfile}
        onClick={handleCloseProfile}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseProfile} >
          <Avatar /> Profile
        </MenuItem>    
        <Divider />
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
    </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor:'#111139ff',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader  sx={{
          bgcolor:'#111139ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2
        }}>
          <Typography variant='h6' color='#fff' >CMS APP</Typography>
          <IconButton onClick={handleDrawerClose} sx={{color: '#fff'}}>
            <KeyboardDoubleArrowLeftIcon fontSize='medium' /> 
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
         {menuItems.map((item, index) => (
            <Link to={item.path}key={index}>
            <ListItem  >
              <ListItemButton
              
              sx={{
                borderRadius:2,
                bgcolor: location.pathname === item.path ? '#2aa1d1ff' : '#111139ff',
                '&:hover': {
                backgroundColor: '#333366'
              },
              }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{color:'#fff'}}/>
              </ListItemButton>
            </ListItem>
            <Divider />
            </Link>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
        
      </Main>
    </Box>
  );
}
