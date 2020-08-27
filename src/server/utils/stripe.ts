import Stripe from 'stripe';
import config from '../config';

const stripe = new Stripe(config.stripe.key, { apiVersion: '2020-03-02' });

export const charge = (id: string, amount: number) => {
    return stripe.charges.create({ 
        amount: amount * 100,
        currency: 'usd',
        source: id,
        description: 'buy me a coffee'
    });
};