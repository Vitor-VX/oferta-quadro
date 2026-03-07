<script lang="ts">
  import { checkoutStore, toggleExtra } from "$lib/stores/checkoutStore";
  import { ArrowRight } from "lucide-svelte";

  export let onNext: () => void;

  $: ({ selectedExtras, totalAmount } = $checkoutStore);

  $: hasFullCollection = selectedExtras.some(
    (e) => e.id === "collection" && e.selected,
  );
</script>

<div class="step-extras">
  <div class="step-header">
    <h2>Deixe o quadro ainda <em>mais especial</em></h2>
    <p>Adicione extras opcionais ao seu pedido</p>
  </div>

  <div class="extras-list">
    {#each selectedExtras as extra}
      {@const includedInCollection =
        hasFullCollection && extra.id === "with_photo"}

      <div class="extra-card card {includedInCollection ? 'disabled' : ''}">
        <div class="extra-content">
          <div class="extra-info">
            <h3>
              {extra.name}
              {#if includedInCollection}
                <span class="included-badge">Incluso na coleção</span>
              {/if}
            </h3>
            <p>{extra.description}</p>
          </div>

          <div class="extra-price">
            {#if includedInCollection}
              Incluso
            {:else}
              + R$ {extra.price.toFixed(2).replace(".", ",")}
            {/if}
          </div>
        </div>

        <label class="extra-checkbox">
          <input
            type="checkbox"
            checked={includedInCollection || extra.selected}
            disabled={includedInCollection}
            on:change={() => toggleExtra(extra.id)}
          />
          <span class="checkmark"></span>
          {#if includedInCollection}
            Incluso
          {:else}
            {extra.selected ? "Adicionado" : "Adicionar"}
          {/if}
        </label>
      </div>
    {/each}
  </div>

  <div class="step-footer">
    <div class="total-amount">
      <span
        >Total: <strong>R$ {totalAmount.toFixed(2).replace(".", ",")}</strong
        ></span
      >
    </div>
    <button class="btn-continue" on:click={onNext}>
      Continuar
      <ArrowRight size={16} />
    </button>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap");

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .included-badge {
    margin-left: 8px;
    font-size: 0.72rem;
    background: #f5ede0;
    color: #b8935a;
    padding: 3px 10px;
    border-radius: 2px;
    font-weight: 500;
    font-family: "DM Sans", sans-serif;
    letter-spacing: 0.05em;
  }

  .step-extras {
    max-width: 600px;
    margin: 0 auto;
    font-family: "DM Sans", sans-serif;
  }

  .step-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .step-header h2 {
    font-family: "Cormorant Garamond", serif;
    font-size: 2.8rem;
    color: #2d2520;
    margin-bottom: 12px;
    font-weight: 600;
    line-height: 1.1;
  }

  .step-header h2 em {
    font-style: italic;
    background: linear-gradient(90deg, #2d2520 0%, #b8935a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .step-header p {
    color: #8a7e74;
    font-size: 1rem;
    font-weight: 300;
  }

  .extras-list {
    margin-bottom: 40px;
  }

  .extra-card {
    margin-bottom: 16px;
    border: 1px solid rgba(184, 147, 90, 0.2);
    background: #faf8f4;
    border-radius: 4px;
    padding: 20px;
    transition: all 0.3s ease;
  }

  .extra-card:hover {
    border-color: #b8935a;
    box-shadow: 0 8px 24px rgba(184, 147, 90, 0.1);
  }

  .extra-card:has(input:checked) {
    border-color: #b8935a;
    background: #f5ede0;
  }

  .extra-content {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .extra-info {
    flex: 1;
  }

  .extra-info h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d2520;
    margin-bottom: 4px;
  }

  .extra-info p {
    color: #8a7e74;
    font-size: 0.88rem;
    margin: 0;
    font-weight: 300;
    line-height: 1.5;
  }

  .extra-price {
    font-weight: 500;
    color: #b8935a;
    font-size: 1rem;
    white-space: nowrap;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.2rem;
  }

  .extra-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 400;
    font-size: 0.88rem;
    color: #8a7e74;
    letter-spacing: 0.03em;
  }

  .extra-checkbox input {
    display: none;
  }

  .checkmark {
    width: 18px;
    height: 18px;
    border: 1px solid rgba(184, 147, 90, 0.4);
    border-radius: 2px;
    position: relative;
    transition: all 0.3s ease;
    background: white;
    flex-shrink: 0;
  }

  .extra-checkbox input:checked + .checkmark {
    background: #2d2520;
    border-color: #2d2520;
  }

  .extra-checkbox input:checked + .checkmark::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #d4aa72;
    font-size: 11px;
    font-weight: bold;
  }

  .step-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-top: 1px solid rgba(184, 147, 90, 0.2);
  }

  .total-amount {
    font-size: 1rem;
    color: #8a7e74;
    font-weight: 300;
  }

  .total-amount strong {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #2d2520;
  }

  .btn-continue {
    padding: 14px 28px;
    font-size: 0.9rem;
    border-radius: 2px;
    background: #2d2520;
    color: #faf8f4;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  .btn-continue:hover {
    background: #b8935a;
  }

  @media (max-width: 768px) {
    .extra-content {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .extra-price {
      align-self: flex-end;
    }

    .step-footer {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }

    .btn-continue {
      width: 100%;
      justify-content: center;
    }
  }
</style>
