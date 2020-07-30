import * as React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const ContactForm: React.FC<IContactFormProps> = () => {
    
    const [values, setValues] = React.useState<{ [key: string]: string }>({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('message sent!');
	};
    
    return(
        <Col md={8}>
			<Form className="border rounded p-3">
                <Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						value={values.name || ''}
                        onChange={handleChange}
                        name="name"
                        type="text"
						placeholder="Your name" />
				</Form.Group>
                <Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						value={values.email || ''}
                        onChange={handleChange}
                        name="email"
						type="email" 
						placeholder="Your email" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Message</Form.Label>
					<Form.Control 
						value={values.message || ''}
                        onChange={handleChange}
                        name="message"
						type="text" 
						placeholder="Your message"
                        as="textarea"
                        rows="5" />
				</Form.Group>
				<Button onClick={handleLogin} variant="outline-primary" type="submit" className="w-75 mx-auto" block>
					Send
				</Button>
			</Form>
		</Col>
    );
}

export interface IContactFormProps {}

export default ContactForm;