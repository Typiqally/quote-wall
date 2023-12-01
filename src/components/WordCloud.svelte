<script lang="ts">
    import {onMount} from "svelte";
    import cloud from "d3-cloud";
    import {select} from "d3-selection";
    import {scaleOrdinal} from "d3-scale";

    interface Word extends cloud.Word {
        count: number
    }

    // props
    export let words: Word[] = [];
    export let width = 800;
    export let height = 500;
    export let font = "Impact";
    export let minFontSize = 25;
    export let maxFontSize = 50;
    export let minRotate = 0;
    export let maxRotate = 0;
    export let scheme = ['#8332a8', '#c7a4f5', '#a018de', '#faa7f0', '#c195fc', '#ad5ed1', '#e314cb', '#e8cce5', '#8c71b0', '#c352f7'];
    export let padding = 10;
    export let backgroundColor = "#000"

    const count = words.map(w => w.count)
    const minWordCount = count.reduce((prev, cur) => prev < cur ? prev : cur);
    const maxWordCount = count.reduce((prev, cur) => prev > cur ? prev : cur);

    // text color scheme
    const fill = scaleOrdinal(scheme);
    const layout = cloud<Word>()
        .size([width, height])
        .words(words)
        .padding(padding)
        .random(() => 0.5)
        .rotate(() => ~~(Math.random() * maxRotate) + minRotate)
        .font(font)
        .fontSize((datum: Word, index: number) =>
            Math.floor((maxFontSize - minFontSize) * (datum.count - minWordCount) / (maxWordCount - minWordCount) + minFontSize)
        )
        .on("end", draw);

    function draw(words: Word[]) {
        select("#wordcloud")
            .append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr(
                "transform",
                "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
            )
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", (d) => d.size + "px")
            .style("font-family", font)
            .style("fill", (_d, i) => fill(i.toString()))
            .attr("text-anchor", "middle")
            .attr(
                "transform",
                (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
            )
            .text((d) => d.text ?? "Unknown")
    }

    onMount(() => {
        layout.start()
    })
</script>

<div id="wordcloud" style="background-color: {backgroundColor};"/>

<style>
    div#wordcloud {
        width: fit-content;
        height: fit-content;
    }
</style>
