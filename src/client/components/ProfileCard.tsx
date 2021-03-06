import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../utils/interfaces';
import { api } from '../utils/api-services';
import { Col, Card, Button } from 'react-bootstrap';

const ProfileCard = (props: ProfileCardProps) => {
	
	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let res = await api(`/api/blogs/${props.blog.id}`, 'DELETE');
		props.getBlogs();
	}

	return (
		<Col md={6} className="offset-md-3 mb-3">
			<Card className="shadow-sm h-100">
				<div className="row no-gutters">
					<Col sm={5}>
						<img className="card-img" src={props.blog.image_url} />
					</Col>
					<Col sm={7}>
						<Card.Body>
							<Card.Title className="title">{props.blog.title}</Card.Title>
							<Card.Text></Card.Text>
							<div>
								<Button onClick={handleDelete} className="shadow-sm mr-2"  variant="outline-primary">Delete</Button>
								<Link to={`/blogs/edit/${props.blog.id}`} className="btn btn-outline-primary">Edit</Link>
							</div>
						</Card.Body>
					</Col>
				</div>
			</Card>
		</Col>
	);
};

export interface ProfileCardProps {
	blog: IBlog;
	getBlogs: () => Promise<void>;
}

export default ProfileCard;