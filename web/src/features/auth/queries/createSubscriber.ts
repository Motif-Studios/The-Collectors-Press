export async function createSubscriber(userId: string|undefined, email: string, customerId: string) {
    const newSubscriberResponse = await fetch("http://localhost:5001/subscription/make_new_subscriber", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },        body: JSON.stringify({ userId, email, customerId }),
    });
    const newSubscriberData = await newSubscriberResponse.json();

    return newSubscriberData;
}