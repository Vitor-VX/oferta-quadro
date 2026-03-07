<script lang="ts">
  import { Crown } from "lucide-svelte";
  import { products, selectProduct } from "$lib/stores/checkoutStore";

  export let onNext: () => void;
</script>

<div class="step-order">
  <div class="step-header">
    <h2>Quantos pets você quer imortalizar?</h2>
    <p>
      Cada quadro é único e gerado individualmente com base na foto do seu pet.
    </p>
  </div>

  <div class="products-grid">
    {#each products as product}
      <div class="product-card card">
        <div class="product-icon">
          <Crown size={32} />
        </div>

        <h3>{product.name}</h3>
        <p class="product-description">{product.description}</p>

        <div class="pricing">
          {#if product.oldPrice}
            <span class="price-old"
              >De R$ {product.oldPrice.toFixed(2).replace(".", ",")}</span
            >
          {/if}
          <div class="price-wrapper">
            <span class="currency">R$</span>
            <span class="price"
              >{product.price.toFixed(2).replace(".", ",")}</span
            >
          </div>
        </div>

        <button
          class="product-btn"
          on:click={() => {
            selectProduct(product);
            onNext();
          }}
        >
          Selecionar esta opção.
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap");

  .step-order {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .step-header {
    text-align: center;
    margin-bottom: 50px;
  }

  .step-header h2 {
    font-family: "Cormorant Garamond", cursive;
    font-size: 3.5rem;
    margin-bottom: 12px;
    font-style: italic;
    background: linear-gradient(90deg, #2d2520 40%, #b8935a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .step-header p {
    color: #8a7e74;
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 30px;
  }

  .product-card {
    text-align: center;
    position: relative;
    border: 1px solid rgba(184, 147, 90, 0.25);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #faf8f4;
    border-radius: 4px;
  }

  .product-card:hover {
    border-color: #b8935a;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(184, 147, 90, 0.12);
  }

  .product-icon {
    background: #f5ede0;
    color: #b8935a;
    padding: 16px;
    border-radius: 50%;
    margin: 0 auto 24px;
    width: fit-content;
    transition: transform 0.3s ease;
    border: 1px solid rgba(184, 147, 90, 0.2);
  }

  .product-card:hover .product-icon {
    transform: scale(1.1);
  }

  .product-card h3 {
    font-family: "Cormorant Garamond", sans-serif;
    font-size: 1.6rem;
    color: #2d2520;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .product-description {
    color: #8a7e74;
    margin-bottom: 24px;
    font-size: 0.95rem;
    min-height: 45px;
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
  }

  .pricing {
    margin-bottom: 32px;
  }

  .price-old {
    display: block;
    color: #b8a89a;
    font-size: 0.95rem;
    text-decoration: line-through;
    margin-bottom: 4px;
    font-family: "DM Sans", sans-serif;
  }

  .price-wrapper {
    color: #b8935a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .currency {
    font-size: 1.1rem;
    font-weight: 600;
    font-family: "DM Sans", sans-serif;
  }

  .price {
    font-size: 2.2rem;
    font-weight: 600;
    font-family: "Cormorant Garamond", serif;
  }

  .product-btn {
    padding: 16px 32px;
    font-size: 1rem;
    border-radius: 2px;
    background: #2d2520;
    color: #faf8f4;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: all 0.3s ease;
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  .product-btn:hover {
    background: #b8935a;
  }

  @media (max-width: 768px) {
    .step-header h2 {
      font-size: 2.5rem;
    }

    .products-grid {
      grid-template-columns: 1fr;
      padding: 0 10px;
    }

    .product-card {
      padding: 30px 20px;
    }
  }
</style>