export async function handle({ event, resolve }) {
    const origin = event.request.headers.get("origin")
    const pathname = event.url.pathname

    if (pathname.startsWith("/_app") || pathname.startsWith("/api")) {
        if (origin && !origin.includes("imortalizesupet.shop")) {
            return new Response("Forbidden", { status: 403 })
        }
        return resolve(event);
    }

    return resolve(event);
}