<script lang="ts">
  import { onMount } from "svelte";
  import { Crown, Sparkles, ArrowRight } from "lucide-svelte";

  export let onStartCheckout: () => void;

  const carrosel = [
    // "https://files.botsync.site/quadros/img-sites/ai_option.jpg",
    "https://files.botsync.site/quadros/img-sites/recoco.jpg",
    "https://files.botsync.site/quadros/img-sites/renaissance.jpg",
    "https://files.botsync.site/quadros/img-sites/sky_theme.jpg",
  ];

  const styles = [/*"Obra Única",*/ "Rococó", "Renascentista", "Céu Épico"];

  let current = 0;
  let interval: any;
  let loaded = false;

  function next() {
    current = (current + 1) % carrosel.length;
  }

  onMount(() => {
    loaded = true;
    interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  });
</script>

<section class="hero">
  <!-- Background grain texture -->
  <div class="grain"></div>

  <!-- Decorative lines -->
  <div class="deco-line left"></div>
  <div class="deco-line right"></div>

  <div class="container" class:loaded>
    <!-- Left: Text content -->
    <div class="content">
      <div class="badge">
        <Crown size={12} />
        <span>Imortaliza seu Pet</span>
      </div>

      <h1 class="title">
        <span class="title-sub">Transforme a foto do seu pet em uma</span>
        <span class="title-main">Arte</span>
        <span class="title-end">digital personalizada</span>
      </h1>

      <p class="subtitle">
        Uma homenagem personalizada, enviada online para você imprimir e
        emoldurar do seu jeito.
      </p>

      <div class="styles-row">
        {#each styles as style, i}
          <span class="style-tag" class:active={i === current}>{style}</span>
        {/each}
      </div>

      <div class="cta-group">
        <button class="btn-primary" on:click={onStartCheckout}>
          <span>Quero minha arte digital</span>
          <ArrowRight size={18} />
        </button>

        <div class="price-block">
          <span class="price-old">R$ 47,00</span>
          <span class="price-new">R$ 19,90</span>
          <span class="price-note">entrega digital em até 24h</span>
        </div>
      </div>

      <div class="trust-row">
        <div class="trust-item">
          <span class="trust-icon">✦</span>
          <span>Alta fidelidade</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon">✦</span>
          <span>3 estilos exclusivos</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon">✦</span>
          <span>Arquivo em alta resolução</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon">✦</span>
          <span>Leva menos de 2 minutos para fazer seu pedido.</span>
        </div>
      </div>
    </div>

    <!-- Right: Carousel -->
    <div class="carousel-wrapper">
      <div class="frame-outer">
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>

        <div class="carousel">
          {#each carrosel as image, i}
            <img
              src={image}
              alt={styles[i]}
              class:active={i === current}
              class:initial={i === 0}
            />
          {/each}
        </div>
      </div>

      <!-- Style label -->
      <div class="style-label">
        <Sparkles size={12} />
        <span>{styles[current]}</span>
      </div>

      <!-- Dots -->
      <div class="dots">
        {#each carrosel as _, i}
          <button
            class="dot"
            class:active={i === current}
            on:click={() => (current = i)}
            aria-label={styles[i]}
          />
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap");

  :root {
    --cream: #faf8f4;
    --dark: #1a1614;
    --gold: #b8935a;
    --gold-light: #d4aa72;
    --muted: #8a7e74;
    --border: rgba(184, 147, 90, 0.2);
  }

  .hero {
    background: var(--cream);
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    font-family: "DM Sans", sans-serif;
  }

  /* Grain texture */
  .grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.4;
  }

  /* Decorative vertical lines */
  .deco-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent,
      var(--border) 30%,
      var(--border) 70%,
      transparent
    );
  }
  .deco-line.left {
    left: 8%;
  }
  .deco-line.right {
    right: 8%;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .container.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  /* Badge */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--gold);
    padding: 6px 16px;
    border-radius: 2px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  /* Title */
  .title {
    font-family: "Cormorant Garamond", serif;
    color: var(--dark);
    margin-bottom: 24px;
    line-height: 1;
    display: flex;
    flex-direction: column;
  }

  .title-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 300;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .title-main {
    font-size: clamp(4rem, 8vw, 7rem);
    font-weight: 600;
    font-style: italic;
    color: var(--dark);
    line-height: 0.9;
    background: linear-gradient(135deg, var(--dark) 0%, var(--gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .title-end {
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 300;
    color: var(--muted);
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  /* Subtitle */
  .subtitle {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.7;
    max-width: 420px;
    margin-bottom: 28px;
    font-weight: 300;
  }

  /* Style tags */
  .styles-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 36px;
  }

  .style-tag {
    padding: 4px 12px;
    border-radius: 2px;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    color: var(--muted);
    transition: all 0.4s ease;
    cursor: default;
  }

  .style-tag.active {
    background: var(--dark);
    color: var(--gold-light);
    border-color: var(--dark);
  }

  /* CTA */
  .cta-group {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--dark);
    color: var(--cream);
    border: none;
    padding: 16px 28px;
    font-family: "DM Sans", sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(184, 147, 90, 0.15) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn-primary:hover {
    background: #2d2520;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(26, 22, 20, 0.2);
  }

  .btn-primary:hover::after {
    opacity: 1;
  }

  .price-block {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .price-old {
    font-size: 0.8rem;
    color: var(--muted);
    text-decoration: line-through;
  }

  .price-new {
    font-family: "Cormorant Garamond", serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--dark);
    line-height: 1;
  }

  .price-note {
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  /* Trust row */
  .trust-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.03em;
  }

  .trust-icon {
    color: var(--gold);
    font-size: 0.6rem;
  }

  /* Carousel */
  .carousel-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .frame-outer {
    position: relative;
    padding: 16px;
    background: white;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.04),
      0 20px 60px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px rgba(184, 147, 90, 0.15);
  }

  /* Ornate corner decorations */
  .frame-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: var(--gold);
    border-style: solid;
  }
  .frame-corner.tl {
    top: 6px;
    left: 6px;
    border-width: 1px 0 0 1px;
  }
  .frame-corner.tr {
    top: 6px;
    right: 6px;
    border-width: 1px 1px 0 0;
  }
  .frame-corner.bl {
    bottom: 6px;
    left: 6px;
    border-width: 0 0 1px 1px;
  }
  .frame-corner.br {
    bottom: 6px;
    right: 6px;
    border-width: 0 1px 1px 0;
  }

  .carousel {
    position: relative;
    width: 280px;
    aspect-ratio: 3/4;
    overflow: hidden;
  }

  .carousel img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.04);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .carousel img.active {
    opacity: 1;
    transform: scale(1);
  }

  .style-label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--gold);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .dots {
    display: flex;
    gap: 8px;
  }

  .dot {
    width: 20px;
    height: 2px;
    background: var(--border);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot.active {
    background: var(--gold);
    width: 32px;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      padding: 60px 24px;
      gap: 48px;
      text-align: center;
    }

    .badge {
      margin: 0 auto 24px;
    }
    .subtitle {
      margin: 0 auto 24px;
    }
    .styles-row {
      justify-content: center;
    }

    .cta-group {
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .btn-primary {
      width: 100%;
      justify-content: center;
    }
    .price-block {
      align-items: center;
    }
    .trust-row {
      justify-content: center;
    }

    .deco-line {
      display: none;
    }

    .carousel-wrapper {
      animation: none;
    }
    .carousel {
      width: 220px;
    }
  }
</style>
