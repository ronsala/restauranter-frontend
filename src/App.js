import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Home from './components/Home'
import AppBarMain from './components/AppBarMain';
import RestaurantsContainer from './features/restaurants/RestaurantsContainer';
import Restaurant from './features/restaurants/Restaurant';

function App() {
  return (
    <Router>
      <div>
        <Container>
          <Box>
            <Grid 
              container 
              spacing={2}
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={12}>
                <AppBarMain />
              </Grid>
              <Switch>
                <Route path="/restaurants" component={RestaurantsContainer} />
                <Route exact path="/" component={Home} />
              </Switch>
            </Grid>
          </Box>
        </Container>

      </div>
    </Router>
  );
}

export default App;
