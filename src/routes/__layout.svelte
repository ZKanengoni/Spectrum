<script>
	import '../app.css';
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import TopNav from '$lib/layout/TopNav.svelte';
	import BottomNav from '$lib/layout/BottomNav.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const pageTitle = {
		'/dashboard': 'Home',
		'/expression': 'Expressions'
	};

	onMount(() => {
		// const firebaseConfig = {
		// 	apiKey: 'AIzaSyAEaCS39nM5oj1Ha2QNjbF1wDCQsPLrw-g',
		// 	authDomain: 'spectrum-85e53.firebaseapp.com',
		// 	projectId: 'spectrum-85e53',
		// 	storageBucket: 'spectrum-85e53.appspot.com',
		// 	messagingSenderId: '370298292177',
		// 	appId: '1:370298292177:web:72febee46a30e903cc02f0',
		// 	measurementId: 'G-TX1C83D7QT'
		// };
		// if (getApps().length === 0) initializeApp(firebaseConfig);
		// const auth = getAuth();
	});
</script>

{#if $page.path != '/' && $page.path != '/signup' && $page.path != '/reset' && $page.path != '/expression'}
	<TopNav pageTitle={pageTitle[$page.path]} />

	<slot />

	<BottomNav />
{:else}
	<slot />
{/if}
