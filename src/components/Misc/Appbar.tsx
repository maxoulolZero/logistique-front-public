import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

export default function Appbar() {
  return (

      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{backgroundColor: '#282c34'}}>
          <Toolbar>
            <nav style={{display: 'flex', justifyContent: 'space-evenly', flexGrow: 1}}>
              <Link className="navlink" to="/stocks">
                Stocks
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
      </Box>
  );
}