import * as React from 'react';
import { IBlog } from '../utils/interfaces';
import AdminCard from '../components/AdminCard';

const Admin: React.FC<IAdminProps> = () => {
	
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);

	const getBlogs = async () => {
		const res = await fetch('/api/blogs');
			if (res.ok) {
				const blogs = await res.json();
				setBlogs(blogs);
			}
	}
	
	React.useEffect(() => {
		getBlogs();
	}, []);
	
	return (
		<main>
			<section className="row justify-content-center">
				{blogs.map(blog => <AdminCard key={`admin-${blog.id}`} blog={blog} pizza={getBlogs} />)}
			</section>
		</main>
	);
}

export interface IAdminProps {}

export default Admin;