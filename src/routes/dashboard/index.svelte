<script>
	// your script goes here
	import Card from '$lib/blocks/Card.svelte';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	$: userInfo = {};
	$: names = [];

	onMount(() => {
		userInfo = JSON.parse(window.localStorage.getItem('user'));
		names = userInfo.fullName.split(' ');
	});
</script>

<svelte:head>
	<title>Dashboard - Spectrum</title>
</svelte:head>

<div class="dash__container">
	<div class="text__container">
		<p><span>Good</span> morning</p>
		<span>{names[0]}<span>{names[1]}</span></span>
	</div>

	<Card
		title="Learning"
		heading="Expression check"
		info="Copy the exprssions given to you."
		tilt="1"
	/>

	<Card
		title="Learning"
		heading="Quiz attack"
		info="Idetify the expressions shown."
		colour="--main-red"
		top="true"
		tilt="-1"
	/>
</div>

<style>
	.dash__container {
		width: 100vw;
		height: calc(100vh - 4rem);
	}

	.text__container {
		width: 100%;
		height: 6.5rem;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.text__container p {
		font-size: 26px;
		margin: 25px 0 5px 0;
	}

	.text__container p span {
		font-weight: 500;
	}

	.text__container span {
		font-size: 26px;
	}

	.text__container span span {
		font-weight: 500;
	}

	.string {
		width: 0.27rem;
		height: 4rem;
		background-color: #fff;
		border: 2px solid var(--card-border);
	}
</style>
