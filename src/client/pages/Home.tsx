import * as React from 'react';
import { IBlog } from '../utils/interfaces';
import BlogCard from '../components/BlogCard';

const Home: React.FC<IHomeProps> = () => {
	
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
				{blogs.map(blog => <BlogCard key={`blog-${blog.id}`}  blog={blog} />)}
			</section>
		</main>
	);
}

export interface IHomeProps {}

export default Home;