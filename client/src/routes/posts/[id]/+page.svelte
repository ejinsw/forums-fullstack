<script lang="ts">
	import type { Post, User } from '$lib/types.js';
	import MaterialSymbolsArrowBackIosNew from '~icons/material-symbols/arrow-back-ios-new';
	import Comment from './Comment.svelte';

	interface Data {
		jwt: string;
		post: Post;
		previous_route: string;
		user: User;
	}

	export let data: Data;

	$: jwt = data.jwt;

	$: post = data.post;

	$: comments = post.comments;

	let commentText: string = '';

	async function postComment() {
        if (commentText === "" ) {
            console.log("Invalid comment format")
            return;
        }

		const response = await fetch(`http://localhost:3000/api/posts/${post.id}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify({ content: commentText })
		});

		if (!response.ok) {
			const errorText = await response.json();
			console.error('Error:', errorText);
		}

        location.reload();
	}
</script>

<div class="prose bg-base-100 min-h-screen m-4 border">
	<a class="flex min-w-fit min-h-fit m-8" href={data.previous_route}
		><MaterialSymbolsArrowBackIosNew /></a
	>
	<div class="flex flex-col mx-12 mb-12">
		<a class="textlg mb-2 hover:text-primary" href={`/profile/${post.userId}`}
			>@{post.user.username}</a
		>
		<h1 class="text-3xl mb-4">{post.title}</h1>
		<p class="progress-primary">{post.content}</p>
	</div>
	<!-- Comment Box -->
	<div class="border-y border-gray-200 py-4 px-12">
		{#if data.user}
			<div class="flex items-center text-sm">
				<input
					bind:value={commentText}
					type="text"
					name="comment"
					placeholder="Add a comment..."
					class="flex-grow border border-gray-300 rounded-lg py-2 px-4 mr-4"
				/>
				<button
					on:click={postComment}
					type="submit"
					class="bg-primary text-white rounded-lg py-2 px-6 hover:bg-primary-dark"
				>
					Submit
				</button>
			</div>
		{:else}
			<div class="flex w-full justify-center">
				<a class="shadow-lg px-4 py-2 rounded-xl bg-primary text-secondary-content" href="/login"
					>Login</a
				>
			</div>
		{/if}
	</div>

	<ul class="mx-12 my-12 flex flex-col gap-4">
		{#each comments as comment}
			<Comment {comment} {jwt} user={data.user} />
		{/each}
	</ul>
</div>
