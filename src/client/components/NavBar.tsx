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


// 	const FirstPage = props => {
//     let history = useHistory();

//     const someEventHandler = event => {
//        history.push({
//            pathname: '/secondpage',
//            search: '?query=abc',
//            state: { detail: 'some_value' }
//        });
//     };

// };

	// const searchFilter = blogs.filter(blog => blog.title.toLowerCase().includes(query.toLowerCase()));
	// console.log(searchFilter);

	
	const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.which === 13) {
			//push to /search/${query}
			// push to a search page and console.log(parameter)
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
						<NavLink to="/" activeClassName="text-danger">Home</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/music">Music</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/tech">Tech</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/travel">Travel</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/compose">Compose</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="/admin">Admin</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to="#" onClick={() => setShow(!show)}>Search</NavLink>
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