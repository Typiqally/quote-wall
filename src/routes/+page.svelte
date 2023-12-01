<script lang="ts">
    import WordCloud from "../components/WordCloud.svelte";
    import type {Quote} from "@prisma/client";
    import {onMount} from "svelte";

    let quotes: Quote[] = []

    onMount(async () => {
        setInterval(async () => {
            const response = await fetch("http://localhost:5173/api/quotes/top")
            quotes = await response.json()
        }, 5000)
    })
</script>

<div class="word-cloud-container">
    {#key quotes}
        {#if quotes.length > 0}
            <WordCloud width={1700} height={1000} words={quotes.map(q => ({
            text: q.text,
            count: q.votes.length,
        }))} padding={5} minFontSize={16} maxFontSize={72} backgroundColor="#000"/>
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
    }

    .word-cloud-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>


