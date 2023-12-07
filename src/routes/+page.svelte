<script lang="ts">
    import WordCloud from "../components/WordCloud.svelte";
    import type {Quote} from "@prisma/client";
    import {onMount} from "svelte";

    let quotes: Quote[] = []

    onMount(async () => {
        await updateQuotes()

        setInterval(async () => {
            await updateQuotes()
        }, 5000)
    })

    async function updateQuotes() {
        const response = await fetch("/api/quotes/top")
        quotes = await response.json()
    }
</script>

<div class="word-cloud-container">
    {#key quotes}
        {#if quotes.length > 0}
            <WordCloud width={1920} height={1080} words={quotes.map(q => ({
            text: q.text,
            count: q.votes.length,
        }))} padding={5} minFontSize={24} maxFontSize={88} backgroundColor="#000"/>
        {/if}
    {/key}
</div>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

    :global(body) {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background: black;
        overflow: hidden;
    }

    .word-cloud-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>


