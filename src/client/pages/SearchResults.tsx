import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { IBlog } from '../utils/interfaces';
import { api } from '../utils/api-services';
import BlogCard from '../components/BlogCard';

const SearchResults = () => {
	
	const location = useLocation<{ query: string }>();
	const query = location.state?.query || '';
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);

	React.useEffect(() => {
		(async () => {
			const blogs = await api('/api/blogs');
			setBlogs(blogs);
		})();
	}, []);

	return (
		<main>
			<section className="row justify-content-center">
				{blogs.length && blogs
				.filter(blog => blog.title.toLowerCase().includes(query.toLowerCase()))
				.map(blog => <BlogCard key={`blog-${blog.id}`}  blog={blog} />)}
			</section>
		</main>
	);
};

export default SearchResults;