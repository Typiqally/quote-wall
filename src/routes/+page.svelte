<script lang="ts">
    import WordCloud from "../components/WordCloud.svelte";
    import type {Quote} from "@prisma/client";

    /** @type {import('./$types').PageData} */
    export let data: {
        quotes: Quote[]
    };
</script>

<div class="word-cloud-container">
    {#if data.quotes}
        <WordCloud width={1700} height={1000} words={data.quotes.map(q => ({
            text: q.text,
            count: q.votes.length,
        }))} padding={5} minFontSize={16} maxFontSize={72} backgroundColor="#000"/>
    {/if}
</div>
<style>
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


