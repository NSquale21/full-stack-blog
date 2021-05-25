import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Details from './pages/Details';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import TagFilter from './pages/TagFilter';
import SearchResults from './pages/SearchResults';
import NavBar from './components/NavBar';
import JumboTron from './components/JumboTron';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
	return (
		<BrowserRouter>
			<JumboTron />
			<Container>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/blogs/details/:id/:title?">
						<Details /> 
					</Route>
					<Route exact path="/blogs/edit/:id">
						<Edit /> 
					</Route>
					<Route exact path="/login">
						<Login /> 
					</Route>
					<Route exact path="/register">
						<Register /> 
					</Route>
					<Route exact path="/contact">
						<Contact /> 
					</Route>
					<Route exact path="/donate">
						<Donate /> 
					</Route>
					<PrivateRoute exact path="/compose">
						<Compose /> 
					</PrivateRoute>
					<PrivateRoute exact path="/profile">
						<Profile /> 
					</PrivateRoute>
					<Route exact path="/tags/:id">
						<TagFilter /> 
					</Route>
					<Route exact path="/search">
						<SearchResults />
					</Route>
				</Switch>
			</Container>
			<Footer />
		</BrowserRouter>
	);
};

const style = [
	'background: linear-gradient(#0091ea, #19272f)',
	'border: 1px solid #0091ea',
	'color: white',
	'padding: 1px 5px',
	'display: block',
	'line-height: 40px',
	'text-align: center',
	'font-weight: bold',
	'font-size: large'
  ].join(';');
  console.log('%cI am looking to get hired...if you like my project, we should talk!', style);
  console.log('%cContact me at:', style);
  console.log('%cNSquale212@gmail.com', style);

export default App;