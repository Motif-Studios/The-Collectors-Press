export async function createStripeCustomer(email: string) {    
    const stripeCustomerResponse = await fetch("http://localhost:5001/subscription/create_customer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const stripeCustomerData = await stripeCustomerResponse.json();

    return stripeCustomerData;
};