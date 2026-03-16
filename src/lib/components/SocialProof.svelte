<script lang="ts">
  import {
    Star,
    PawPrint,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
  } from "lucide-svelte";

  const reviews = [
    {
      img: "https://files.botsync.site/quadros/img-sites/temas-clientes/prova-01.jpeg",
      pet: "Thor",
      tutor: "Mariana",
      style: "Céu Épico",
    },
    {
      img: "https://files.botsync.site/quadros/img-sites/temas-clientes/prova-02.jpeg",
      pet: "Mel",
      tutor: "Rafael",
      style: "Céu Épico",
    },
    {
      img: "https://files.botsync.site/quadros/img-sites/temas-clientes/prova-03.jpeg",
      pet: "Camilinha",
      tutor: "Camila",
      style: "Céu Épico",
    },
  ];

  let scrollContainer: HTMLDivElement | null = null;

  function scroll(direction: "left" | "right") {
    const amount = 320;
    scrollContainer?.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }
</script>

<section class="social-proof">
  <div class="container">
    <div class="text-center mb-8">
      <div class="badge-mini">
        <PawPrint size={14} />
        <span>Arte Digital</span>
      </div>

      <h2 class="section-title">
        Quem já eternizou <span>seu pet</span>
      </h2>

      <p class="subtitle">
        Veja algumas artes digitais personalizadas já entregues para nossos
        clientes.
      </p>

      <p class="digital-note">
        Produto 100% digital. Você recebe a arte online, pronta para imprimir e
        emoldurar do seu jeito.
      </p>
    </div>

    <div class="carousel-wrapper">
      <button
        class="nav-btn prev"
        aria-label="Ver anteriores"
        on:click={() => scroll("left")}
      >
        <ChevronLeft size={22} />
      </button>

      <div class="carousel-track" bind:this={scrollContainer}>
        {#each reviews as review}
          <div class="proof-card">
            <div class="image-container">
              <img src={review.img} alt={`Arte digital do pet ${review.pet}`} />
              <div class="overlay">
                <!-- <span class="tag">{review.style}</span> -->
              </div>
            </div>

            <div class="info">
              <div class="stars">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>

              <h3>{review.pet}</h3>
              <p class="owner">Arte criada para {review.tutor}</p>

              <div class="verified">
                <CheckCircle2 size={14} />
                <span>Arte digital enviada</span>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <button
        class="nav-btn next"
        aria-label="Ver próximos"
        on:click={() => scroll("right")}
      >
        <ChevronRight size={22} />
      </button>
    </div>

    <div class="footer-stats">
      <div class="stat">
        <MessageSquare size={18} />
        <span>Entrega digital no WhatsApp</span>
      </div>

      <div class="divider-dot"></div>

      <div class="stat">
        <CheckCircle2 size={18} />
        <span>Alta resolução</span>
      </div>
    </div>
  </div>
</section>

<style>
  .social-proof {
    padding: 88px 0;
    background: #f8f6f2;
    overflow: hidden;
  }

  .container {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
  }

  .text-center {
    text-align: center;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  .badge-mini {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    border-radius: 999px;
    background: #efe8dc;
    border: 1px solid #e2d7c3;
    color: #6f5a3a;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .section-title {
    margin: 0 0 12px;
    font-size: clamp(2.4rem, 5vw, 4rem);
    line-height: 0.95;
    font-weight: 500;
    color: #2f241f;
    letter-spacing: -0.02em;
  }

  .section-title span {
    font-style: italic;
    color: #8f7447;
    font-weight: 400;
  }

  .subtitle {
    max-width: 700px;
    margin: 0 auto 12px;
    font-size: 1.02rem;
    line-height: 1.7;
    color: #6d6258;
  }

  .digital-note {
    max-width: 680px;
    margin: 0 auto;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #8a7865;
  }

  .carousel-wrapper {
    position: relative;
    margin-top: 44px;
    padding: 0 52px;
  }

  .carousel-track {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 10px 0 6px;
  }

  .carousel-track::-webkit-scrollbar {
    display: none;
  }

  .proof-card {
    flex: 0 0 290px;
    scroll-snap-align: start;
    background: #fffdf9;
    border: 1px solid #e9dfd1;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(47, 36, 31, 0.05);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease;
  }

  .proof-card:hover {
    transform: translateY(-4px);
    border-color: #dcc9a7;
    box-shadow: 0 18px 36px rgba(47, 36, 31, 0.08);
  }

  .image-container {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    width: 100%;
    background: #f2ede4;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: auto 0 0 0;
    padding: 18px;
    background: linear-gradient(to top, rgba(24, 19, 16, 0.7), transparent);
    display: flex;
    align-items: flex-end;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(255, 250, 242, 0.14);
    border: 1px solid rgba(255, 250, 242, 0.28);
    backdrop-filter: blur(6px);
    color: #fffaf2;
    font-size: 0.74rem;
    font-weight: 600;
  }

  .info {
    padding: 18px 18px 20px;
    text-align: left;
  }

  .stars {
    display: flex;
    gap: 3px;
    margin-bottom: 10px;
    color: #c6a46a;
  }

  .info h3 {
    margin: 0 0 6px;
    font-size: 1.15rem;
    font-weight: 600;
    color: #2f241f;
  }

  .owner {
    margin: 0 0 10px;
    font-size: 0.92rem;
    color: #7a6a5b;
    line-height: 1.5;
  }

  .verified {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #6f5a3a;
    font-size: 0.82rem;
    font-weight: 600;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid #dfd3c1;
    background: rgba(255, 253, 249, 0.95);
    box-shadow: 0 8px 18px rgba(47, 36, 31, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    color: #5a4635;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s ease;
  }

  .nav-btn:hover {
    background: #2f241f;
    color: #f8f6f2;
    border-color: #2f241f;
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }

  .footer-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .stat {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #6d6258;
    font-size: 0.92rem;
    font-weight: 600;
  }

  .divider-dot {
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: #cfb78e;
  }

  @media (max-width: 768px) {
    .social-proof {
      padding: 68px 0;
    }

    .carousel-wrapper {
      padding: 0;
      margin-top: 32px;
    }

    .nav-btn {
      display: none;
    }

    .proof-card {
      flex: 0 0 250px;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .subtitle,
    .digital-note {
      font-size: 0.95rem;
    }

    .footer-stats {
      flex-direction: column;
      gap: 10px;
    }

    .divider-dot {
      display: none;
    }
  }
</style>