import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { IBlog } from '../utils/interfaces';
import BlogCard from '../components/BlogCard';

const SearchResults: React.FC<ISearchResultsProps> = props => {
	
	const location = useLocation();
	const query = location.state;
	const queryValue = Object.values(query);
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);

	React.useEffect(() => {
		(async () => {
			const res = await fetch('/api/blogs');
			if (res.ok) {
				const blogs = await res.json();
				setBlogs(blogs);
			}
		})();
	}, []);

	return (
		<main>
			<section className="row justify-content-center">
				{blogs
				.filter(blog => blog.title.toLowerCase().includes(queryValue[0].toString().toLowerCase()))
				.map(blog => <BlogCard key={`blog-${blog.id}`}  blog={blog} />)}
			</section>
		</main>
	);
}

export interface ISearchResultsProps {}

export default SearchResults;