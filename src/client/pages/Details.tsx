import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IBlog, ITag, IComment } from '../utils/interfaces';
import DetailsCard from '../components/DetailsCard';

const Details: React.FC<IDetailsProps> = () => {
  
  const { id } = useParams();
  const [blog, setBlog] = React.useState<IBlog>(null);
  const [tag, setTag] = React.useState<ITag>(null);
  const [comments, setComments] = React.useState<IComment[]>([]);

  const getComments = React.useCallback(() => {
    (async () => {
      let res = await fetch(`/api/comments/${id}`);
    if (res.ok) {
      let comments = await res.json();
      setComments(comments);
    }
    })()
  }, []); 
  
  React.useEffect(() => {
    (async () => {
      getComments();
      let res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        let blog = await res.json();
        setBlog(blog[0]);
        setTag(blog[1]);
      }
    })();
  }, [id]);
  
  return (
    <DetailsCard blog={blog} tag={tag} comments={comments} getComments={getComments}  /> 
	);
};

export interface IDetailsProps {}

export default Details;