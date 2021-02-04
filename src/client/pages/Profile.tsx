import * as React from 'react';
import { IBlog } from '../utils/interfaces';
import { api } from '../utils/api-services';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
	
	const [blogs, setBlogs] = React.useState<IBlog[]>([]);

	const getBlogs = async () => {
		const authorsBlogs = await api('/api/authors/profile');
		setBlogs(authorsBlogs.blogs);
	};
	
	React.useEffect(() => {
		getBlogs();
	}, []);
	
	return (
		<main className="page-container">
			<div className="d-flex justify-content-center">
				<a href="/compose" className="shadow-sm btn btn-outline-primary mb-5 new-blog-button">New Blog</a>
			</div>
			<section className="row">
				{blogs.map(blog => <ProfileCard key={`admin-${blog.id}`} blog={blog} getBlogs={getBlogs} />)}
			</section>
		</main>
	);
};

export default Profile;