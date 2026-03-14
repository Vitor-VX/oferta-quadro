<script lang="ts">
    import { PUBLIC_MERCADO_PAGO_KEY } from "$env/static/public";
    import { loadMercadoPago } from "@mercadopago/sdk-js";
    import { onMount } from "svelte";

    export let amount: number;
    export let onSuccess: () => void;

    onMount(async () => {
        await loadMercadoPago();

        const mp = new window.MercadoPago(PUBLIC_MERCADO_PAGO_KEY);

        const cardForm = mp.cardForm({
            amount: String(amount),
            iframe: true,
            form: {
                id: "form-checkout",
                cardNumber: {
                    id: "form-checkout__cardNumber",
                    placeholder: "Número do cartão",
                },
                expirationDate: {
                    id: "form-checkout__expirationDate",
                    placeholder: "MM/AA",
                },
                securityCode: {
                    id: "form-checkout__securityCode",
                    placeholder: "CVV",
                },
                cardholderName: {
                    id: "form-checkout__cardholderName",
                    placeholder: "Nome no cartão",
                },
                issuer: {
                    id: "form-checkout__issuer",
                    placeholder: "Banco emissor",
                },
                installments: {
                    id: "form-checkout__installments",
                    placeholder: "Parcelas",
                },
                identificationType: {
                    id: "form-checkout__identificationType",
                    placeholder: "Tipo de documento",
                },
                identificationNumber: {
                    id: "form-checkout__identificationNumber",
                    placeholder: "CPF",
                },
                cardholderEmail: {
                    id: "form-checkout__cardholderEmail",
                    placeholder: "E-mail",
                },
            },
            callbacks: {
                onFormMounted: (err: any) => {
                    if (err) console.error(err);
                },
                onSubmit: async (event: any) => {
                    event.preventDefault();

                    const {
                        paymentMethodId,
                        issuerId,
                        cardholderEmail,
                        token,
                        installments,
                        identificationNumber,
                        identificationType,
                    } = cardForm.getCardFormData();

                    const res = await fetch("/api/payment/card", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            token,
                            issuer_id: issuerId,
                            payment_method_id: paymentMethodId,
                            transaction_amount: amount,
                            installments: Number(installments),
                            payer: {
                                email: cardholderEmail,
                                identification: {
                                    type: identificationType,
                                    number: identificationNumber,
                                },
                            },
                        }),
                    });

                    const data = await res.json();
                    if (data.status === "approved") onSuccess();
                },
                onFetching: (resource: any) => {
                    // opcional: mostrar loading enquanto busca parcelas/emissor
                },
            },
        });
    });
</script>

<form id="form-checkout">
    <div id="form-checkout__cardNumber"></div>
    <div id="form-checkout__expirationDate"></div>
    <div id="form-checkout__securityCode"></div>
    <input id="form-checkout__cardholderName" placeholder="Nome no cartão" />
    <select id="form-checkout__issuer"></select>
    <select id="form-checkout__installments"></select>
    <select id="form-checkout__identificationType"></select>
    <input id="form-checkout__identificationNumber" placeholder="CPF" />
    <input id="form-checkout__cardholderEmail" placeholder="E-mail" />
    <button type="submit" id="form-checkout__submit">Pagar</button>
</form>
