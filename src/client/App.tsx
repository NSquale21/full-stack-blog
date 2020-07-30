import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Details from './pages/Details';
import Contact from './pages/Contact'
import TagFilter from './pages/TagFilter';
import SearchResults from './pages/SearchResults';
import NavBar from './components/NavBar';
import JumboTron from './components/JumboTron';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC<IAppProps> = () => {
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
					<Route exact path="/profile">
						<Profile /> 
					</Route>
					<Route exact path="/contact">
						<Contact /> 
					</Route>
					<PrivateRoute exact path="/compose">
						<Compose /> 
					</PrivateRoute>
					<PrivateRoute exact path="/admin">
						<Admin /> 
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
}

export interface IAppProps {}

export default App;
