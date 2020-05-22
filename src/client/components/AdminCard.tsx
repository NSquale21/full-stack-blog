import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../utils/interfaces';
import { Col, Card, Button } from 'react-bootstrap';

const AdminCard: React.FC<IAdminCardProps> = props => {
	
	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let res = await fetch(`/api/blogs/${props.blog.id}`, {
			method: 'DELETE',
		});
		if (res.ok) {
			props.pizza();
		} else {
			console.log('Uh Oh!');
		}
	}
	
	return (
		// <Col md={8}>
		// 	<Card className="shadow-sm my-2">
		// 		<Card.Body className="d-flex justify-content-between align-items-center">
		// 			<img src={props.blog.image_url} className="preview" /> 
		// 			<Card.Text>{props.blog.title}</Card.Text>
		// 			<div /* className="d-flex flex-column" */>
		// 				<Button onClick={handleDelete} className="shadow-sm"  variant="outline-primary">Delete</Button>
		// 				<Link to={`/blogs/edit/${props.blog.id}`}className="btn btn-outline-primary">Edit</Link>
		// 			</div>
		// 		</Card.Body>
		// 	</Card>
		// </Col>

		<Col md={8}>
			<Card className="shadow-sm my-2 h-100" style={{ maxWidth: "640px" }}>
				<div className="row no-gutters">
					<Col sm={5}>
						<img className="card-img" src={props.blog.image_url} />
					</Col>
					<Col sm={7}>
						<Card.Body>
							<Card.Title>{props.blog.title}</Card.Title>
							<Card.Text></Card.Text>
							<div>
								<Button onClick={handleDelete} className="shadow-sm"  variant="outline-primary">Delete</Button>
								<Link to={`/blogs/edit/${props.blog.id}`}className="btn btn-outline-primary">Edit</Link>
							</div>
						</Card.Body>
					</Col>
				</div>
			</Card>
		</Col>
	);
}

export interface IAdminCardProps {
	blog: IBlog;
	pizza: () => Promise<void>;
}

export default AdminCard; 



{/* <div className="card" style={{ maxWidth: "500px" }}>
<div className="row no-gutters">
		<div className="col-sm-5" style={{ background: "#868e96" }}>
				<img src="images/sample.svg" className="card-img-top h-100" alt="..." />
		</div>
		<div className="col-sm-7">
				<div className="card-body">
						<h5 className="card-title">Alice Liddel</h5>
						<p className="card-text">Alice is a freelance web designer and developer based in London. She is specialized in HTML5, CSS3, JavaScript, Bootstrap, etc.</p>
						<a href="#" className="btn btn-primary stretched-link">View Profile</a>
				</div>
		</div>
</div>
</div> */}