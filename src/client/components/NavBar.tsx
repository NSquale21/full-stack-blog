import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { IBlog } from '../utils/interfaces';
import { Nav, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<INavBarProps> = () => {
	
	const [show, setShow] = React.useState(false);
	const [query, setQuery] = React.useState('');
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);

	const history = useHistory();

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

	React.useEffect(() => {
		(async () => {
			let res = await fetch('/api/blogs');
			if (res.ok) {
				let data: IBlog[] = await res.json();
				let blogs = data.map(blog => ({ id: blog.id, title: blog.title }));
				setBlogs(blogs);
			}
		})();
	}, []);
	
	const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.which === 13) {
			history.push({ 
				pathname: '/search', 
				search: `?query=${query}`,
				state: { query }
			});
		}
	}
	
	return (
		<header className="row my-5">
			<Col>
				<Nav className="justify-content-between border-bottom p-2" activeKey="/home">
					<Nav.Item>
						<NavLink className="nav-link" exact to="/" activeClassName="text-secondary">Home</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink className="nav-link" to="/music" activeClassName="text-secondary">Music</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink className="nav-link" to="/tech" activeClassName="text-secondary">Tech</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink className="nav-link" to="/travel" activeClassName="text-secondary">Travel</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink className="nav-link" to="/compose" activeClassName="text-secondary">Compose</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink className="nav-link" to="/admin" activeClassName="text-secondary">Admin</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink className="nav-link" to="#" onClick={() => setShow(!show)}>Search</NavLink>
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
}

export interface INavBarProps {}

export default NavBar;