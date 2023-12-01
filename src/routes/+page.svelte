<script lang="ts">
    import WordCloud from "../components/WordCloud.svelte";
    import type {Quote} from "@prisma/client";

    /** @type {import('./$types').PageData} */
    export let data: {
        streamed: {
            quotes: Promise<Quote[]>
        }
    };
</script>

<div class="word-cloud-container">
    {#await data.streamed.quotes}
        Loading...
    {:then quotes}
        <WordCloud width={1500} height={1000} words={quotes.map(q => ({
            text: q.text,
            count: q.votes.length,
        }))} padding={5} minFontSize={16} maxFontSize={24} backgroundColor="#000"></WordCloud>
    {:catch error}
        {error.message}
    {/await}
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


