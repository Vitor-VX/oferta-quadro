<script lang="ts">
    import {
        FileText,
        Download,
        Calendar,
        Clock,
        ShieldCheck,
        ExternalLink,
        AlertTriangle,
        Image as ImageIcon,
        Printer,
        Sparkles,
        MoreVertical,
        Compass,
        PawPrint,
        Palette,
        Frame,
    } from "lucide-svelte";
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { page } from "$app/stores";
    import { get } from "svelte/store";

    export let data;
    let id = "";
    let product: any = null;
    const daysRemaining = 7;

    onMount(() => {
        id = get(page).params.id ?? "";
        getPage();
    });

    const getPage = async () => {
        try {
            const request = await fetch(
                `https://vxsoftware.space/api/v1/offers/quadro-pet/slug/${id}`,
            );
            const response = await request.json();

            if (response.success) {
                const data = response.data;

                product = {
                    id: data.id,
                    name: data.name || "Quadro Artístico do Pet",
                    type: data.type || "png",
                    size: data.size || "2.8 MB",
                    createAt: new Date(data.createAt as string),
                    downloadUrl: data.downloadUrl,
                    previewUrl:
                        data.previewUrl ||
                        "https://files.botsync.site/quadros/img-sites/sky_theme.jpg",
                };
            }
        } catch (err) {
            console.error("Erro ao buscar a arte do pet:", err);
        }
    };

    const downloadFile = async () => {
        try {
            if (product === null) throw Error("Produto inválido..");

            const response = await fetch(product.downloadUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = product.name + "." + product.type;
            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erro ao baixar arquivo:", err);
            alert(
                "Não foi possível baixar a arte. Tente abrir em um navegador externo.",
            );
        }
    };
</script>

<svelte:head>
    <title>Download Arte - Quadro do seu Pet</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

{#if product}
    <main class="download-page">
        <div class="bg-elements">
            <div class="floating-paw p1">🐾</div>
            <div class="floating-paw p2">🐾</div>
        </div>

        <div class="container">
            <!-- AVISO NAVEGADOR -->
            <div class="browser-warning" in:fly={{ y: -20, duration: 600 }}>
                <div class="warning-header">
                    <AlertTriangle size={20} />
                    <span>Ação Necessária para Baixar</span>
                </div>
                <div class="steps-grid">
                    <div class="step">
                        <div class="step-num">1</div>
                        <p>
                            Toque nos <strong>3 pontos</strong>
                            <MoreVertical size={16} class="inline-icon" /> no topo.
                        </p>
                    </div>
                    <div class="step">
                        <div class="step-num">2</div>
                        <p>
                            Clique em <strong>"Abrir no navegador"</strong>
                            <Compass size={16} class="inline-icon" />.
                        </p>
                    </div>
                </div>
            </div>

            <header class="page-header">
                <div class="logo">
                    <div class="icon-circle">
                        <Palette size={24} color="white" />
                    </div>
                    <span>Quadro do seu Pet</span>
                </div>
            </header>

            <div class="content" in:fly={{ y: 30, duration: 1000 }}>
                <div class="product-card">
                    <div class="expiration-banner">
                        <Clock size={16} />
                        <span
                            >Disponível por mais <strong
                                >{daysRemaining} dias</strong
                            ></span
                        >
                    </div>

                    <div class="product-main">
                        <div class="file-display">
                            <div class="preview-frame">
                                <img
                                    src={product.previewUrl}
                                    alt="Preview da Arte"
                                />
                            </div>
                            <div class="file-type-badge {product.type}">
                                {#if product.type === "pdf"}
                                    <FileText size={14} /> PDF
                                {:else}
                                    <ImageIcon size={14} /> ALTA RES.
                                {/if}
                            </div>
                        </div>

                        <div class="product-details">
                            <div class="badge-new">
                                <Sparkles size={12} /> Arte Finalizada
                            </div>
                            <h1>{product.name}</h1>
                            <p class="description">
                                A foto do seu melhor amigo transformada em uma
                                obra de arte exclusiva.
                            </p>

                            <div class="meta-grid">
                                <div class="meta-item">
                                    <Calendar size={16} />
                                    <span
                                        >Gerado em {product.createAt.toLocaleDateString(
                                            "pt-BR",
                                        )}</span
                                    >
                                </div>
                                <div class="meta-item">
                                    <ShieldCheck size={16} />
                                    <span>Arquivo Verificado</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="action-area">
                        <button class="btn-download" on:click={downloadFile}>
                            <Download size={22} />
                            Baixar Arte em Alta Qualidade
                        </button>
                        <span class="file-info"
                            >Formato {product.type.toUpperCase()} • {product.size}</span
                        >
                    </div>

                    <div class="tips-section">
                        <div class="tip-card">
                            <Printer size={20} color="#ff9f1c" />
                            <div>
                                <strong>Dica de Impressão</strong>
                                <p>
                                    Para um quadro perfeito, use papel
                                    fotográfico fosco de alta gramatura.
                                </p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <Frame size={20} color="#ff9f1c" />
                            <div>
                                <strong>Moldura Recomendada</strong>
                                <p>
                                    Tamanhos A4 ou A3 com moldura de madeira
                                    valorizam ainda mais a arte.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="warning-box">
                    <AlertTriangle size={20} />
                    <p>
                        Atenção: Por segurança, este arquivo será <strong
                            >excluído permanentemente</strong
                        > em 7 dias. Salve agora!
                    </p>
                </div>
            </div>

            <footer class="page-footer">
                <p>Imortalize seu Pet Oficial 🐾</p>
                <p class="copy">
                    © {new Date().getFullYear()} Todos os direitos reservados.
                </p>
            </footer>
        </div>
    </main>
{:else}
    <div class="loading-screen" out:fade>
        <div class="loader-paw">🐾</div>
        <p>Preparando sua obra de arte...</p>
    </div>
{/if}

<style>
    :root {
        --primary-pet: #b8935a;
        --secondary-pet: #1a1614;
        --text-pet: #4a342e;
        --bg-pet: #fffcf0;
    }

    .download-page {
        min-height: 100vh;
        background-color: var(--bg-pet);
        font-family: "Quicksand", sans-serif;
        color: var(--text-pet);
        padding: 20px 0 40px;
        position: relative;
        overflow-x: hidden;
    }

    /* BROWSER WARNING */
    .browser-warning {
        background: #fff9db;
        border: 2px solid #ffec99;
        border-radius: 20px;
        padding: 18px;
        margin-bottom: 25px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }
    .warning-header {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #856404;
        font-weight: 700;
        margin-bottom: 12px;
        font-size: 0.85rem;
        text-transform: uppercase;
    }
    .steps-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
    .step {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        background: rgba(255, 255, 255, 0.6);
        padding: 10px;
        border-radius: 12px;
    }
    .step-num {
        background: var(--secondary-pet);
        color: white;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.75rem;
        flex-shrink: 0;
    }
    .step p {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.4;
        font-weight: 600;
    }
    .inline-icon {
        display: inline;
        vertical-align: middle;
        background: #f1f3f5;
        border-radius: 4px;
        padding: 2px;
    }

    /* DECORAÇÃO */
    .bg-elements {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }
    .floating-paw {
        position: absolute;
        color: #ffecb3;
        font-size: 2.5rem;
        opacity: 0.6;
        animation: float 6s infinite ease-in-out;
    }
    .p1 {
        top: 10%;
        left: 5%;
    }
    .p2 {
        bottom: 10%;
        right: 5%;
        animation-delay: 3s;
    }
    @keyframes float {
        0%,
        100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-15px) rotate(10deg);
        }
    }

    .container {
        max-width: 850px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 2;
    }

    .page-header {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 800;
        font-size: 1.5rem;
        color: var(--text-pet);
    }
    .icon-circle {
        background: var(--primary-pet);
        padding: 8px;
        border-radius: 14px;
        display: flex;
        box-shadow: 0 4px 12px rgba(255, 159, 28, 0.3);
    }

    .product-card {
        background: white;
        border-radius: 35px;
        box-shadow: 0 20px 60px rgba(74, 52, 46, 0.05);
        border: 1px solid #ffecb3;
        overflow: hidden;
    }

    .expiration-banner {
        background: #fff9eb;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--secondary-pet);
        font-size: 0.85rem;
        font-weight: 700;
        border-bottom: 1px solid #ffecb3;
    }

    .product-main {
        padding: 40px;
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 40px;
        align-items: center;
    }

    .file-display {
        position: relative;
    }
    .preview-frame {
        background: #4a342e;
        padding: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
    }
    .preview-frame img {
        width: 100%;
        display: block;
        border-radius: 2px;
        object-fit: contain;
    }

    .file-type-badge {
        position: absolute;
        bottom: -8px;
        right: -8px;
        padding: 6px 12px;
        border-radius: 8px;
        color: white;
        font-size: 0.7rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .file-type-badge.pdf {
        background: #e11d48;
    }
    .file-type-badge {
        background: #22c55e;
    }

    .badge-new {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #fff9eb;
        color: var(--secondary-pet);
        padding: 4px 12px;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .product-details h1 {
        font-size: 1.7rem;
        font-weight: 800;
        margin: 0 0 10px;
        line-height: 1.2;
    }
    .description {
        color: #8d6e63;
        font-size: 0.95rem;
        margin-bottom: 20px;
        line-height: 1.5;
        font-weight: 500;
    }

    .meta-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        color: #bfa2a2;
        font-weight: 600;
    }

    .action-area {
        padding: 0 40px 40px;
        text-align: center;
    }

    .btn-download {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background: linear-gradient(
            135deg,
            var(--primary-pet) 0%,
            var(--secondary-pet) 100%
        );
        color: white;
        border: none;
        padding: 22px 30px;
        border-radius: 100px;
        font-size: 1.15rem;
        font-weight: 800;
        font-family: inherit;
        box-shadow: 0 10px 25px rgba(247, 127, 0, 0.25);
        cursor: pointer;
        transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .btn-download:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(247, 127, 0, 0.35);
    }

    .file-info {
        display: block;
        margin-top: 12px;
        font-size: 0.75rem;
        color: #bfa2a2;
        font-weight: 700;
    }

    .tips-section {
        background: #fffdf9;
        padding: 30px 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        border-top: 1px solid #f0f0f0;
    }
    .tip-card {
        display: flex;
        gap: 15px;
    }
    .tip-card strong {
        display: block;
        font-size: 0.85rem;
        color: var(--text-pet);
    }
    .tip-card p {
        font-size: 0.75rem;
        color: #8d6e63;
        margin: 0;
        line-height: 1.4;
        font-weight: 600;
    }

    .warning-box {
        margin-top: 25px;
        background: #fef2f2;
        border: 1px solid #fee2e2;
        border-radius: 20px;
        padding: 18px;
        display: flex;
        align-items: center;
        gap: 15px;
        color: #dc2626;
    }
    .warning-box p {
        font-size: 0.8rem;
        margin: 0;
        line-height: 1.5;
        font-weight: 600;
    }

    .page-footer {
        margin-top: 40px;
        text-align: center;
        color: #bfa2a2;
        font-weight: 600;
    }
    .page-footer .copy {
        font-size: 0.7rem;
        margin-top: 5px;
    }

    .loading-screen {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fffcf0;
    }
    .loader-paw {
        font-size: 3rem;
        animation: bounce 1s infinite alternate;
    }
    @keyframes bounce {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-20px);
        }
    }

    @media (max-width: 768px) {
        .steps-grid {
            grid-template-columns: 1fr;
        }
        .product-main {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 30px 20px;
        }
        .file-display {
            display: flex;
            justify-content: center;
        }
        .preview-frame {
            width: 180px;
        }
        .tips-section {
            grid-template-columns: 1fr;
            padding: 30px 20px;
        }
        .action-area {
            padding: 0 20px 40px;
        }
    }
</style>
