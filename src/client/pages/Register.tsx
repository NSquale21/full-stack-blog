import * as React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC<IRegisterProps> = () => {
    return (
        <main>
            <section className="row justify-content-center">
				<RegisterForm />
			</section>
        </main>
    );
}

export interface IRegisterProps {}

export default Register;