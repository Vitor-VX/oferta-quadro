export async function handle({ event, resolve }) {
    const origin = event.request.headers.get("origin")
    const pathname = event.url.pathname
    const userAgent = event.request.headers.get("user-agent")
    const referer = event.request.headers.get("referer")
    const ip = event.getClientAddress()

    // Loga TUDO
    console.log("=== REQUEST ===")
    console.log("IP:", ip)
    console.log("PATH:", pathname)
    console.log("ORIGIN:", origin)
    console.log("REFERER:", referer)
    console.log("UA:", userAgent)
    console.log("===============")

    return resolve(event)
}