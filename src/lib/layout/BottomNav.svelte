<script>
	// your script goes here
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, signOut } from '@firebase/auth';
	import { onMount } from 'svelte';

	async function logout() {
		const auth = getAuth();

		await signOut(auth);
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
	});
</script>

<div class="nav__container">
	<div class="nav__bar">
		<i
			class="fi fi-rr-home"
			on:click={() => {
				location.href = '/dashboard';
			}}
		/>
		<i
			class="fi fi-rr-playing-cards"
			on:click={() => {
				location.href = '/games';
			}}
		/>
		<i class="fi fi-rr-user" on:click={logout} />
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
		border-radius: 16px;
		border: 2px solid var(--card-border);
	}

	.fi {
		font-size: 26px;
		display: block;
		color: #000;
		margin-top: 0.84rem;
	}

	i {
		cursor: pointer;
	}
</style>
