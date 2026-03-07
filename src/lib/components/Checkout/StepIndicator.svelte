<script lang="ts">
  import { Crown, Check } from "lucide-svelte";
  export let currentStep: number;

  const steps = ["Pedido", "Extras", "Dados", "Pagamento"];
</script>

<div class="step-indicator">
  {#each steps as step, index}
    <div
      class="step-item"
      class:active={index === currentStep}
      class:completed={index < currentStep}
    >
      <div class="step-circle">
        {#if index < currentStep}
          <Check size={18} strokeWidth={3} />
        {:else if index === currentStep}
          <Crown size={16} />
        {:else}
          {index + 1}
        {/if}
      </div>
      <span class="step-label">{step}</span>
    </div>

    {#if index < steps.length - 1}
      <div class="step-line" class:completed={index < currentStep}></div>
    {/if}
  {/each}
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap");

  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 50px;
    padding: 0 10px;
    max-width: 600px;
    font-family: "DM Sans", sans-serif;
  }

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 2;
  }

  .step-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #faf8f4;
    color: rgba(184, 147, 90, 0.3);
    border: 1px solid rgba(184, 147, 90, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  }

  .step-item.active .step-circle {
    background: #2d2520;
    border-color: #2d2520;
    color: #d4aa72;
    transform: scale(1.15);
    box-shadow: 0 8px 20px rgba(45, 37, 32, 0.2);
  }

  .step-item.completed .step-circle {
    background: #f5ede0;
    border-color: rgba(184, 147, 90, 0.4);
    color: #b8935a;
  }

  .step-label {
    font-size: 0.85rem;
    color: #b8a89a;
    font-weight: 400;
    white-space: nowrap;
  }

  .step-item.active .step-label {
    color: #2d2520;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.75rem;
  }

  .step-item.completed .step-label {
    color: #b8935a;
  }

  .step-line {
    flex: 1;
    height: 1px;
    background: rgba(184, 147, 90, 0.15);
    margin: -25px 10px 0;
    position: relative;
    z-index: 1;
  }

  .step-line.completed {
    background: rgba(184, 147, 90, 0.4);
  }

  .step-line::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: rgba(184, 147, 90, 0.4);
    transition: width 0.4s ease;
  }

  .step-line.completed::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    .step-indicator {
      margin-bottom: 40px;
    }

    .step-circle {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }

    .step-label {
      font-size: 0.75rem;
    }

    .step-line {
      margin-top: -22px;
    }
  }
</style>
