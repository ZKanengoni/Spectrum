<script>
	// your script goes here
	export let title = 'Training game';
	export let heading = 'Card heading';
	export let info = 'Learn the expressions people use';
	export let played = '0';
	export let score = '0';
	export let colour = '--main-orange';
	export let top = false;
	export let tilt = '0';
</script>

<div class="card__container" style="transform: rotate({tilt}deg);">
	<div class="upper__card" style="background-color: var({colour});">
		<!-- {#if top}
			<div class="circles">
				<div class="circle" style="margin-top: 0.5rem;" />
				<div class="circle" style="margin-top: 0.5rem;" />
			</div>
		{/if} -->

		<div class="pill"><span>{title}</span></div>
		<div class="text__container">
			<p>{heading}</p>
			<span>{info}</span>
		</div>
	</div>
	<div class="lower__card">
		<div class="lower__text">
			<div class="col">
				<span>{played}</span>
				<span>Played</span>
			</div>
			<div class="col">
				<span>{score}</span>
				<span>Highest Score</span>
			</div>
		</div>
		<!-- {#if !top}
			<div class="circles">
				<div class="circle" />
				<div class="circle" />
			</div>
		{/if} -->
	</div>
</div>

<style>
	.card__container {
		width: 85%;
		height: 13rem;
		margin: 2.2rem auto;
		background-color: #fff;
		border-radius: 18px;
		border: 2px solid var(--card-border);
	}

	.upper__card {
		width: 100%;
		height: 70%;
		border-bottom: 2px solid var(--card-border);
		border-radius: 18px 18px 0 0;
		background-color: var(--main-orange);
	}

	.lower__card {
		width: 100%;
		height: calc(30% - 2px);
		background-color: #fff;
		border-radius: 0 0 18px 18px;
	}

	.pill {
		width: 7.8rem;
		height: 1.5rem;
		position: relative;
		top: 1.2rem;
		left: 1.2rem;
		padding-top: 0.8px;
		background-color: #fff;
		border-radius: 25px;
		border: 2px solid var(--card-border);
		text-align: center;
	}

	.pill span {
		font-size: 14px;
	}
	.text__container {
		width: 100%;
	}

	.text__container p {
		font-weight: 500;
		font-size: x-large;
		margin: 2rem 1rem 0 1rem;
	}

	.text__container span {
		margin: 0.5rem 1rem 0 1rem;
	}

	.lower__text {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.col {
		display: flex;
		flex-direction: column;
		text-align: center;
		padding: 8px 0 0 0;
	}

	.col span {
		font-size: 14.2px;
	}

	.col span:first-child {
		font-weight: 600;
	}

	.circles {
		width: 100%;
		position: relative;
		z-index: 999;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.circle {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background-color: var(--card-border);
	}

	.circle:nth-child(1) {
		margin-left: 1.8rem;
	}

	.circle:nth-child(2) {
		margin-right: 1.8rem;
	}
</style>
