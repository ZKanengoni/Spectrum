<script>
	import Card from '$lib/blocks/Card.svelte';

	function redirect(place) {
		location.href = `/${place}`;
	}
</script>

<svelte:head>
	<title>Games - Spectrum</title>
</svelte:head>

<div class="greeting">
	<p>Welcome to the <br /> game area!</p>
</div>

<a href="/expression">
	<Card
		title="Game"
		heading="Expression check"
		info="Click on me when you're ready to play! Make sure you have good lighting."
		tilt="-2"
		colour="--main-purple"
		mouse="pointer"
	/>
</a>

<a href="/quiz">
	<Card
		title="Quiz"
		heading="QuizAttack"
		info="Click on me when you're ready to play !"
		tilt="2"
		colour="--main-blue"
		mouse="pointer"
	/>
</a>

<style>
	p {
		font-size: 26px;
		margin: 0;
	}

	a {
		color: var(--card-border);
		text-decoration: none;
	}

	.greeting {
		width: 100%;
		height: 4rem;
		display: flex;
		justify-content: center;
		text-align: center;
		margin: 2rem 0 2rem 0;
	}
</style>
