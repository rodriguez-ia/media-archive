import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsIcon from '@mui/icons-material/Collections';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import PersonIcon from '@mui/icons-material/Person';

function SideNavBar() {
  const drawerWidth = '15vw';

  const pageIconMap = {
    Dashboard: DashboardIcon,
    Library: CollectionsIcon,
    Discover: ImageSearchIcon
  };

  const DrawerList = (
    <Box>
      <List>
        {['Dashboard', 'Library', 'Discover'].map((text) => {
          const Icon = pageIconMap[text];

          return (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer variant='persistent'
            open
            sx={{
              width: drawerWidth,
              flexShrink: 0,

              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box"
              }
            }}>
      {DrawerList}
    </Drawer>
  );
}

export default SideNavBar;