<script lang="ts">
  import {
    Camera,
    Palette,
    DollarSign,
    Send,
    ArrowRight,
    Sparkles,
  } from "lucide-svelte";

  export let onStartCheckout: () => void;

  const steps = [
    {
      icon: Camera,
      number: "01",
      title: "Envie a Foto",
      description:
        "Escolha a melhor foto do seu pet — pode ser qualquer ângulo, desde que o rostinho apareça bem.",
    },
    {
      icon: Palette,
      number: "02",
      title: "Escolha o Estilo",
      description:
        "Barroco, Renascentista, Rococó, Céu Épico — ou deixe a IA escolher o melhor para o perfil do seu pet.",
    },
    {
      icon: DollarSign,
      number: "03",
      title: "Pagamento via Pix",
      description: "Finalize com Pix de forma instantânea e totalmente segura.",
    },
    {
      icon: Send,
      number: "04",
      title: "Receba o Quadro",
      description:
        "Seu quadro digital chega direto no seu WhatsApp em poucos minutos.",
    },
  ];
</script>

<section class="how">
  <div class="container">
    <div class="header">
      <div class="badge">
        <Sparkles size={12} />
        <span>Como funciona</span>
      </div>
      <h2 class="title">
        Passo a passo para o<br />
        <em>quadro perfeito</em>
      </h2>
    </div>

    <div class="steps">
      {#each steps as step, i}
        <div class="step">
          <div class="step-number">
            <span>{step.number}</span>
          </div>

          <div class="step-icon">
            <svelte:component this={step.icon} size={32} />
          </div>

          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>

        {#if i < steps.length - 1}
          <div class="connector"></div>
        {/if}
      {/each}
    </div>

    <div class="cta-wrap">
      <button class="btn-primary" on:click={onStartCheckout}>
        <span>Quero criar o meu agora</span>
        <ArrowRight size={18} />
      </button>
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

  .how {
    background: white;
    padding: 100px 0;
    font-family: "DM Sans", sans-serif;
    position: relative;
    overflow: hidden;
  }

  .how::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.35;
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
    position: relative;
  }

  .header {
    text-align: center;
    margin-bottom: 72px;
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
    background: white;
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

  /* Steps row */
  .steps {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-width: 1100px;
    margin: 0 auto 64px;
  }

  /* Individual step — sem caixa, só centralized */
  .step {
    flex: 1;
    text-align: center;
    position: relative;
    padding: 0 16px;
  }

  /* Numbered pill — igual ao original mas com dourado */
  .step-number {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: var(--gold);
    border: 1px solid var(--border);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    font-family: "Cormorant Garamond", serif;
    z-index: 2;
    white-space: nowrap;
  }

  /* Icon circle — igual ao original */
  .step-icon {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 24px;
    border-radius: 50%;
    margin: 20px auto 24px;
    width: fit-content;
    color: var(--gold);
    transition: all 0.3s ease;
  }

  .step:hover .step-icon {
    transform: rotate(-5deg) scale(1.08);
    border-color: var(--gold);
    background: white;
  }

  .step h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 12px;
  }

  .step p {
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.6;
    font-weight: 300;
  }

  /* Connector line — igual ao original */
  .connector {
    height: 2px;
    flex: 0.3;
    margin-top: 62px;
    background-image: linear-gradient(
      to right,
      var(--gold) 50%,
      transparent 50%
    );
    background-size: 10px 1px;
    opacity: 0.4;
  }

  /* CTA */
  .cta-wrap {
    text-align: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--dark);
    color: var(--cream);
    border: none;
    padding: 18px 36px;
    font-family: "DM Sans", sans-serif;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(26, 22, 20, 0.2);
  }

  /* Mobile */
  @media (max-width: 900px) {
    .container {
      padding: 0 24px;
    }

    .steps {
      flex-direction: column;
      align-items: center;
      gap: 50px;
    }

    .step {
      width: 100%;
      max-width: 340px;
    }

    .step-number {
      position: relative;
      top: 0;
      display: inline-flex;
      margin-bottom: -10px;
      transform: none;
      left: auto;
    }

    .connector {
      width: 2px;
      height: 30px;
      flex: none;
      background-image: linear-gradient(
        to bottom,
        var(--gold) 50%,
        transparent 50%
      );
      background-size: 1px 10px;
      margin: 0;
    }

    .btn-primary {
      width: 100%;
      justify-content: center;
    }
  }
</style>
