<script lang="ts">
  import { UserCheck, MessageSquare, Shield, Sparkles } from "lucide-svelte";

  const benefits = [
    {
      icon: UserCheck,
      title: "100% Personalizado",
      description:
        "Cada quadro é criado com base na foto do SEU pet — preservando a pelagem, padrão, cor dos olhos e expressão únicas dele.",
      accent: "gold",
    },
    {
      icon: MessageSquare,
      title: "Entrega pelo WhatsApp",
      description:
        "Receba seu quadro digital poucos minutos após a confirmação, direto no seu <strong>WhatsApp</strong>.",
      accent: "dark",
    },
    {
      icon: Shield,
      title: "Compra com Segurança",
      description:
        "Pagamento via Pix com processamento criptografado e garantia de entrega imediata.",
      accent: "gold",
    },
  ];
</script>

<section class="benefits">
  <div class="container">
    <div class="header">
      <div class="badge">
        <Sparkles size={12} />
        <span>Por que nos escolher</span>
      </div>
      <h2 class="title">
        Por que escolher nosso<br />
        <em>Quadro de Pet?</em>
      </h2>
    </div>

    <div class="grid">
      {#each benefits as benefit}
        <div class="card">
          <div class="icon-wrap" class:dark={benefit.accent === "dark"}>
            <svelte:component this={benefit.icon} size={36} />
          </div>

          <h3>{benefit.title}</h3>
          <p>{@html benefit.description}</p>
        </div>
      {/each}
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

  .benefits {
    background: white;
    padding: 100px 0;
    font-family: "DM Sans", sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
  }

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
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 600;
    color: var(--dark);
    line-height: 1.1;
  }

  .title em {
    font-style: italic;
    background: linear-gradient(135deg, var(--dark), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .card {
    text-align: center;
    padding: 48px 32px;
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(26, 22, 20, 0.07);
    border-color: var(--gold);
  }

  .card:hover::after {
    opacity: 1;
  }

  .icon-wrap {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
    background: white;
    border: 1px solid var(--border);
    color: var(--gold);
    transition: all 0.3s ease;
  }

  .icon-wrap.dark {
    background: var(--dark);
    color: var(--gold-light);
    border-color: var(--dark);
  }

  .card:hover .icon-wrap {
    transform: rotate(8deg) scale(1.08);
  }

  .card h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 14px;
  }

  .card p {
    font-size: 0.95rem;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
  }

  .card p :global(strong) {
    color: var(--dark);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .benefits {
      padding: 60px 0;
    }
    .container {
      padding: 0 24px;
    }
    .grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .card {
      padding: 36px 24px;
    }
    .card:hover {
      transform: none;
    }
  }
</style>
