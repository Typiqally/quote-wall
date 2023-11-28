
<script lang="ts">
	import cloudGeneration from './cloudGeneration.svelte';
</script>

<svelte:body use:classList="full-screen"/>

<cloudGeneration />

<style>
    :global(.full-screen) {
        width: 100vw;
        height: 100vh;
        margin: 0;
    }
</style>
