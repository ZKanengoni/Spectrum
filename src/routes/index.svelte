<script>
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

	let email = '';
	let password = '';
	$: error = false;
	let errorMessages = '';
	let logingIn = false;

	async function loginUser() {
		try {
			logingIn = true;
			const firebaseConfig = {
				apiKey: 'AIzaSyAEaCS39nM5oj1Ha2QNjbF1wDCQsPLrw-g',
				authDomain: 'spectrum-85e53.firebaseapp.com',
				databaseURL: 'https://spectrum-85e53-default-rtdb.europe-west1.firebasedatabase.app',
				projectId: 'spectrum-85e53',
				storageBucket: 'spectrum-85e53.appspot.com',
				messagingSenderId: '370298292177',
				appId: '1:370298292177:web:1cf840d94e03ee1ecc02f0',
				measurementId: 'G-8Y07CL3MET'
			};

			if (getApps().length === 0) initializeApp(firebaseConfig);

			const auth = getAuth();

			await signInWithEmailAndPassword(auth, email, password);
			logingIn = false;
		} catch (error) {
			logingIn = false;
			const errorCode = error.code;
			const errorMessage = error.message;
			errorMessages = errorCode;
			console.log(errorMessages);
			showError();
		}

		function showError() {
			error = true;

			setTimeout(() => {
				error = false;
			}, 4000);
		}
	}
</script>

<svelte:head>
	<title>Login - Spectrum</title>
</svelte:head>

<div class="login__container">
	<div class="alert" class:isVisible={error}>
		<p>{errorMessages}</p>
	</div>

	<div class="logo__section">
		<img src="../static/img/rainbow.png" alt="Spectrum logo" />
	</div>

	<form
		class="input__container"
		on:submit={(e) => {
			e.preventDefault();
			loginUser();
		}}
	>
		<input type="text" bind:value={email} placeholder="Email" required />
		<input type="password" bind:value={password} placeholder="Password" required />

		<button type="submit">
			{#if logingIn}
				Signing In...
			{:else}
				Sign In
			{/if}
		</button>

		<a href="/reset"><p>Forgot password?</p></a>

		<p id="signup">Don't have an account? <a href="/signup"><span>Register</span></a></p>
	</form>
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

	.login__container {
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
		width: 130px;
		height: 140px;
		margin: 8rem 0 0 0;
	}

	.input__container {
		width: 100%;
		height: 60%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.input__container input[type='text'],
	input[type='password'] {
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
		margin: 0;
	}

	.input__container p span {
		color: var(--main-blue);
	}

	#signup {
		margin: 9rem 0 0 0;
		cursor: pointer;
	}

	#btn-loader {
		width: 100%;
		height: 100%;
	}

	.alert {
		width: calc(100% - 4rem);
		padding: 1rem;
		margin: 1rem;
		position: absolute;
		background-color: #f8d7da;
		border-color: #f5c2c7;
		border-width: 2px;
		border-radius: 4px;
		opacity: 0;
		z-index: 999;
		transition: opacity 0.5s ease-in;
	}

	.isVisible {
		opacity: 1;
	}

	.alert p {
		margin: 0;
		color: #842029;
		font-size: 13px;
	}
</style>
