<script>
	import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, signOut } from '@firebase/auth';
	import { onMount } from 'svelte';

	export let pageTitle = '';

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
		<p>{pageTitle}</p>
		<div class="icons">
			<i class="fi fi-rr-bell" />
			<i class="fi fi-rr-sign-out-alt" on:click={logout} />
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
		font-size: 20px;
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
		cursor: pointer;
	}
</style>
