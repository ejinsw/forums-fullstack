<script lang="ts">
	import type { Post, User } from '$lib/types.js';
	import MaterialSymbolsArrowBackIosNew from '~icons/material-symbols/arrow-back-ios-new';
	import Comment from './Comment.svelte';

	import UpvoteHollow from '~icons/bx/upvote';
	import UpvoteFilled from '~icons/bx/bxs-upvote';
	import DownvoteHollow from '~icons/bx/downvote';
	import DownvoteFilled from '~icons/bx/bxs-downvote';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	interface Data {
		jwt: string;
		post: Post;
		previous_route: string;
		user: User;
	}

	export let data: Data;

	$: user = data.user;

	$: jwt = data.jwt;

	$: post = data.post;

	$: upvotes = post.upvotes;
	$: downvotes = post.downvotes;

	$: upvoteUsers = upvotes ? upvotes.map((upvote) => upvote.userId) : null;
	$: downvoteUsers = downvotes ? downvotes.map((upvote) => upvote.userId) : null;

	$: upvoted = user && upvoteUsers ? upvoteUsers.includes(user.id) : false;
	$: downvoted = user && downvoteUsers ? downvoteUsers.includes(user.id) : false;

	$: postScore = upvotes && downvotes ? upvotes.length - downvotes.length : 'N/A';

	$: comments = post.comments;

	let commentText: string = '';

	async function postComment() {
		if (!user || !jwt) {
			goto('/login');
			return;
		}
		if (commentText === '') {
			console.log('Invalid comment format');
			return;
		}

		const response = await fetch(`${env.PUBLIC_API_HOST}/api/posts/${post.id}/comments`, {
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

	async function toggleUpvote() {
		if (!user || !jwt) {
			goto('/login');
			return;
		}
		if (downvoted) toggleDownvote();

		const response = await fetch(`${env.PUBLIC_API_HOST}/api/posts/${post.id}/upvote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			}
		});

		if (response.ok) {
			if (upvoted) {
				// Remove the upvote
				upvotes = upvotes.filter((upvote) => upvote.userId !== user.id);
			} else {
				// Add the upvote
				upvotes = [...upvotes, { id: 0, user, userId: user.id }];
			}
		} else {
			const errorText = await response.json();
			console.error('Error:', errorText);
		}
	}

	async function toggleDownvote() {
		if (!user || !jwt) {
			goto('/login');
			return;
		}
		if (upvoted) toggleUpvote();

		const response = await fetch(`${env.PUBLIC_API_HOST}/api/posts/${post.id}/downvote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			}
		});

		if (response.ok) {
			if (downvoted) {
				// Remove the downvote
				downvotes = downvotes.filter((downvote) => downvote.userId !== user.id);
			} else {
				// Add the downvote
				downvotes = [...downvotes, { id: 0, user, userId: user.id }];
			}
		} else {
			const errorText = await response.json();
			console.error('Error:', errorText);
		}
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
	<div class="border-y border-gray-200 flex gap-4 items-center py-4 px-12">
		<div class="flex items-center gap-2 text-sm rounded-3xl bg-base-300 px-4 py-2 h-fit">
			<button on:click={toggleUpvote}>
				{#if upvoted}
					<UpvoteFilled />
				{:else}
					<UpvoteHollow />
				{/if}
			</button>
			<small class="text-xs">{postScore}</small>
			<button on:click={toggleDownvote}>
				{#if downvoted}
					<DownvoteFilled />
				{:else}
					<DownvoteHollow />
				{/if}
			</button>
		</div>

		<div class="flex w-full items-center text-sm">
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
	</div>

	<ul class="mx-12 my-12 flex flex-col gap-4">
		{#each comments as comment}
			{#if !comment.parentId}
				<Comment {comment} {jwt} {user} />
			{/if}
		{/each}
	</ul>
</div>
