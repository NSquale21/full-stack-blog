import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { api } from '../utils/api-services';
import { ITag } from '../utils/interfaces';
import { Col, Form, Button, Card } from 'react-bootstrap';

const Compose = () => {

	const history = useHistory();
	
	const [values, setValues] = React.useState<{ [key: string] : string }>({});
	const [tags, setTags] = React.useState<ITag[]>([]);
	const [selectedId, setSelectedId] = React.useState<string>('0');
	
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await api('/api/blogs', 'POST', { ...values, tag_id: selectedId });
		history.push('/');
	};

	React.useEffect(() => {
		(async () => {
			const tags = await api('/api/blogtags');
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
								value={values.title || ''} 
								name="title"
								onChange={handleChange} 
								placeholder="Enter title here..." />
						</Form.Group>
						<Form.Group>
							<Form.Label>Image URL</Form.Label>
							<Form.Control 
								value={values.image_url || ''}
								name="image_url"
								onChange={handleChange}
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
								value={values.content || ''}
								name="content"
								onChange={handleChange}
								as="textarea" 
								rows={3}
								placeholder="Enter text here..." />
							<Form.Text className="text-muted">Markdown is supported.</Form.Text>
						</Form.Group>
						<Button className="w-75 mx-auto" variant="outline-primary" onClick={handleSubmit} block>Post</Button>
					</Form>
				</Col>
				<Col md={6}>
					<Card className="shadow-sm">
						<Card.Body>
							<Card.Title>{values.title}</Card.Title>
							<ReactMarkdown source={values.content}></ReactMarkdown>
						</Card.Body>
					</Card> 
				</Col>
			</section>
		</main>
	);
};

export default Compose;