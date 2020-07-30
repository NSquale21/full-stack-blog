import * as React from 'react';
import { IBlog } from '../utils/interfaces';
import BlogCard from '../components/BlogCard';
import blogsService from '../utils/blogs-service';

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
			<section className="row justify-content-center">
				{blogs.map(blog => <BlogCard key={`blog-${blog.id}`}  blog={blog} />)}
			</section>
		</main>
	);
}

export interface IHomeProps {}

export default Home;