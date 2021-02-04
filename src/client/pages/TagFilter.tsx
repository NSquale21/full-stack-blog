import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IBlog, ITag } from '../utils/interfaces';
import { api } from '../utils/api-services';
import BlogCard from '../components/BlogCard';

const TagFilter = () => {
  
  const { id } = useParams<{ id: string}>();
  
  const [blogs, setBlogs] = React.useState<Array<IBlog | ITag>>([]);

  React.useEffect(() => {
    (async () => {
      let blogs = await api(`/api/blogtags/filter/${id}`);
      setBlogs(blogs);
    })();
  }, [id]);
  
  return (
		<main>
			<section className="row justify-content-center">
				{blogs.map(blog => <BlogCard key={`blog-${blog.id}`}  blog={blog} />)}
			</section>
		</main>
  );
};
  
export default TagFilter;