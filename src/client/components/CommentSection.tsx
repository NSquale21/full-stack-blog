import * as React from 'react';
import { IComment } from '../utils/interfaces';
import { api } from '../utils/api-services';
import { Button, Dropdown, Form, Media, Modal } from 'react-bootstrap';
import { BsThreeDots } from "react-icons/bs";

const CommentSection = (props: CommentSectionProps) => {

	const [show, setShow] = React.useState(false);
	const [comment, setComment] = React.useState<string>('');

  const handleClose = () => setShow(false);
	
	const handleShow = (editComment: string) => {
		setShow(true);
		setComment(editComment);
	};
	
	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

	const handleDelete = async(e: any) => {
		e.preventDefault();
		let res = await api(`/api/comments/${props.comments.id}`, 'DELETE'); 
		props.getComments();
	};

	const handleEdit = async(e: React.MouseEvent<HTMLInputElement>) => {
		let res = await api(`/api/comments/${props.comments.id}`, 'PUT', { content: comment });
		handleClose();
		props.getComments();
	};
	
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
					<h5 className="title">{props.comments.username}</h5>
					<p className="dark-gray">{props.comments.content}</p>
				</Media.Body>
				<Dropdown className={`my-auto ${props.comments.authors_id != props.user && 'disabledbutton'}`}>
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
};

export interface CommentSectionProps {
	comments: IComment;
	user?: number;
	getComments: () => void;
	childen?: React.ReactNode;
}

export default CommentSection;