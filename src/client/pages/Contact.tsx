import * as React from 'react';
import ContactForm from '../components/ContactForm';

const Contact: React.FC<IContactProps> = () => {
    return(
        <main>
            <section className="row justify-content-center">
				<ContactForm />
			</section>
        </main>
    );
}

export interface IContactProps {}

export default Contact;