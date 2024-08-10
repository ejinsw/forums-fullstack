<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="w-full h-full flex justify-center items-center">
	<form
		use:enhance
		method="post"
		class="flex flex-col justify-center items-center bg-base-100 border border-base-200 rounded-xl px-4 py-8 shadow-xl"
	>
		<h1 class="text-center mb-8 text-xl font-bold">Login</h1>
		<div class="w-full mb-2 flex flex-col justify-center">
			<input
				type="text"
				placeholder="Enter username"
				value={form && form.username ? form.username : ''}
				name="username"
				id="username"
				class="w-full border px-2 py-1 rounded-lg"
				required
			/>
		</div>
		<div class="w-full mb-4 flex flex-col justify-center">
			<input
				type="text"
				placeholder="Password"
				value={form && form.password ? form.password : ''}
				name="password"
				id="password"
				class="w-full border px-2 py-1 rounded-lg"
				required
			/>
		</div>
		<button
			type="submit"
			class="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg">Login</button
		>
		{#if form?.error}
			<div class="text-red-500 text-xs">
				{form.error}
			</div>
		{/if}
		<div class="flex gap-1 items-center py-2">
			<small class="text-xs"> Don't have an account? </small>
			<a href="/register" class="text-xs text-blue-400 hover:text-blue-500">Register</a>
		</div>
	</form>
</div>
