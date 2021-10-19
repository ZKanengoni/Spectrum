<script>
	// your script goes here
</script>

<div class="reset__container">
	<div class="logo__section">
		<img src="../static/img/padlock.png" alt="Spectrum logo" />
	</div>
	<div class="input__container">
		<h1>Trouble Logging In?</h1>

		<p id="email">Enter your email and we'll send you a link to get back into your account.</p>

		<input type="text" placeholder="Email" />

		<button>Send reset link</button>

		<p id="signup">Back to <a href="/"><span>Login</span></a></p>
	</div>
</div>

<style>
	input:focus {
		outline: none;
	}

	input,
	button {
		font-family: inherit;
		font-size: inherit;
	}

	.reset__container {
		width: 100vw;
		height: 100vh;
		background-color: var(--main-bg);
	}

	.logo__section {
		width: 100vw;
		height: 40%;
		display: flex;
		justify-content: center;
	}

	.logo__section img {
		width: 95px;
		height: 95px;
		margin: 12rem 0 0 0;
	}

	.input__container {
		width: 100%;
		height: 60%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.input__container input[type='text'] {
		width: 70%;
		padding: 16px;
		margin: 8px auto;
		border: none;
		border-radius: 8px;
		background-color: rgba(241, 240, 240, 0.726);
	}

	.input__container button {
		width: 78%;
		padding: 15px;
		margin: 40px auto;
		/* background-color: rgba(186, 135, 238, 0.842); */
		background-color: var(--main-blue);
		color: #fff;
		border: none;
		border-radius: 24px;
	}

	.input__container p {
		color: gray;
		margin: 0 0 1rem 0;
		padding: 0 2.5rem;
	}

	.input__container h1 {
		font-size: 20px;
		font-weight: 500;
		color: #262626;
	}

	.input__container p span {
		color: var(--main-blue);
	}

	#signup {
		margin: 1rem 0 0 0;
		cursor: pointer;
	}
</style>
