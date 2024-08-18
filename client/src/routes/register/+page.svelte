<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
</script>

<div class="w-full h-full flex justify-center items-center">
	<form
		use:enhance
		method="post"
		class="flex flex-col w-64 justify-center items-center bg-base-100 border border-base-200 rounded-xl px-4 py-8 shadow-xl"
	>
		<h1 class="text-center mb-8 text-xl font-bold">Register</h1>
		<div class="w-full mb-2 flex justify-center">
			<input
				type="text"
				placeholder="Enter name"
				name="name"
				id="name"
				class="w-full border px-2 py-1 rounded-lg"
				required
			/>
		</div>
		<div class="w-full mb-2 flex flex-col justify-center">
			<input
				type="text"
				placeholder="Enter username"
				name="username"
				id="username"
				class="w-full border px-2 py-1 rounded-lg"
				required
			/>
		</div>
		<div class="w-full mb-4 flex flex-col justify-center">
			<input
				type="password"
				placeholder="Password"
				name="password"
				id="password"
				class="w-full border px-2 py-1 rounded-lg"
				required
			/>
		</div>
		<button
			type="submit"
			class="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg">Sign Up</button
		>
		<div class="flex gap-1 items-center py-2">
			<small class="text-xs"> Already have an account? </small>
			<a href="/login" class="text-xs text-blue-400 hover:text-blue-500">Login</a>
		</div>
	</form>
</div>
