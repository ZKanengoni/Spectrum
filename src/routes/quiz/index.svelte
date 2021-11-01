<script>
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<div class="nav__container">
	<div
		class="btn-back"
		on:click={() => {
			location.href = '/games';
		}}
	>
		<i class="fi fi-rr-arrow-small-left" />
	</div>
</div>

<div class="img__container">
	<img src="" alt="" />
</div>

<div class="quiz" />

<style>
	.nav__container {
		width: 100%;
		height: 4rem;
		display: flex;
		flex-direction: row;
		margin: 0 0 0.5rem 0;
		padding-top: 2rem;
	}

	.btn-back {
		width: 40.5px;
		height: 40.5px;
		margin: 0 2.5rem 2rem;
		border-radius: 10px;
		border: 2px solid var(--card-border);
		text-align: center;
		cursor: pointer;
	}

	.btn-back i {
		font-size: 40px;
		color: var(--card-border);
	}

	.img__container {
		width: 80%;
		height: 16rem;
		margin: 0 auto;
	}
</style>
