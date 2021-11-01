<script>
	import { onMount } from 'svelte';
	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
	import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
	import { initializeApp, getApps } from 'firebase/app';
	import { user } from '$lib/stores';

	let newUser = {
		fullName: '',
		email: '',
		username: '',
		photoUrl: false
	};

	let email = '';
	let password = '';
	let alertMessage = '';
	let signinUp = false;
	$: messages = false;
	$: data = {};

	async function createUser() {
		try {
			signinUp = true;
			const auth = getAuth();
			const db = getFirestore();

			console.log(db);
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			$user = {
				email: userCredentials.user.email,
				...newUser
			};
			window.localStorage.setItem('user', JSON.stringify($user));
			const docRef = await setDoc(doc(db, 'users', userCredentials.user.uid), $user);
			signinUp = false;
		} catch (error) {
			signinUp = false;
			const errorCode = error.code;
			alertMessage = errorCode;
			showMessage();
		}
	}

	function showMessage() {
		messages = true;

		setTimeout(() => {
			messages = false;
		}, 4000);
	}

	onMount(async () => {
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

		const db = getFirestore();
		const docRef = doc(db, 'app', 'spectrum-85e53');
		const docSnap = await getDoc(docRef);

		console.log(docSnap);

		if (docSnap.exists()) {
			data = docSnap.data();
		} else {
			console.log(`Document does not exist.`);
		}
	});
</script>

<svelte:head>
	<title>Sign up - Spectrum</title>
</svelte:head>

<div class="signup__container">
	<div class="logo__section">
		<img src="../static/img/rainbow.png" alt="Spectrum logo" />
	</div>
	<form
		on:submit={(e) => {
			e.preventDefault();
			createUser();
		}}
		class="input__container"
	>
		<input type="text" placeholder="Full Name" bind:value={newUser.fullName} required />
		<input type="text" placeholder="Email" bind:value={email} required />
		<input type="text" placeholder="Username" bind:value={newUser.username} required />
		<input type="password" placeholder="Password" bind:value={password} required />

		<button>{signinUp ? 'Signing up...' : 'Sign up'}</button>

		<p id="signup">Already have an account? <a href="/"><span>Login</span></a></p>
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
	.signup__container {
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
		margin: 1rem 0 0 0;
		cursor: pointer;
	}
</style>
