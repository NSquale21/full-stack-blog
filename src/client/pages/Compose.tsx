import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ITag } from '../utils/interfaces';
import { useHistory } from 'react-router-dom';
import { Col, Form, Button, Card } from 'react-bootstrap';

const Compose: React.FC<IComposeProps> = () => {

	const history = useHistory();
	
	const [title, setTitle] = React.useState<string>('');
	const [image_url, setURL] = React.useState<string>('');
	const [tags, setTags] = React.useState<ITag[]>([]);
	const [selectedId, setSelectedId] = React.useState<string>('0');
	const [content, setContent] = React.useState<string>('');

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value);
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await fetch('api/blogs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, image_url, content, author_id: 1, tag_id: selectedId })
		});
		if(res.ok) {
			history.push('/')
		}
	}

	React.useEffect(() => {
		(async () => {
			const res = await fetch('/api/blogtags');
			const tags = await res.json();
			setTags(tags);
		})();
	}, []);

	return (
		<main>
			<section className="row">
				<Col md={6}>
					<Form className="p-3 shadow-sm">
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control 
								value={title} 
								onChange={handleTitleChange} 
								type="text" 
								placeholder="Enter title here..." />
						</Form.Group>
						<Form.Group>
							<Form.Label>Image URL</Form.Label>
							<Form.Control 
								value={image_url} 
								onChange={handleUrlChange} 
								type="text" 
								placeholder="Enter image URL here..." />
						</Form.Group>
						<Form.Group>
							<Form.Label>Select Blog Tag</Form.Label>
							<Form.Control as="select" value={selectedId} onChange={handleSelectChange}>
								<option value="0" disabled>Select Tag</option>
								{tags.map(tag => <option key={`tag-${tag.id}`} value={tag.id}>{tag.tag_name}</option> )}
							</Form.Control>
							<Form.Text className="text-muted">Optional.</Form.Text>
						</Form.Group>
						<Form.Group>
							<Form.Label>Content</Form.Label>
							<Form.Control 
								value={content}
								onChange={handleContentChange}
								as="textarea" 
								rows="3" 
								placeholder="Enter text here..." />
							<Form.Text className="text-muted">Markdown is supported.</Form.Text>
						</Form.Group>
						<Button className="w-75 mx-auto" variant="outline-primary" onClick={handleSubmit} block>Post</Button>
					</Form>
				</Col>
				<Col md={6}>
					<Card className="shadow-sm">
						<Card.Body>
							<Card.Title>{title}</Card.Title>
							<ReactMarkdown source={content}></ReactMarkdown>
						</Card.Body>
					</Card> 
				</Col>
			</section>
		</main>
	);
}

export interface IComposeProps {}

export default Compose;