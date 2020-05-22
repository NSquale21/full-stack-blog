import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { IBlog, ITag } from '../utils/interfaces';
import { Card, Col } from 'react-bootstrap';

const BlogCard: React.FC<IBlogCardProps> = props => {
	
	const [tag, setTag] = React.useState<ITag>(null);
	
	React.useEffect(() => {
    (async () => {
      let res = await fetch(`/api/blogs/${props.blog.id}`);
      let blog = await res.json();
      setTag(blog[1]);
    })();
  }, [props.blog.id]);
	
	return (
		<Col className="my-2" md={3}>
			<Card className="shadow-sm h-100">
				<Card.Img className="imgage" variant="top" src={props.blog.image_url} />
				<Card.Body className="d-flex flex-column justify-content-between">
					<div>
						<Card.Title>{props.blog.title}</Card.Title>
						<Card.Text>by: {props.blog.name}</Card.Text>
					</div>
					<div className="d-flex flex-column">
						{/* <div className="text-center"> */}
							<Link to={`/tags/${tag?.id}`} className="badge badge-primary my-2">{tag?.tag_name}</Link>
						{/* </div> */}
						<Link to={`/blogs/details/${props.blog.id}`} className="btn btn-outline-primary btn-sm btn-block mx-auto w-75">Read More</Link>
					</div>
				</Card.Body>
				<Card.Footer className="text-center">{moment(props.blog.created_at).format('MMM Do YY')}</Card.Footer>
			</Card>
		</Col>
	);
}

export interface IBlogCardProps {
	blog: IBlog;
}

export default BlogCard;