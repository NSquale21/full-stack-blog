import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { IBlog, ITag } from '../utils/interfaces';
import { useParams, useHistory } from 'react-router-dom';
import { api } from '../utils/api-services';
import { Col, Form, Button, Card } from 'react-bootstrap';

const EditForm = () => {

	const { id } = useParams<{ id: string}>();
	const history = useHistory();
	
	const [blog, setBlog] = React.useState<IBlog>(null);
	const [title, setTitle] = React.useState<string>('');
	const [image_url, setURL] = React.useState<string>('');
	const [tags, setTags] = React.useState<ITag[]>([]);
	const [selectedId, setSelectedId] = React.useState<string>('0');
	const [content, setContent] = React.useState<string>('');

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value);
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	React.useEffect(() => {
		(async () => {
			const blog = await api(`/api/blogs/${id}`);
			const tags = await api('/api/blogtags');
			setBlog(blog);
			setTitle(blog[0].title);
			setURL(blog[0].image_url);
			if (blog[1]) {
				setSelectedId(blog[1].id);
			}
			setContent(blog[0].content);
			setTags(tags);
		})();
	}, []);
	
	const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await api(`/api/blogs/${id}`, 'PUT', { title, image_url, content, tag_id: selectedId });
		history.push(`/blogs/details/${id}`);
	};

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
								rows={3}
								placeholder="Enter text here..." />
							<Form.Text className="text-muted">Markdown is supported.</Form.Text>
						</Form.Group>
						<Button className="w-75 mx-auto" variant="outline-primary" onClick={handleSave} block>Save</Button>
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
};

export default EditForm;