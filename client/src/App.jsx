import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';

import Posts from './components/Posts/Post';
import Form from './components/Form/Form';

import memories from './images/memories.png';

function App() {

  return (
    <Container maxwidth='lg'>
      <AppBar position='static' color='inherit'>
        <Typography variant="h2" align="center">
          Memories
        </Typography>
        <img src={memories} alt="memories" height={60}/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;
