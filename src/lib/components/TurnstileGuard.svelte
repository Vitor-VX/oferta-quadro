<script lang="ts">
    import { Turnstile } from "svelte-turnstile";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";

    let verified = false;
    let error = false;

    function onSuccess(token: string) {
        alert("vindo aqui");
        fetch("/api/verify-turnstile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    verified = true;
                    sessionStorage.setItem("verified", "true");
                } else {
                    error = true;
                }
            });
    }
</script>

{#if !verified && PUBLIC_TURNSTILE_SITE_KEY}
    <div class="overlay">
        <div class="box">
            <p>Verificando acesso...</p>
            <Turnstile
                siteKey={PUBLIC_TURNSTILE_SITE_KEY}
                on:callback={(e) => onSuccess(e.detail.token)}
            />
            {#if error}
                <p class="erro">Verificação falhou. Recarregue a página.</p>
            {/if}
        </div>
    </div>
{:else}
    <slot />
{/if}

<style>
    .overlay {
        position: fixed;
        inset: 0;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    .box {
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .erro {
        color: #ff4444;
    }
</style>
