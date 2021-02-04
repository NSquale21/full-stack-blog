import * as React from 'react';
import { api } from '../utils/api-services';
import { Button, Col, Form } from 'react-bootstrap';

const ContactForm = () => {
    
    const [values, setValues] = React.useState<{ [key: string]: string }>({
        email: '',
    	subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await api('/api/contact', 'POST', {...values});
	};
    
    return(
        <Col md={8}>
			<Form className="border rounded p-3">
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
					<Form.Label>Subject</Form.Label>
					<Form.Control
						value={values.subject || ''}
                        onChange={handleChange}
                        name="subject"
                        type="text"
						placeholder="Subject" />
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
                        rows={5} />
				</Form.Group>
				<Button onClick={handleContact} variant="outline-primary" type="submit" className="w-75 mx-auto" block>
					Send
				</Button>
			</Form>
		</Col>
    );
};

export default ContactForm;