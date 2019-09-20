import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishibleKey = 'pk_test_P2iuvvxA0GIJZW8urPqw7heo00NBCjxKWg';

    const onToken = token => {
        console.log(token)
        alert('Payment succesful')
    }

    return (
        <StripeCheckout 
            label='Pay now'
            name='Aplikacja JAguar'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now!'
            token={onToken}
            stripeKey={publishibleKey}
        />
    )
};

export default StripeCheckoutButton;