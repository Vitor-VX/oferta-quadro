<script lang="ts">
  import {
    CheckCircle2,
    Sparkles,
    MousePointerClick,
    X,
    Crown,
  } from "lucide-svelte";

  const styles = [
    {
      id: "baroque",
      name: "Barroco Vermelho",
      tag: "Mais Pedido",
      description:
        "Luz dramática de vela, drapeado de veludo vermelho e sombras profundas.",
      before: "https://files.botsync.site/quadros/img-sites/recoco.jpg",
      after: "https://files.botsync.site/quadros/img-sites/sky_theme.jpg",
    },
    {
      id: "renaissance",
      name: "Renascentista",
      tag: "Clássico",
      description:
        "Céu dramático ao fundo, luz dourada e composição dos grandes mestres.",
      before: "https://files.botsync.site/quadros/img-sites/renaissance.jpg",
      after: "https://files.botsync.site/quadros/img-sites/ai_option.jpg",
    },
    {
      id: "rococo",
      name: "Rococó",
      tag: "Sofisticado",
      description:
        "Paleta suave, detalhes ornamentais e atmosfera da corte francesa.",
      before: "https://files.botsync.site/quadros/img-sites/recoco.jpg",
      after: "https://files.botsync.site/quadros/img-sites/renaissance.jpg",
    },
  ];

  let active: string | null = null;

  function toggle(id: string) {
    active = active === id ? null : id;
  }
</script>

<section class="showcase">
  <div class="container">
    <div class="header">
      <div class="badge">
        <Crown size={12} />
        <span>Estilos Disponíveis</span>
      </div>
      <h2 class="title">
        Escolha o <em>Estilo</em><br />do seu Quadro
      </h2>
      <p class="subtitle">
        Cada estilo é gerado com IA treinada nas técnicas dos grandes mestres da
        pintura europeia. Clique em cada card para comparar os retratos.
      </p>
    </div>

    <div class="grid">
      {#each styles as style}
        <div
          class="card"
          class:expanded={active === style.id}
          on:click={() => toggle(style.id)}
          role="button"
          tabindex="0"
        >
          <!-- Top bar -->
          <div class="card-top">
            <span class="tag">{style.tag}</span>
            <button class="toggle-btn" class:open={active === style.id}>
              {#if active === style.id}
                <X size={13} />
                <span>Fechar</span>
              {:else}
                <MousePointerClick size={13} />
                <span>Comparar</span>
              {/if}
            </button>
          </div>

          <!-- Images stack -->
          <div class="stack">
            <div class="img-card back">
              <img src={style.after} alt="Estilo {style.name} — variação" />
              <div class="img-label alt">
                <Sparkles size={9} />
                Variação B
              </div>
            </div>
            <div class="img-card front">
              <img src={style.before} alt="Estilo {style.name}" />
              <div class="img-label main">Principal</div>
            </div>
          </div>

          <!-- Info -->
          <div class="info">
            <h3>{style.name}</h3>
            <p>{style.description}</p>
            <div class="features">
              <span class="feat">
                <CheckCircle2 size={14} />
                Alta resolução
              </span>
              <span class="feat">
                <CheckCircle2 size={14} />
                Entrega em 24h
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Footer note -->
    <div class="footer-note">
      <Sparkles size={14} />
      <span
        >Não sabe qual escolher? Selecione <strong>IA Escolhe</strong> e deixamos
        decidir pelo perfil do seu pet.</span
      >
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap");

  :root {
    --cream: #faf8f4;
    --dark: #1a1614;
    --gold: #b8935a;
    --gold-light: #d4aa72;
    --muted: #8a7e74;
    --border: rgba(184, 147, 90, 0.2);
  }

  .showcase {
    background: white;
    padding: 100px 0;
    font-family: "DM Sans", sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
  }

  /* Header */
  .header {
    text-align: center;
    margin-bottom: 64px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    color: var(--gold);
    padding: 6px 16px;
    border-radius: 2px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .title {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 600;
    color: var(--dark);
    line-height: 1.05;
    margin-bottom: 20px;
  }

  .title em {
    font-style: italic;
    background: linear-gradient(135deg, var(--dark), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1rem;
    color: var(--muted);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
    font-weight: 300;
  }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;
  }

  /* Card */
  .card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 64px 20px 28px;
    position: relative;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 60%,
      rgba(184, 147, 90, 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  .card:hover {
    border-color: var(--gold);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(26, 22, 20, 0.08);
  }

  .card:hover::before {
    opacity: 1;
  }

  /* Card top bar */
  .card-top {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }

  .tag {
    background: var(--dark);
    color: var(--gold-light);
    padding: 4px 12px;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 2px;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: white;
    border: 1px solid var(--border);
    color: var(--muted);
    padding: 5px 10px;
    font-size: 0.65rem;
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .toggle-btn.open {
    background: var(--dark);
    color: var(--cream);
    border-color: var(--dark);
  }

  /* Stack */
  .stack {
    position: relative;
    height: 280px;
    margin-bottom: 24px;
    perspective: 1000px;
  }

  .img-card {
    position: absolute;
    width: 160px;
    aspect-ratio: 3/4;
    left: 50%;
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 3px solid white;
  }

  .img-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .img-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 7px;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    backdrop-filter: blur(8px);
  }

  .img-label.main {
    background: rgba(26, 22, 20, 0.75);
    color: var(--cream);
  }

  .img-label.alt {
    background: rgba(184, 147, 90, 0.9);
    color: white;
  }

  /* Default positions */
  .front {
    z-index: 2;
    transform: translateX(-52%) rotate(3deg);
  }

  .back {
    z-index: 1;
    transform: translateX(-48%) rotate(-6deg);
    opacity: 0.6;
  }

  /* Expanded positions */
  .card.expanded .front {
    transform: translateX(calc(-50% + 72px)) rotate(8deg) scale(1.04);
    z-index: 2;
    opacity: 1;
  }

  .card.expanded .back {
    transform: translateX(calc(-50% - 72px)) rotate(-10deg) scale(1.04);
    z-index: 2;
    opacity: 1;
  }

  /* Hover (not expanded) */
  @media (min-width: 1024px) {
    .card:hover:not(.expanded) .front {
      transform: translateX(-40%) rotate(5deg);
    }
    .card:hover:not(.expanded) .back {
      transform: translateX(-60%) rotate(-8deg);
      opacity: 0.8;
    }
  }

  /* Info */
  .info {
    text-align: center;
  }

  .info h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 8px;
  }

  .info p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 16px;
    font-weight: 300;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .feat {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    color: var(--gold);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 500;
  }

  /* Footer note */
  .footer-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--muted);
    font-size: 0.85rem;
    font-weight: 300;
    background: var(--cream);
  }

  .footer-note :global(svg) {
    color: var(--gold);
    flex-shrink: 0;
  }
  .footer-note strong {
    color: var(--dark);
    font-weight: 500;
  }

  /* Mobile */
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 420px;
      margin: 0 auto 48px;
    }

    .container {
      padding: 0 24px;
    }

    .stack {
      height: 240px;
    }

    .img-card {
      width: 130px;
    }

    .card.expanded .front {
      transform: translateX(calc(-50% + 58px)) rotate(8deg) scale(1.04);
    }
    .card.expanded .back {
      transform: translateX(calc(-50% - 58px)) rotate(-10deg) scale(1.04);
    }
  }
</style>
