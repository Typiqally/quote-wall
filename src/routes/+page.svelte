<!-- index.svelte -->

<script lang="ts">

    import {onMount} from "svelte";
    import {writable} from 'svelte/store';
    import * as d3cloud from "d3-cloud";
    //import {select} from "d3-selection";
    import cloud from "d3-cloud";


    //max quotes
    let words: {text: string; size: number; x: number; y: number }[] = [];
    let canvas;
    let context;
    let t, l;
    const wwords = writable<{text: string; size: number; x: number; y: number}[]>([]);
    let width = 1920;
    let height = 1080;

    onMount(() => {
        //TODO: Call data from DB
        context = canvas.getContext('2d');
        handleSize();

        const tempData = [
            {text: 'quote1size10a', size: 10},
            {text: 'quote2size15b', size: 15},
            {text: 'quote3size20c', size: 20},
            {text: 'quote4size25d', size: 25},
            {text: 'quote5size10a', size: 10},
            {text: 'quote6size15b', size: 15},
            {text: 'quote7size20c', size: 20},
            {text: 'quote8size25d', size: 25},
            {text: 'quote1size10a', size: 10},
            {text: 'quote2size15b', size: 15},
            {text: 'quote3size20c', size: 20},
            {text: 'quote4size25d', size: 25},
            {text: 'quote5size10a', size: 10},
            {text: 'quote6size15b', size: 15},
            {text: 'quote7size20c', size: 20},
            {text: 'quote8size25d', size: 25},
            {text: 'quote1size10a', size: 10},
            {text: 'quote2size15b', size: 15},
            {text: 'quote3size20c', size: 20},
            {text: 'quote4size25d', size: 25},
            {text: 'quote5size10a', size: 10},
            {text: 'quote6size15b', size: 15},
            {text: 'quote7size20c', size: 20},
            {text: 'quote8size25d', size: 25}
        ];

        const layout = cloud()
            .size([800, 800]) //TEMP
            .words(tempData)
            .padding(10)
            .rotate( function() { return (~~(Math.random() * 6) - 3) * 30; } )
            .font('Impact')
            .fontSize((d) => d.size)
            .on('end', draw);

        layout.start();

        function draw(words: {text: string; size: number; x: number; y: number }[])
        {
            //get the center of the canvas
            const canvasCenterX = width/2;
            const canvasCenterY = height/2;
            const minDistance = 20;

            context.clearRect(0, 0, width, height);

            words.forEach((word, i) => {
                word.x = canvasCenterX + word.x || 0;
                word.y = canvasCenterY + word.y || 0;
                word.size = word.size || 10;

                for (let j = 0; j < i; j++) {
                    const otherWord = words[j];
                    const distance = Math.sqrt((word.x - otherWord.x) ** 2 + (word.y - otherWord.y) ** 2);

                    if (distance < minDistance) {
                        // Move the words apart
                        const angle = Math.atan2(word.y - otherWord.y, word.x - otherWord.x);
                        const moveDistance = (minDistance - distance) / 2;

                        word.x += Math.cos(angle) * moveDistance;
                        word.y += Math.sin(angle) * moveDistance;
                        otherWord.x -= Math.cos(angle) * moveDistance;
                        otherWord.y -= Math.sin(angle) * moveDistance;
                    }
                }

                context.save();
                context.translate(word.x, word.y);
                //context.rotate((word.rotate * Math.PI) / 180);
                context.fillStyle = getRandomColor();
                context.strokeStyle = "rgba(0, 0, 0, 0)"; // Set the stroke color to black and transparency maxed
                context.lineWidth = 1; // Set the stroke width
                context.font = `${word.size}px Impact`;

                // Draw the rectangle around the text
                context.strokeRect(-word.size / 2, -word.size / 2, context.measureText(word.text).width, word.size);

                // Draw the text
                context.fillText(word.text, 0, 0);
                context.restore();
            });


            /*words.forEach((word) => {

                context.fillStyle = getRandomColor();
                context.font = `${word.size}px Impact`;
                context.fillText(word.text, word.x, word.y);
            })*/
            $wwords = words;
        }
    });

    function getRandomColor()
    {
        let arr: Array<String> = [ '#edbb2f', '#ed2fda', '#db041a', '#04dba2', '#7df0d1', '#c0f07d', '#f7cc74', '#026338', '#1c0263', '#c4c1c9'];
        const randomApprovedColor = (arr: string[]) =>
            arr.length ? arr[Math.floor(Math.random() * arr.length)] :  '#ffffff';
        return randomApprovedColor(arr);
    }

    const handleSize = () =>
    {
        const {top, left} = canvas.getBoundingClientRect()
        t = top
        l = left
    }

</script>

<svelte:window on:resize={handleSize} />

<canvas
        {width}
        {height}
        style="background: black"
        bind:this = {canvas}
/>

<style>
    :global(body) {
        width: 100vw;
        height: 100vh;
        margin: 0;
    }

    :global(canvas)
    {
        align-self: center;
        width: 100vw;
        height: 100vh;
    }



</style>


