export async function newProfile(userId: string|undefined) {
    const newProfileResponse = await fetch("http://localhost:5001/auth/create_profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
    });
    const newProfileData = await newProfileResponse.json();

    return newProfileData;
}