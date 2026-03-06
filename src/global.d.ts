declare global {
  function fbq(...args: any[]): void
  interface Window {
    fbq: (...args: any[]) => void
  }
}

export { }