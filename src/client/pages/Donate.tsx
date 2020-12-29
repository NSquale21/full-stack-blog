//@ts-nocheck
import * as React from 'react';
import DonateForm from '../components/DonateForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HDEs5AhQR1VV7jSEfAhmuwuBkOb65rFvbzdk1edMtSC9SPKmm5V0hf771PyeO4gBeoOgHIzS972XuHQ4oItpVDy00xn8kEca3');

const Donate: React.FC<IDonateProps> = () => {
    return (
        <main>
            <section className="row justify-content-center">
                <Elements stripe={stripePromise}>
                    <DonateForm />
                </Elements>
            </section>
        </main>
    )
}

export interface IDonateProps {}

export default Donate;