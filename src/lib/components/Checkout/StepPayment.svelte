<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    Copy,
    CircleCheck as CheckCircle,
    Crown,
    Lock,
    Sparkles,
    MessageSquare,
    Mail,
    ShieldCheck,
    AlertCircle,
  } from "lucide-svelte";
  import {
    checkoutStore,
    setPaymentStatus,
    setPixData,
  } from "$lib/stores/checkoutStore";
  import { track } from "$lib/track/meta";

  export let onComplete: () => void;

  $: ({
    selectedProduct,
    selectedExtras,
    people,
    customerData,
    totalAmount,
    paymentStatus,
    pixCode,
    pixQrCode,
  } = $checkoutStore);

  let copySuccess = false;
  let paymentInterval: any = null;

  function startPaymentWatcher() {
    if (paymentInterval) return;
    paymentInterval = setInterval(async () => {
      await checkPayment();
    }, 20000);
  }

  function stopPaymentWatcher() {
    if (paymentInterval) {
      clearInterval(paymentInterval);
      paymentInterval = null;
      localStorage.removeItem("order-payment");
    }
  }

  onMount(() => {
    generatePixPayment();
    startPaymentWatcher();
  });

  onDestroy(() => {
    stopPaymentWatcher();
  });

  async function generatePixPayment() {
    setPaymentStatus("generating");

    const upsell = selectedExtras
      .filter((el) => el.selected)
      .map((el) => el.id);

    const certificates = people.map((el) => ({
      couple: el.name,
      startDate: el.startDate,
      city: el.city,
      photo: el.photo,
      theme: el.selectedTheme,
    }));

    const request = await fetch(
      "https://vxsoftware.space/api/v1/offers/certificate/orders/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: {
            plan: "single",
            extras: upsell,
            certificates,
          },
          name: customerData.name,
          whatsapp: customerData.whatsapp,
          email: customerData.email,
        }),
      },
    );

    const response = await request.json();
    const { payment, token } = response.data;
    const { qrCode, qrCodeBase64 } = payment;

    setPixData(qrCode, `data:imagepng;base64,${qrCodeBase64}`);
    setPaymentStatus("waiting");
    localStorage.setItem("order-payment", token);
  }

  async function checkPayment() {
    const token = localStorage.getItem("order-payment");
    if (!token) return;

    const res = await fetch(
      "https://vxsoftware.space/api/v1/offers/certificate/orders/current",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const data = await res.json();
    if (data.data.status === "approved") {
      stopPaymentWatcher();
      setPaymentStatus("paid");
      track("purchase", { value: totalAmount });
    }
  }

  function copyPixCode() {
    navigator.clipboard.writeText(pixCode).then(() => {
      copySuccess = true;
      setTimeout(() => (copySuccess = false), 2000);
    });
  }
</script>

<div class="step-payment">
  <div class="content-wrapper">
    <div class="payment-section">
      {#if paymentStatus !== "paid"}
        <div class="section-header">
          <h2>
            {paymentStatus === "generating"
              ? "Preparando tudo..."
              : "Quase lá, falta pouco!"}
          </h2>
          <p>Realize o pagamento para liberarmos seu quadro personalizado.</p>
        </div>
      {/if}

      {#if paymentStatus === "generating"}
        <div class="loading-state">
          <div class="crown-loader">
            <Crown size={48} />
          </div>
          <h3>Gerando QR Code...</h3>
        </div>
      {:else if paymentStatus === "waiting"}
        <div class="payment-content">
          <div class="qr-section">
            <div class="badge-pix">
              <Sparkles size={12} />
              Pix Instantâneo
            </div>
            <img src={pixQrCode} alt="QR Code PIX" class="qr-code" />
            <div class="pix-code-section">
              <label>Pix Copia e Cola</label>
              <div class="code-container">
                <input type="text" value={pixCode} readonly />
                <button
                  class="copy-btn"
                  on:click={copyPixCode}
                  class:success={copySuccess}
                >
                  {#if copySuccess}<CheckCircle size={16} />{:else}<Copy
                      size={16}
                    />{/if}
                  {copySuccess ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>

            <div class="instructions">
              <h4>Como pagar:</h4>
              <ul>
                <li>
                  Acesse o app do seu banco e escolha <strong>Pix</strong>.
                </li>
                <li>
                  Selecione <strong>Pagar com QR Code</strong> ou
                  <strong>Copia e Cola</strong>.
                </li>
                <li>
                  Valor exato: <span class="highlight"
                    >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
                  >.
                </li>
              </ul>
            </div>
          </div>

          <div class="status-waiting">
            <div class="loader-dots">
              <span></span><span></span><span></span>
            </div>
            <h4>Aguardando pagamento...</h4>
            <p>A confirmação acontece em segundos!</p>
          </div>
        </div>
      {:else if paymentStatus === "paid"}
        <div class="success-container animate-in">
          <div class="success-card">
            <div class="icon-header">
              <CheckCircle size={64} color="#b8935a" strokeWidth={1.5} />
            </div>
            <h2>Pagamento Confirmado!</h2>
            <p class="main-msg">
              Obrigado por confiar em nós para imortalizar seu pet.
            </p>

            <div class="delivery-steps">
              <div class="delivery-item">
                <div class="step-icon">
                  <MessageSquare size={22} color="#25D366" />
                </div>
                <div class="step-text">
                  <strong>Confira seu WhatsApp</strong>
                  <span
                    >Enviamos seu quadro agora mesmo para o número <b
                      >{customerData.whatsapp}</b
                    >.</span
                  >
                </div>
              </div>
              <div class="delivery-item">
                <div class="step-icon">
                  <Mail size={22} color="#b8935a" />
                </div>
                <div class="step-text">
                  <strong>Entrega alternativa por e-mail</strong>
                  <span
                    >Caso haja qualquer dificuldade na entrega via WhatsApp,
                    enviaremos para <b>{customerData.email}</b>.</span
                  >
                </div>
              </div>
            </div>

            <div class="guarantee-box">
              <div class="guarantee-header">
                <ShieldCheck size={18} />
                <span>Garantia de Entrega</span>
              </div>
              <p>
                Fique tranquilo(a)! Nosso sistema garante a entrega do seu
                produto. Caso ocorra qualquer imprevisto técnico, você conta com <strong
                  >reembolso integral automático</strong
                >.
              </p>
            </div>

            <div class="support-info">
              <AlertCircle size={14} />
              <span
                >Não recebeu? Verifique sua caixa de spam ou entre em contato
                com nosso suporte.</span
              >
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Right: Summary -->
    <div class="summary-side">
      <div class="order-summary">
        <div class="secure-checkout">
          <Lock size={13} /> Checkout Seguro
        </div>
        <h3>Resumo do Pedido</h3>
        <div class="summary-details">
          <div class="item">
            <span class="label">Item:</span>
            <span class="val">{selectedProduct?.name}</span>
          </div>
          <div class="item">
            <span class="label">Pet:</span>
            <span class="val">{people[0]?.name || "Personalizado"}</span>
          </div>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-total">
          <span>Total:</span>
          <span class="total-price"
            >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap");

  :root {
    --cream: #faf8f4;
    --dark: #2d2520;
    --gold: #b8935a;
    --gold-light: #d4aa72;
    --muted: #8a7e74;
    --border: rgba(184, 147, 90, 0.2);
  }

  .step-payment {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 50px;
    font-family: "DM Sans", sans-serif;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 30px;
  }

  /* Header */
  .section-header {
    margin-bottom: 28px;
  }

  .section-header h2 {
    font-family: "Cormorant Garamond", serif;
    color: var(--dark);
    font-size: 2.2rem;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .section-header p {
    color: var(--muted);
    font-weight: 300;
  }

  /* Loading */
  .loading-state {
    text-align: center;
    padding: 50px 0;
    color: var(--muted);
  }

  .crown-loader {
    color: var(--gold);
    margin-bottom: 20px;
    animation: pulse 1.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.7;
    }
  }

  /* QR Section */
  .qr-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 4px;
    text-align: center;
  }

  .badge-pix {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f5ede0;
    color: var(--gold);
    padding: 5px 14px;
    border-radius: 2px;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .qr-code {
    width: 200px;
    height: 200px;
    border: 1px solid var(--border);
    border-radius: 4px;
    margin-bottom: 24px;
  }

  .pix-code-section label {
    display: block;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .code-container {
    display: flex;
    gap: 8px;
    width: 100%;
  }

  .code-container input {
    flex: 1;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 0.82rem;
    color: var(--muted);
    background: white;
    font-family: "DM Sans", sans-serif;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 18px;
    background: var(--dark);
    color: var(--cream);
    border-radius: 2px;
    cursor: pointer;
    border: none;
    font-weight: 500;
    font-size: 0.82rem;
    font-family: "DM Sans", sans-serif;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .copy-btn:hover {
    background: var(--gold);
  }
  .copy-btn.success {
    background: #2f855a;
  }

  .instructions {
    text-align: left;
    margin-top: 20px;
    background: white;
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 4px;
    width: 100%;
  }

  .instructions h4 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1rem;
    color: var(--dark);
    margin-bottom: 10px;
    font-weight: 600;
  }

  .instructions ul {
    list-style: none;
    padding: 0;
    font-size: 0.85rem;
    color: var(--muted);
    font-weight: 300;
  }

  .instructions li {
    margin-bottom: 6px;
    padding-left: 18px;
    position: relative;
    line-height: 1.5;
  }

  .instructions li::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: var(--gold);
    font-size: 0.6rem;
    top: 4px;
  }

  .highlight {
    color: var(--gold);
    font-weight: 500;
  }

  /* Waiting */
  .status-waiting {
    padding: 20px;
    text-align: center;
    color: var(--muted);
  }

  .status-waiting h4 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.2rem;
    color: var(--dark);
    margin: 12px 0 4px;
  }

  .status-waiting p {
    font-size: 0.85rem;
    font-weight: 300;
  }

  .loader-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--gold);
    border-radius: 50%;
    margin: 0 4px;
    opacity: 0.3;
    animation: dots 1.4s infinite;
  }

  .loader-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loader-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes dots {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Success */
  .animate-in {
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .success-card {
    padding: 40px;
    text-align: center;
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 4px;
  }

  .icon-header {
    margin-bottom: 20px;
  }

  .success-card h2 {
    font-family: "Cormorant Garamond", serif;
    color: var(--dark);
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .main-msg {
    color: var(--muted);
    margin-bottom: 30px;
    font-weight: 300;
  }

  .delivery-steps {
    display: grid;
    gap: 16px;
    text-align: left;
    margin-bottom: 32px;
  }

  .delivery-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 16px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
  }

  .step-icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .step-text strong {
    display: block;
    color: var(--dark);
    font-size: 0.9rem;
    margin-bottom: 4px;
    font-weight: 500;
  }

  .step-text span {
    font-size: 0.82rem;
    color: var(--muted);
    line-height: 1.5;
    font-weight: 300;
  }

  .guarantee-box {
    background: #f5ede0;
    border: 1px solid rgba(184, 147, 90, 0.3);
    padding: 18px;
    border-radius: 4px;
    text-align: left;
    margin-bottom: 20px;
  }

  .guarantee-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--gold);
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .guarantee-box p {
    font-size: 0.82rem;
    color: var(--dark);
    margin: 0;
    line-height: 1.6;
    font-weight: 300;
  }

  .support-info {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--muted);
    font-size: 0.75rem;
    justify-content: center;
  }

  /* Summary */
  .order-summary {
    position: sticky;
    top: 20px;
    padding: 24px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 4px;
  }

  .secure-checkout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 0.72rem;
    color: #2f855a;
    margin-bottom: 16px;
    background: #f0fff4;
    padding: 6px;
    border-radius: 2px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .order-summary h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.3rem;
    color: var(--dark);
    margin-bottom: 16px;
    font-weight: 600;
  }

  .summary-details {
    display: grid;
    gap: 10px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
  }

  .label {
    color: var(--muted);
    font-weight: 300;
  }
  .val {
    color: var(--dark);
    font-weight: 500;
  }

  .summary-divider {
    height: 1px;
    background: var(--border);
    margin: 16px 0;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 400;
  }

  .total-price {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--dark);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }

    .summary-side {
      order: -1;
    }

    .code-container {
      flex-direction: column;
    }

    .copy-btn {
      padding: 14px;
      justify-content: center;
    }

    .success-card {
      padding: 24px;
    }
  }
</style>
