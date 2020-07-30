import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../utils/api-services';
import { Col, Button, Form } from 'react-bootstrap';

const RegisterForm: React.FC<IRegisterFormProps> = () => {
    
	const history = useHistory();
	
	const [values, setValues] = React.useState<{ [key: string]: string }>({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };
    
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const info = await api('/auth/register', 'POST', values);
		localStorage.setItem('token', info);
		history.push('/profile');
	};

    return (
        <Col md={8}>
			<Form className="border rounded p-3">
                <Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
						value={values.username || ''}
                        onChange={handleChange}
                        name="username"
                        type="text"
						placeholder="Enter username" />
				</Form.Group>
                <Form.Group>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						value={values.email || ''}
                        onChange={handleChange}
                        name="email"
						type="email" 
						placeholder="Enter email" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control 
						value={values.password || ''}
                        onChange={handleChange}
                        name="password"
						type="password" 
						placeholder="Password" />
				</Form.Group>
				<Button onClick={handleLogin} variant="outline-primary" type="submit" className="w-75 mx-auto" block>
					Register
				</Button>
			</Form>
		</Col>
    );
}

export interface IRegisterFormProps {}

export default RegisterForm;