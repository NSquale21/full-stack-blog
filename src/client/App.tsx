import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Admin from './pages/Admin';
import Edit from './pages/Edit';
import Details from './pages/Details';
import TagFilter from './pages/TagFilter';
import SearchResults from './pages/SearchResults';
import NavBar from './components/NavBar';
import JumboTron from './components/JumboTron';
import Footer from './components/Footer';

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
					<Route exact path="/compose">
						<Compose /> 
					</Route>
					<Route exact path="/admin">
						<Admin /> 
					</Route>
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
