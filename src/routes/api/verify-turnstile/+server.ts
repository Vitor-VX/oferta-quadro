import { json } from '@sveltejs/kit'
import { TURNSTILE_SECRET_KEY } from "$env/static/private";

export async function POST({ request }) {
    const { token } = await request.json()

    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                secret: TURNSTILE_SECRET_KEY,
                response: token
            })
        }
    )

    const data = await response.json()

    return json({ success: data.success })
}