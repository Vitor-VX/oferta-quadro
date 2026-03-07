<script lang="ts">
  import { User, Phone, Mail, Camera, ImageIcon, Check } from "lucide-svelte";
  import {
    checkoutStore,
    updateCustomerData,
    updatePersonData,
  } from "$lib/stores/checkoutStore";
  import { track } from "$lib/track/meta";

  export let onNext: () => void;

  let customerData = {
    name: "",
    whatsapp: "",
    email: "",
  };

  let confirmWhatsapp = false;

  const themes = [
    {
      id: "ai",
      name: "IA Escolhe",
      preview: "https://files.botsync.site/quadros/img-sites/ai_option.jpg",
    },
    {
      id: "rococo",
      name: "Rococó",
      preview: "https://files.botsync.site/quadros/img-sites/recoco.jpg",
    },
    {
      id: "renaissance",
      name: "Renascentista",
      preview: "https://files.botsync.site/quadros/img-sites/renaissance.jpg",
    },
    {
      id: "sky",
      name: "Céu Épico",
      preview: "https://files.botsync.site/quadros/img-sites/sky_theme.jpg",
    },
  ];

  $: ({ selectedProduct, people, totalAmount, selectedExtras } =
    $checkoutStore);

  function sanitizeString(str: string) {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  function isValidBrazilWhatsapp(phone: string) {
    const clean = phone.replace(/\D/g, "");
    return clean.length === 11 && /^[1-9]{2}9\d{8}$/.test(clean);
  }

  function formatPhone(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})/, "$1-$2");
  }

  function handleThemeSelect(index: number, themeId: string) {
    updatePersonData(index, { selectedTheme: themeId });
  }

  function handleFileUpload(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) =>
        updatePersonData(index, { photo: event.target?.result as string });
      reader.readAsDataURL(target.files[0]);
    }
  }

  function handleSubmit() {
    if (!customerData.email || !customerData.name || !customerData.whatsapp) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!isValidBrazilWhatsapp(customerData.whatsapp)) {
      alert("Digite um WhatsApp válido com DDD e número iniciando com 9.");
      return;
    }

    const isMissingData = people.some((p) => !p.photo || !p.selectedTheme);
    if (isMissingData) {
      alert("Envie a foto e escolha um estilo para cada pet.");
      return;
    }

    if (!confirmWhatsapp) {
      alert("Por favor, confirme que seu WhatsApp está correto.");
      return;
    }

    updateCustomerData({
      ...customerData,
      name: sanitizeString(customerData.name),
      whatsapp: customerData.whatsapp.replace(/\D/g, ""),
    });

    onNext();
    track("initiate_checkout", { value: totalAmount });
  }
</script>

<div class="step-customer">
  <div class="content-wrapper">
    <!-- Left: Form -->
    <div class="form-section">
      <div class="section-header">
        <h2>Personalize seu <em>Quadro</em></h2>
        <p>Envie a foto e escolha o estilo — cuidamos do resto.</p>
      </div>

      <!-- One card per pet -->
      {#each people as person, index}
        <div class="pet-card">
          <div class="pet-card-header">
            <span class="badge">Pet {index + 1}</span>
          </div>

          <!-- Photo upload -->
          <div class="form-group">
            <label><Camera size={14} /> Foto do Pet</label>
            <div class="photo-upload-container">
              {#if person.photo}
                <div class="photo-preview">
                  <img src={person.photo} alt="Preview" />
                  <button
                    class="remove-photo"
                    on:click={() => updatePersonData(index, { photo: "" })}
                    >×</button
                  >
                </div>
              {:else}
                <label class="file-input-label">
                  <ImageIcon size={26} />
                  <span>Enviar foto</span>
                  <small>JPG, PNG ou WEBP</small>
                  <input
                    type="file"
                    accept="image/*"
                    on:change={(e) => handleFileUpload(index, e)}
                  />
                </label>
              {/if}
            </div>
          </div>

          <!-- Theme selection -->
          <div class="form-group">
            <label>Estilo do Quadro</label>
            <div class="themes-grid">
              {#each themes as theme}
                <button
                  type="button"
                  class="theme-option"
                  class:selected={person.selectedTheme === theme.id}
                  on:click={() => handleThemeSelect(index, theme.id)}
                >
                  <div class="theme-img-wrap">
                    <img src={theme.preview} alt={theme.name} />
                    {#if person.selectedTheme === theme.id}
                      <div class="theme-overlay">
                        <Check size={20} color="white" strokeWidth={2.5} />
                      </div>
                    {/if}
                  </div>
                  <span class="theme-name">{theme.name}</span>
                </button>
              {/each}
            </div>
          </div>
        </div>
      {/each}

      <!-- Customer data -->
      <div class="customer-section">
        <p class="customer-section-title">
          <Mail size={14} /> Informações de Envio
        </p>

        <div class="form-group">
          <label><User size={14} /> Seu Nome Completo</label>
          <input
            type="text"
            placeholder="Seu nome completo"
            bind:value={customerData.name}
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label><Phone size={14} /> WhatsApp</label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              value={customerData.whatsapp}
              on:input={(e) =>
                (customerData.whatsapp = formatPhone(e.target.value))}
            />
          </div>
          <div class="form-group">
            <label><Mail size={14} /> E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              bind:value={customerData.email}
            />
          </div>
        </div>

        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={confirmWhatsapp} />
            <div class="custom-checkbox">
              {#if confirmWhatsapp}<Check size={12} strokeWidth={3} />{/if}
            </div>
            <span
              >Confirmo que meu WhatsApp está correto para receber o quadro.</span
            >
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-submit" on:click={handleSubmit}>
          Gerar Quadro &amp; Pagar
        </button>
      </div>
    </div>

    <!-- Right: Summary -->
    <div class="summary-section">
      <div class="order-summary">
        <h3>Resumo do Pedido</h3>
        <div class="summary-item">
          <span class="label">Pacote</span>
          <span class="value">{selectedProduct?.name}</span>
        </div>
        <div class="summary-item">
          <span class="label">Quadro Digital</span>
          <span class="value"
            >R$ {selectedProduct?.price.toFixed(2).replace(".", ",")}</span
          >
        </div>
        {#each selectedExtras.filter((e) => e.selected) as extra}
          <div class="summary-item">
            <span class="label">{extra.name}</span>
            <span class="value gold"
              >+ R$ {extra.price.toFixed(2).replace(".", ",")}</span
            >
          </div>
        {/each}
        <div class="summary-divider"></div>
        <div class="summary-total">
          <span class="label">Total</span>
          <span class="value"
            >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
          >
        </div>
        <div class="secure-badge">
          <Check size={12} /> Pagamento 100% Seguro
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

  .step-customer {
    max-width: 1100px;
    margin: 0 auto;
    font-family: "DM Sans", sans-serif;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1.8fr 1.2fr;
    gap: 40px;
    align-items: start;
  }

  /* Header */
  .section-header {
    margin-bottom: 32px;
  }

  .section-header h2 {
    font-family: "Cormorant Garamond", serif;
    color: var(--dark);
    font-size: 3rem;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .section-header h2 em {
    font-style: italic;
    background: linear-gradient(90deg, var(--dark) 0%, var(--gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-header p {
    color: var(--muted);
    font-weight: 300;
  }

  /* Pet card */
  .pet-card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 20px;
  }

  .pet-card-header {
    margin-bottom: 20px;
  }

  .badge {
    background: var(--dark);
    color: var(--gold-light);
    padding: 4px 14px;
    border-radius: 2px;
    font-size: 0.68rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Form */
  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 0.95rem;
    background: white;
    outline: none;
    transition: border 0.2s;
    font-family: "DM Sans", sans-serif;
    color: var(--dark);
    box-sizing: border-box;
  }

  .form-group input:focus {
    border-color: var(--gold);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* Photo upload */
  .file-input-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 28px;
    border: 1px dashed rgba(184, 147, 90, 0.35);
    border-radius: 4px;
    background: white;
    cursor: pointer;
    color: var(--gold);
    transition: all 0.2s;
  }

  .file-input-label:hover {
    background: #f5ede0;
    border-color: var(--gold);
  }

  .file-input-label span {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--dark);
  }

  .file-input-label small {
    font-size: 0.72rem;
    color: var(--muted);
    font-weight: 300;
  }

  .file-input-label input {
    display: none;
  }

  .photo-preview {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border);
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-photo {
    position: absolute;
    top: 4px;
    right: 4px;
    background: var(--dark);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  /* Themes */
  .themes-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .theme-option {
    background: white;
    border: 1px solid var(--border);
    cursor: pointer;
    padding: 0;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.25s ease;
  }

  .theme-option:hover {
    border-color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(184, 147, 90, 0.12);
  }

  .theme-option.selected {
    border: 2px solid var(--dark);
    box-shadow: 0 6px 20px rgba(45, 37, 32, 0.12);
  }

  .theme-img-wrap {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
  }

  .theme-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .theme-option:hover .theme-img-wrap img {
    transform: scale(1.05);
  }

  .theme-overlay {
    position: absolute;
    inset: 0;
    background: rgba(45, 37, 32, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-name {
    display: block;
    font-size: 0.7rem;
    color: var(--dark);
    font-weight: 500;
    padding: 7px 6px;
    text-align: center;
    letter-spacing: 0.02em;
  }

  /* Customer section */
  .customer-section {
    margin-top: 32px;
  }

  .customer-section-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 20px;
  }

  /* Checkbox */
  .checkbox-group {
    margin-top: 20px;
    background: #f5ede0;
    border: 1px solid var(--border);
    padding: 14px 16px;
    border-radius: 4px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--muted);
    font-weight: 300;
  }

  .checkbox-label input {
    display: none;
  }

  .custom-checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(184, 147, 90, 0.4);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: var(--gold);
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .checkbox-label input:checked + .custom-checkbox {
    background: var(--dark);
    border-color: var(--dark);
    color: var(--gold-light);
  }

  /* Submit */
  .form-actions {
    margin-top: 24px;
  }

  .btn-submit {
    background: var(--dark);
    color: var(--cream);
    border: none;
    padding: 18px 24px;
    border-radius: 2px;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    cursor: pointer;
    font-family: "DM Sans", sans-serif;
    letter-spacing: 0.05em;
    transition: background 0.3s;
  }

  .btn-submit:hover {
    background: var(--gold);
  }

  /* Summary */
  .order-summary {
    position: sticky;
    top: 20px;
    padding: 26px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 4px;
  }

  .order-summary h3 {
    font-family: "Cormorant Garamond", serif;
    color: var(--dark);
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 18px;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 9px 0;
    font-size: 0.88rem;
  }

  .summary-item .label {
    color: var(--muted);
    font-weight: 300;
  }
  .summary-item .value {
    color: var(--dark);
    font-weight: 500;
  }
  .summary-item .value.gold {
    color: var(--gold);
  }

  .summary-divider {
    height: 1px;
    background: var(--border);
    margin: 14px 0;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 18px;
  }

  .summary-total .label {
    color: var(--muted);
    font-size: 0.88rem;
  }

  .summary-total .value {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--dark);
  }

  .secure-badge {
    background: #f0fff4;
    color: #2f855a;
    padding: 10px;
    border-radius: 2px;
    font-size: 0.72rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  @media (max-width: 850px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
    .order-summary {
      position: static;
      margin-bottom: 30px;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .themes-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
