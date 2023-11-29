<!-- index.svelte -->

<script lang="ts">
    import WordCloud from "../components/WordCloud.svelte";

    const words = [
        {text: 'quote1count10a', count: 10},
        {text: 'quote2count15b', count: 15},
        {text: 'quote3count20c', count: 20},
        {text: 'quote4count25d', count: 25},
        {text: 'quote5count10a', count: 10},
        {text: 'quote6count15b', count: 15},
        {text: 'quote7count20c', count: 20},
        {text: 'quote8count25d', count: 25},
        {text: 'quote1count10a', count: 10},
        {text: 'quote2count15b', count: 15},
        {text: 'quote3count20c', count: 20},
        {text: 'quote4count25d', count: 25},
        {text: 'quote5count10a', count: 10},
        {text: 'quote6count15b', count: 15},
        {text: 'quote7count20c', count: 20},
        {text: 'quote8count25d', count: 25},
        {text: 'quote1count10a', count: 10},
        {text: 'quote2count15b', count: 15},
        {text: 'quote3count20c', count: 20},
        {text: 'quote4count25d', count: 25},
        {text: 'quote5count10a', count: 10},
        {text: 'quote6count15b', count: 15},
        {text: 'quote7count20c', count: 20},
        {text: 'quote8count25d', count: 25},
        {text: 'quote2count15b', count: 15},
        {text: 'quote3count20c', count: 20},
        {text: 'quote4count25d', count: 25},
        {text: 'quote5count10a', count: 10},
        {text: 'quote6count15b', count: 15},
        {text: 'quote7count20c', count: 20},
        {text: 'quote8count25d', count: 25},
        {text: 'quote2count15b', count: 15},
        {text: 'quote3count20c', count: 20},
        {text: 'quote4count25d', count: 25},
        {text: 'quote5count10a', count: 10},
        {text: 'quote6count15b', count: 15},
        {text: 'quote7count20c', count: 20},
        {text: 'quote8count25d', count: 25},
        {text: 'quote2count15b', count: 15},
        {text: 'quote3count20c', count: 20},
        {text: 'quote4count25d', count: 25},
        {text: 'quote5count10a', count: 10},
        {text: 'quote6count15b', count: 15},
        {text: 'quote7count20c', count: 20},
        {text: 'quote8count25d', count: 25},

    ];

</script>

<div class="word-cloud-container">
    <WordCloud width={1920} height={1080} words={words} padding={5}></WordCloud>
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


