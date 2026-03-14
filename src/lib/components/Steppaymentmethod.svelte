<script lang="ts">
    import { QrCode, Lock, CreditCard, ExternalLink } from "lucide-svelte";

    export interface PaymentTheme {
        bgPanel?: string;
        colorPrimary?: string;
        colorOnPrimary?: string;
        colorAccent?: string;
        colorOnAccent?: string;
        colorText?: string;
        colorMuted?: string;
        colorBorder?: string;
        fontDisplay?: string;
        fontBody?: string;
    }

    export let totalAmount: number;
    export let onPix: () => void;
    export let onCard: () => Promise<string | null>;
    export let currency = "R$";
    export let pixDiscount = 0;
    export let theme: PaymentTheme = {};

    $: t = {
        bgPanel: theme.bgPanel ?? "#faf8f4",
        colorPrimary: theme.colorPrimary ?? "#1a1a1a",
        colorOnPrimary: theme.colorOnPrimary ?? "#d4aa72",
        colorAccent: theme.colorAccent ?? "#b8935a",
        colorOnAccent: theme.colorOnAccent ?? "#ffffff",
        colorText: theme.colorText ?? "#2a2622",
        colorMuted: theme.colorMuted ?? "#8a7e74",
        colorBorder: theme.colorBorder ?? "rgba(184,147,90,.2)",
        fontDisplay: theme.fontDisplay ?? "'Cormorant Garamond', serif",
        fontBody: theme.fontBody ?? "'DM Sans', sans-serif",
    };

    type Method = "pix" | "card";
    let selected: Method = "pix";
    let submitting = false;
    let cardError = "";

    $: pixAmount =
        pixDiscount > 0 ? totalAmount * (1 - pixDiscount / 100) : totalAmount;

    function fmt(val: number) {
        return `${currency} ${val.toFixed(2).replace(".", ",")}`;
    }

    function selectMethod(m: Method) {
        if (m === selected) return;
        cardError = "";
        selected = m;
    }

    async function handleCard() {
        submitting = true;
        cardError = "";
        try {
            const url = await onCard();
            if (!url) return;
            window.location.href = url;
        } catch (e: any) {
            cardError = e?.message ?? "Erro ao gerar link de pagamento.";
        } finally {
            submitting = false;
        }
    }
</script>

<div
    class="pay-wrap"
    style="
        --bg-panel:         {t.bgPanel};
        --color-primary:    {t.colorPrimary};
        --color-on-primary: {t.colorOnPrimary};
        --color-accent:     {t.colorAccent};
        --color-on-accent:  {t.colorOnAccent};
        --color-text:       {t.colorText};
        --color-muted:      {t.colorMuted};
        --color-border:     {t.colorBorder};
        --font-display:     {t.fontDisplay};
        --font-body:        {t.fontBody};
    "
>
    <!-- Tabs -->
    <div class="tabs">
        <button
            class="tab"
            class:active={selected === "pix"}
            on:click={() => selectMethod("pix")}
        >
            <QrCode size={16} />
            Pix
            {#if pixDiscount > 0}
                <span class="tab-badge">{pixDiscount}% OFF</span>
            {/if}
        </button>
        <button
            class="tab"
            class:active={selected === "card"}
            on:click={() => selectMethod("card")}
        >
            <CreditCard size={16} />
            Cartão de Crédito
        </button>
    </div>

    {#if selected === "pix"}
        <div class="panel">
            <div class="pix-info">
                <div class="pix-step">
                    <span class="dot">1</span> Clique em "Gerar QR Code"
                </div>
                <div class="pix-step">
                    <span class="dot">2</span> Escaneie ou copie o código no seu
                    banco
                </div>
                <div class="pix-step">
                    <span class="dot">3</span> O pagamento é confirmado na hora
                </div>
            </div>

            <button class="btn-primary" on:click={onPix}>
                <QrCode size={18} /> Gerar QR Code Pix
            </button>

            <div class="secure-row">
                <Lock size={11} /> Pagamento seguro com SSL
            </div>
        </div>
    {/if}

    {#if selected === "card"}
        <div class="panel">
            <div class="card-info">
                <div class="card-info-icon">
                    <CreditCard size={32} />
                </div>
                <p class="card-info-title">Pague com Cartão de Crédito</p>
                <p class="card-info-desc">
                    Você será redirecionado para a página segura do Mercado Pago
                    para concluir o pagamento.
                </p>

                <div class="card-flags">
                    <span class="flag">Visa</span>
                    <span class="flag">Master</span>
                    <span class="flag">Elo</span>
                    <span class="flag">Amex</span>
                </div>
            </div>

            {#if cardError}
                <div class="card-error">{cardError}</div>
            {/if}

            <button
                class="btn-primary"
                on:click={handleCard}
                disabled={submitting}
            >
                {#if submitting}
                    <span class="spinner"></span> Gerando link...
                {:else}
                    <ExternalLink size={16} /> Pagar {fmt(totalAmount)} com Cartão
                {/if}
            </button>

            <div class="secure-row">
                <Lock size={11} /> Ambiente seguro · Powered by Mercado Pago
            </div>
        </div>
    {/if}
</div>

<style>
    .pay-wrap {
        margin-top: 20px;
        font-family: var(--font-body, "DM Sans", sans-serif);
        width: 100%;
    }

    .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 13px;
        background: white;
        border: none;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--color-muted);
        cursor: pointer;
        transition: all 0.2s;
    }

    .tab:first-child {
        border-right: 1px solid var(--color-border);
    }

    .tab.active {
        background: var(--color-primary);
        color: var(--color-on-primary);
    }

    .tab-badge {
        background: var(--color-accent);
        color: var(--color-on-accent);
        font-size: 0.6rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 10px;
        letter-spacing: 0.05em;
    }

    .tab.active .tab-badge {
        background: var(--color-on-primary);
        color: var(--color-primary);
    }

    .panel {
        background: var(--bg-panel);
        border: 1px solid var(--color-border);
        border-radius: 4px;
        padding: 24px;
    }

    /* Pix */
    .pix-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 22px;
    }

    .pix-step {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.85rem;
        color: var(--color-text);
        font-weight: 300;
    }

    .dot {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-on-primary);
        font-size: 0.7rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    /* Card info */
    .card-info {
        text-align: center;
        margin-bottom: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--color-border);
    }

    .card-info-icon {
        color: var(--color-accent);
        margin-bottom: 12px;
    }

    .card-info-title {
        font-family: var(--font-display);
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--color-text);
        margin: 0 0 8px;
    }

    .card-info-desc {
        font-size: 0.83rem;
        color: var(--color-muted);
        font-weight: 300;
        line-height: 1.5;
        margin: 0 0 16px;
    }

    .card-flags {
        display: flex;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .flag {
        background: white;
        border: 1px solid var(--color-border);
        color: var(--color-muted);
        font-size: 0.68rem;
        font-weight: 600;
        padding: 3px 10px;
        border-radius: 2px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    /* Erro */
    .card-error {
        background: #fff5f5;
        border: 1px solid #fed7d7;
        color: #c53030;
        padding: 10px 14px;
        border-radius: 2px;
        font-size: 0.82rem;
        margin-bottom: 14px;
    }

    /* Botão */
    .btn-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 16px;
        background: var(--color-primary);
        color: var(--color-on-primary);
        border: none;
        border-radius: 20px;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: background 0.25s;
        margin-top: 4px;
    }

    .btn-primary:hover:not(:disabled) {
        background: var(--color-accent);
        color: var(--color-on-accent);
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .secure-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-top: 12px;
        font-size: 0.68rem;
        color: var(--color-muted);
        font-weight: 300;
        letter-spacing: 0.03em;
    }

    .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 480px) {
        .card-flags {
            gap: 6px;
        }
    }
</style>
