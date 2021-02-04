import * as React from 'react';
import { api } from '../utils/api-services';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';

const DonateForm = () => {
    
    const stripe = useStripe();
    const elements = useElements();
    
    const [values, setValues] = React.useState<{ [key: string]: string }>({
        name: '',
        email: '',
        amount: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
        console.log({...values});
        const result = await stripe.createToken(elements.getElement(CardElement), { name: values.name });
        const message = await api('/api/donate', 'POST', { token: result.token, amount: values.amount });
	};
    
    return (
        <Col md={8}>
            <Form className="border rounded p-3">
                <Form.Group>
                    <Form.Label srOnly>Name</Form.Label>
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
                    <Form.Label>Card Details</Form.Label>
                    <CardElement className="form-control" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            aria-label="Amount (to the nearest dollar)"
                            value={values.amount || ''}
                            onChange={handleChange}
                            name="amount"
                            type="text"
                            placeholder="00" />
                        <InputGroup.Append>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Button onClick={handleSubmit} variant="outline-primary" type="submit" className="w-75 mx-auto" block>
                    Donate
                </Button>
            </Form>
        </Col>
    );
};

export default DonateForm;