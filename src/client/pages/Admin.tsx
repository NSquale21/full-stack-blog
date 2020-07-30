import * as React from 'react';
import { IBlog } from '../utils/interfaces';
import { api } from '../utils/api-services';
import AdminCard from '../components/AdminCard';

const Admin: React.FC<IAdminProps> = () => {
	
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);

	const getBlogs = async () => {
		const blogs = await api('/api/blogs');
		setBlogs(blogs);
	}
	
	React.useEffect(() => {
		getBlogs();
	}, []);
	
	return (
		<main>
			<section className="row">
				{blogs.map(blog => <AdminCard key={`admin-${blog.id}`} blog={blog} getBlogs={getBlogs} />)}
			</section>
		</main>
	);
}

export interface IAdminProps {}

export default Admin;