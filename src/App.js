import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import './css/App.css';
import Messages from './component/Messages';
function Copyright() {
  return (
    <Typography variant="body2"  align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Company
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function App() {
  return (
    <div className="App">
      <Container>
        <Typography variant="h3" noWrap >
          Voicemail box's messages
          </Typography>
          {/*Table Voicemail*/}
          <Messages/>
        <Box pt={4} className="footer">
          <Copyright />
        </Box>
      </Container>


    </div>
  );
}

export default App;
