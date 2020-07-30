import * as React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC<ILoginProps> = () => {
    return (
			<main>
				<section className="row justify-content-center">
					<LoginForm />
				</section>
			</main>
    );
}

export interface ILoginProps {}

export default Login;