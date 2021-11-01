import { writable } from 'svelte/store';

const user = writable({
	fullName: '',
	email: '',
	username: '',
	photoUrl: false
});

const isLoading = writable(false);
const expressionItems = writable([]);

export { user, isLoading, expressionItems };
