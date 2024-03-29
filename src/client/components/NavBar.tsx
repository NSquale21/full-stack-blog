import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Token, logout } from '../utils/api-services';
import { NavLink } from 'react-router-dom';
import { Nav, Col } from 'react-bootstrap';

const NavBar = () => {
	
	const history = useHistory();
	const location = useLocation();

	const [show, setShow] = React.useState(false);
	const [query, setQuery] = React.useState('');

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

	const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.which === 13) {
			history.push({ 
				pathname: '/search', 
				search: `?query=${query}`,
				state: { query }
			});
		}
	};
	
	return (
		<header className="row my-5">
			<Col>
				<Nav className="justify-content-between border-bottom p-2" activeKey="/home">
					<Nav.Item>
						<NavLink 
							onClick={() => setShow(false)}
							className="nav-link" 
							exact to="/" 
							activeClassName="text-secondary">
							Home
						</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink
							onClick={() => setShow(false)}
							className="nav-link" 
							to="/contact" 
							activeClassName="text-secondary">
							Contact
						</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink 
							onClick={() => setShow(false)}
							className="nav-link" 
							to="/donate" 
							activeClassName="text-secondary">Donate</NavLink>
					</Nav.Item>
					{ Token && 
					<Nav.Item>
							<NavLink
								onClick={() => setShow(false)}
								className="nav-link" 
								to="/profile" 
								activeClassName="text-secondary">
								Profile
							</NavLink>
					</Nav.Item>
					}
					<Nav.Item>
						{Token ? (
							<NavLink 
								onClick={() => {
									setShow(false);
									logout()}}
								className="nav-link" 
								exact to="/">
								Logout
							</NavLink>
						) : (
							<NavLink 
								onClick={() => setShow(false)}
								className="nav-link" 
								to="/login" 
								activeClassName="text-secondary">
								Login
							</NavLink>)}
					</Nav.Item>
					<Nav.Item>
						<NavLink 
							onClick={() => setShow(!show)}
							className="nav-link" 
							to="#">
							Search
						</NavLink>
					</Nav.Item>
				</Nav>
				<input 
					type="text" 
					placeholder="Search"
					value={query}
					onChange={handleQueryChange}
					onKeyPress={enterPress}
					className={`search-bar ${show ? 'search-bar-active' : ''}`} />
			</Col>
		</header>
	);
};

export default NavBar;