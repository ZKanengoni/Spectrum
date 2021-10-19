<script>
	import ExpressionCard from '$lib/blocks/ExpressionCard.svelte';
</script>

<div class="expression__container">
	<ExpressionCard />
</div>

<style>
	.expression__container {
		width: 100vw;
		height: calc(100vh - 4rem);
		padding: 2rem 0;
		overflow-y: hidden;
	}
</style>
