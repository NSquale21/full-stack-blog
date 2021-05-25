import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { api, setLogin } from '../utils/api-services';
import { Col, Button, Form } from 'react-bootstrap';

const LoginForm = () => {

	const history = useHistory();
		
	const [values, setValues] = React.useState<{ [key: string]: string }>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const info = await api('/auth/login', 'POST', values);
		localStorage.setItem('token', info);
		setLogin(info);
		history.push('/profile');
	};

	return (
		<Col md={8}>
			<Form className="border rounded p-3">
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
					Login
				</Button>
				<small className="m-3 form-text text-muted text-center">
                        Not a member yet? <a href="/register">Register</a> now.
                </small>
			</Form>
		</Col>
  );
};

export default LoginForm;