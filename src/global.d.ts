declare global {
  function fbq(...args: any[]): void
  interface Window {
    fbq: (...args: any[]) => void


    MercadoPago: new (
      publicKey: string,
      options?: { locale?: string }
    ) => MercadoPagoInstance;
  }
}

export { }