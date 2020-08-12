import * as React from 'react';
import { IBlog } from '../utils/interfaces';
import BlogCard from '../components/BlogCard';
import blogsService from '../utils/blogs-service';
import { Row } from 'react-bootstrap';

const Home: React.FC<IHomeProps> = () => {
	
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);
	
	React.useEffect(() => {
		(async () => {
			const blogs = await blogsService.getAll();
			setBlogs(blogs);
		})();
}, []);
	
	return (
		<main>
			<Row className="justify-content-center">
				{blogs.map(blog => <BlogCard key={`blog-${blog.id}`}  blog={blog} />)}
			</Row>
		</main>
	);
}

export interface IHomeProps {}

export default Home;