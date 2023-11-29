<script lang="ts">
    import {onMount} from "svelte";
    import cloud from "d3-cloud";
    import {select} from "d3-selection";
    import {scaleOrdinal} from "d3-scale";
    //import * as CS from "d3-scale-chromatic";

    // color scheme
    /*const color_scheme = {
        schemeCategory10: CS.schemeCategory10,
        schemeAccent: CS.schemeAccent,
        schemeDark2: CS.schemeDark2,
        schemePaired: CS.schemePaired,
        schemePastel1: CS.schemePastel1,
        schemePastel2: CS.schemePastel2,
        schemeSet1: CS.schemeSet1,
        schemeSet2: CS.schemeSet2,
        schemeSet3: CS.schemeSet3,
        schemeTableau10: CS.schemeTableau10,
    };*/

    // props
    export let words: {text: string, count: number}[] = [];
    export let width = 800;
    export let height = 500;
    export let font = "Impact";
    export let maxFontSize = 50;
    export let minRotate = 0;
    export let maxRotate = 0;
    export let scheme = "schemeTableau10";
    export let padding = 10;
    export let backgroundColor = "#000"

    // count max word occurence
    /*const maxWordCount = words.reduce((prev, cur) =>
        prev.count < cur.count ? prev.count : cur.count
    );*/

    function findMaxCount()
    {
        let cnt: number = 0;
        words.forEach((word) =>
        {
            if(word.count > cnt)
                cnt = word.count;
        })
        return cnt;
    }

    const maxWordCount = findMaxCount();

    // text color scheme
    const fill = scaleOrdinal(['#edbb2f', '#ed2fda', '#db041a', '#04dba2', '#7df0d1', '#c0f07d', '#f7cc74', '#026338', '#7748f7', '#c4c1c9']);

    const layout = cloud()
        .size([width, height])
        .words(words)
        .padding(padding)
        .rotate(() => ~~(Math.random() * maxRotate) + minRotate)
        .font(font)
        .fontSize(
            (d) => Math.floor((d.count / maxWordCount) * maxFontSize)
        )
        .on("end", draw);

    function draw(words) {
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
            .text((d) => d.text)
            .on("end", draw);
    }

    // mount
    onMount(async () => {
        layout.start();
    });

</script>

<div id="wordcloud" style="background-color: {backgroundColor};"/>

<style>
    div#wordcloud {
        width: fit-content;
        height: fit-content;
    }
</style>
