<script>
	export let pageTitle = '';
</script>

<div class="nav__container">
	<div class="nav__bar">
		<p>{pageTitle}</p>
		<div class="icons">
			<i class="fi fi-rr-bell" />
			<i class="fi fi-rr-settings" />
		</div>
	</div>
</div>

<style>
	.nav__container {
		display: flex;
		width: 100%;
		height: 4rem;
		background-color: #fff;
	}

	.nav__bar {
		width: 85%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding: 0.7rem 0;
	}

	.nav__bar p {
		position: absolute;
		color: var(--card-border);
		font-size: 18px;
		left: 2rem;
	}

	.icons {
		width: 25%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: absolute;
		right: 2rem;
	}

	.fi {
		font-size: 26px;
		display: block;
		color: var(--card-border);
		margin-top: 0.82rem;
	}
</style>
