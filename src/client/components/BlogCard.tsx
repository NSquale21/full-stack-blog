import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { IBlog, ITag } from '../utils/interfaces';
import { urlRegex } from '../utils/url-regex';
import { api } from '../utils/api-services';
import { Card, Col } from 'react-bootstrap';

const BlogCard: React.FC<IBlogCardProps> = props => {
	
	const [tag, setTag] = React.useState<ITag>(null);
	const name = `/tags/${tag?.tag_name}`;
	
	React.useEffect(() => {
		(async () => {
		  let blog = await api(`/api/blogs/${props.blog.id}`);
		  setTag(blog[1]);
		})();
		}, [props.blog.id]);
	
	return (
		<Col className="my-2" md={3}>
			<Card className="shadow-sm h-100">
				<Card.Img className="imgage" alt="no image available" variant="top" src={props.blog.image_url} />
				<Card.Body className="d-flex flex-column justify-content-between">
					<div>
						<Card.Title>{props.blog.title}</Card.Title>
						<Card.Text>by: {props.blog.name}</Card.Text>
					</div>
					<div className="d-flex flex-column">
						<Link to={name.toLowerCase()} className="badge badge-primary my-2">{tag?.tag_name}</Link>
						<Link to={`/blogs/details/${props.blog.id}/${urlRegex(props.blog.title)}`} className="btn btn-outline-primary btn-sm btn-block mx-auto w-75">Read More</Link>
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