import * as React from 'react';
import { IComment } from '../utils/interfaces';
import { Button, Dropdown, Form, Media, Modal } from 'react-bootstrap';
import { BsThreeDots } from "react-icons/bs";

const CommentSection: React.FC<ICommentSectionProps> = props => {

	const [show, setShow] = React.useState(false);
	const [comment, setComment] = React.useState<string>('');

  const handleClose = () => setShow(false);
	
	const handleShow = (editComment) => {
		setShow(true);
		setComment(editComment);
	}
	
	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

	const handleDelete = async(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let res = await fetch(`/api/comments/${props.comments.id}`, {
			method: 'DELETE',
		});
		if (res.ok) {
			props.getComments();
		}
	};

	const handleEdit = async(e: React.MouseEvent<HTMLInputElement>) => {
		let res = await fetch(`/api/comments/${props.comments.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: comment })
		});
		if (res.ok) {
			handleClose();
			props.getComments();
		}
	}

	return (
		<>
			<Media className="my-2">
				<img
					width={64}
					height={64}
					className="mr-3"
					src={props.comments.avatar}
					alt="Generic placeholder"
				/>
				<Media.Body>
					<h5>{props.comments.username}</h5>
					<p>{props.comments.content}</p>
				</Media.Body>
				<Dropdown className="my-auto">
					<Dropdown.Toggle variant="outline-primary" size="sm" id="dropdown-basic">
						<BsThreeDots />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item as="button" onClick={() => handleShow(props.comments.content)} href="#/action-1">Edit</Dropdown.Item>
						<Dropdown.Item as="button" onClick={handleDelete} href="#/action-2">Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Media>
			<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
				<Modal.Body>
					<Form.Control
						value={comment}
						onChange={handleCommentChange} 
						as="textarea"
					/>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEdit}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	);
}

export interface ICommentSectionProps {
	comments: IComment;
	getComments: () => void;
}

export default CommentSection;

// onClick={handleClose}