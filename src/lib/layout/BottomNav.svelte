<script>
	// your script goes here
</script>

<div class="nav__container">
	<div class="nav__bar">
		<i class="fi fi-rr-home" />
		<i class="fi fi-rr-playing-cards" />
		<i class="fi fi-rr-user" />
	</div>
</div>

<style>
	.nav__container {
		width: 100%;
		height: 3.4rem;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 2rem;
	}

	.nav__bar {
		width: 85%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		/* background-color: rgba(186, 135, 238, 0.842); */
		background-color: var(--main-blue);
		border-radius: 16px;
		border: 2px solid var(--card-border);
	}

	.fi {
		font-size: 26px;
		display: block;
		color: #fff;
		margin-top: 0.84rem;
	}

	i {
		cursor: pointer;
	}
</style>
