import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IBlog, ITag } from '../utils/interfaces';
import DetailsCard from '../components/DetailsCard';

const Details: React.FC<IDetailsProps> = () => {
  
  const { id } = useParams();
  const [blog, setBlog] = React.useState<IBlog>(null);
  const [tag, setTag] = React.useState<ITag>(null);

  React.useEffect(() => {
    (async () => {
      let res = await fetch(`/api/blogs/${id}`);
      let blog = await res.json();
      setBlog(blog[0]);
      setTag(blog[1]);
    })();
  }, [id]);
  
  return (
    <DetailsCard blog={blog} tag={tag} /> 
	);
};

export interface IDetailsProps {}

export default Details;