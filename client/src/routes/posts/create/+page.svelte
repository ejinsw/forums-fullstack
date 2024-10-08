<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_API_HOST } from '$env/static/public';

	export let data;

	$: user = data.user;
	$: jwt = data.jwt;

	let title = '';
	let content = '';

	async function addPost() {
		if (!user || !jwt) {
			goto('/login');
			return;
		}
		if (title === '' || content === '') {
			console.log('Invalid reply content');
			return;
		}

		const response = await fetch(`${PUBLIC_API_HOST}/api/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify({ title, content })
		});

		if (!response.ok) {
			const errorText = await response.json();
			console.error('Error:', errorText);
		}

		const { post } = await response.json();

		goto(`/posts/${post.id}`);
	}
</script>

<div class="flex items-center justify-center w-full h-full text-sm p-6">
	<div class="flex flex-col gap-6 w-full max-w-lg bg-base-100 shadow-lg p-6 rounded-lg">
		<h2 class="text-xl font-semibold">Create a New Post</h2>
		<input
			type="text"
			placeholder="Title"
			bind:value={title}
			class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
		<textarea
			rows="5"
			placeholder="Write something..."
			bind:value={content}
			class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
		></textarea>
		<div class="flex justify-end w-full">
			<button
				class="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				on:click={addPost}
			>
				Post
			</button>
		</div>
	</div>
</div>
