<script lang="ts">
    import { Turnstile } from "svelte-turnstile";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";

    let verified = false;
    let error = false;

    function onSuccess(token: string) {
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
    <div class="skeleton-page">
        <div class="top-center">
            <div class="skel badge"></div>
        </div>

        <div class="title-area">
            <div class="skel title-line"></div>
        </div>

        <div class="subtitle-area">
            <div class="skel sub full"></div>
            <div class="skel sub full"></div>
            <div class="skel sub short"></div>
        </div>

        <div class="card-center">
            <div class="skel card-doc">
                <div class="skel inner-title"></div>
                <div class="doc-row">
                    <div class="skel photo-box"></div>
                    <div class="doc-lines">
                        <div class="skel doc-line"></div>
                        <div class="skel doc-line"></div>
                        <div class="skel doc-line short"></div>
                    </div>
                </div>
                <div class="skel doc-line med"></div>
                <div class="skel doc-line full"></div>
                <div class="skel doc-line full"></div>
                <div class="skel doc-line med"></div>
                <div class="skel doc-line short"></div>
            </div>
        </div>

        <div class="hidden">
            <Turnstile
                siteKey={PUBLIC_TURNSTILE_SITE_KEY}
                on:callback={(e) => onSuccess(e.detail.token)}
            />
        </div>
    </div>
{:else}
    <slot />
{/if}

<style>
    .skeleton-page {
        min-height: 100vh;
        background: #fff5f5;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 48px 24px;
        gap: 24px;
        animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .skel {
        background: linear-gradient(
            90deg,
            #f5e6e6 25%,
            #eedada 50%,
            #f5e6e6 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
        border-radius: 6px;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    .top-center {
        display: flex;
        justify-content: center;
    }
    .badge {
        width: 220px;
        height: 32px;
        border-radius: 20px;
    }

    .title-area {
        display: flex;
        justify-content: center;
    }
    .title-line {
        width: 420px;
        height: 52px;
        border-radius: 8px;
    }

    .subtitle-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .sub {
        height: 16px;
    }
    .sub.full {
        width: 380px;
    }
    .sub.short {
        width: 200px;
    }

    .card-center {
        display: flex;
        justify-content: center;
        margin-top: 8px;
    }
    .card-doc {
        width: 340px;
        min-height: 460px;
        border-radius: 16px;
        padding: 28px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        background: linear-gradient(
            90deg,
            #ede8e8 25%,
            #e0d8d8 50%,
            #ede8e8 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
    }

    .inner-title {
        width: 60%;
        height: 20px;
        align-self: center;
    }

    .doc-row {
        display: flex;
        gap: 12px;
        align-items: flex-start;
    }
    .photo-box {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        flex-shrink: 0;
    }
    .doc-lines {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 6px;
    }
    .doc-line {
        height: 12px;
    }
    .doc-line.short {
        width: 60%;
    }
    .doc-line.med {
        width: 70%;
        align-self: center;
    }
    .doc-line.full {
        width: 90%;
        align-self: center;
    }

    .hidden {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        height: 0;
        overflow: hidden;
    }
</style>
