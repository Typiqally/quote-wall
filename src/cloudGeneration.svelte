<!-- index.svelte -->

<script lang="ts">

    import {onMount} from "svelte";
    import {writable} from 'svelte/store';
    import * as d3cloud from "d3-cloud";


    //max quotes
    let words: {text: string; size: number }[] = [];
    const wwords = writable<{text: string; size: number}[]>([]);

    //custom array to show more data that just text?
    interface Quote {
        id: number;
        creator: string;
        quote: string;
    }
    let quotes: { text: Quote, size: number}[] = [];

    function startupCanvas()
    {
        return document.createElement("canvas");
    }

    onMount(() => {
        //TODO: Call data from DB

        const tempData = [
            {text: 'quote1size10', size: 10},
            {text: 'quote2size15', size: 15},
            {text: 'quote3size20', size: 20}
        ];

        const layout = d3cloud().size([500, 500])
            .words(tempData)
            .padding(10)
            .rotate( () => (Math.random() > 0.5 ? 0 : 90) )
            .font('Impact')
            .fontSize((d) => d.size)
            .on('end', draw); //TODO: research event triggers: end vs word

        layout.start();

        function draw(words: {text: string; size: number }[])
        {
            words.forEach((word) => (word.x = word.x || 0));
            words.forEach((word) => (word.y = word.y || 0));
            words.forEach((word) => (word.size = word.size || 10));
            $wwords = words;
        }
    });

    function getRandomColor()
    {
        //generates random hexa. We can restrict this later
        return '#${Math.floor(random() * 16777215).toString(16)}';
    }

</script>

<style>

    /*TODO: add style to this thing...*/

</style>

<svg>
    {#each $wwords as {text, size}, i}
        <text
                x = {size}
                y = {size}
                font-size = {size}
                fill = {getRandomColor()}
                transform = {'translate(${size}, ${size}) rotate(45))'}
        >
            {text}
        </text>
    {/each}
</svg>

