<script>
	import '../app.css';
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import TopNav from '$lib/layout/TopNav.svelte';
	import BottomNav from '$lib/layout/BottomNav.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		getFirestore,
		collection,
		updateDoc,
		query,
		onSnapshot,
		doc,
		getDoc,
		orderBy,
		where
	} from 'firebase/firestore';

	const pageTitle = {
		'/dashboard': 'Home',
		'/expression': 'Expressions',
		'/games': 'Games'
	};

	onMount(() => {
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

		onAuthStateChanged(auth, async (loggedInUser) => {
			if (loggedInUser) {
				if ($page.path === '/signup' || $page.path == '/') goto('/dashboard');
			}
		});
	});
</script>

{#if $page.path != '/' && $page.path != '/signup' && $page.path != '/reset' && $page.path != '/expression' && $page.path != '/quiz'}
	<TopNav pageTitle={pageTitle[$page.path]} />

	<slot />

	<BottomNav />
{:else}
	<slot />
{/if}
