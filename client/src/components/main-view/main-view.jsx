import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

import './main-view.scss';


//Declares the component by extending the React Component class to inherit all of its lifecyle methods
export class MainView extends React.Component {
    constructor() {
    //Call the superclass constructor
    //so React can initialize it
        super();

    //Initialize the state to an empty object so we can destructure it later
        this.state = {
            user: null
    };
}

  componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
          this.setState({
              user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
      }
  }

    getMovies(token) {
        axios.get('https://myflix-movie-application.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    onLoggedIn(authData) {
        console.log(authData)
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
    }

    render() {

        let { movies } = this.props;
        let { user } = this.state;

        return (

          <Container>
            <Router>
                <div className="main-view row">


                <Container>
                    <Navbar variant='dark' expand='lg'>

                        <Navbar.Brand href='/'>myFlix</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />

                        <Navbar.Collapse id='basic-navbar-nav'>

                            <Nav>
                                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                                <Nav.Link as={Link} to='/users/:username'>Profile</Nav.Link>
                                <Nav.Link onClick={()=> this.logOut()}>Logout</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>

                    </Navbar>
                </Container>

                    <Route exact path='/' render={() => {
                          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                          return <MoviesList movies={movies} />;
                      }} />

                    <Route exact path='/register' render={() => <RegistrationView />}/>

                    <Route path='/movies/:movieID' render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieID)} />} />

                    <Route path='/movies/genre/:Name' render={({ match }) => {
                        if (!movies) return <div className='main-view' />;
                        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} />
                    }} />

                    <Route path='/movies/director/:Name' render={({ match }) => {
                        if (!movies) return <div className='main-view' />;
                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} />
                    }} />

                    <Route exact path='/users/:username' render={() => <ProfileView movies={movies} />} />

                    <Route path='/users/:username/update' render={() => <UpdateProfile movies={movies} />} />

                </div>
            </Router>
        </Container>
    );
  }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
