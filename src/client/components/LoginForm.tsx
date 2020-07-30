import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Button, Form } from 'react-bootstrap';
import { api } from '../utils/api-services';

const LoginForm: React.FC<ILoginFormProps> = () => {

	const history = useHistory();
		
	const [values, setValues] = React.useState<{ [key: string]: string }>({
		email: 'testuser@gmail.com',
		password: 'password123'
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	// const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
	// 	e.preventDefault();
	// 	const res = await fetch('/auth/login', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(values)
	// 	});
	// 	console.log(res.ok);
	// 	if (res.ok) {
	// 		const info = await res.json();
	// 		localStorage.setItem('token', info);
	// 	}
	// };

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const info = await api('/auth/login', 'POST', values);
		localStorage.setItem('token', info);
		history.push('/compose');
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
			</Form>
		</Col>
  );
}

export interface ILoginFormProps {}

export default LoginForm;