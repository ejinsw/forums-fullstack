<script lang="ts">
	import type { Post, User } from '$lib/types';
	import { DateTime } from 'luxon';
	import { goto } from '$app/navigation';

	import UpvoteHollow from '~icons/bx/upvote';
	import UpvoteFilled from '~icons/bx/bxs-upvote';
	import DownvoteHollow from '~icons/bx/downvote';
	import DownvoteFilled from '~icons/bx/bxs-downvote';
	import IconamoonCommentDotsLight from '~icons/iconamoon/comment-dots-light';
	import { env } from '$env/dynamic/public';

	export let post: Post;
	export let user: User;
	export let jwt: string;

	$: upvotes = post.upvotes;
	$: downvotes = post.downvotes;

	$: upvoteUsers = upvotes ? upvotes.map((upvote) => upvote.userId) : null;
	$: downvoteUsers = downvotes ? downvotes.map((upvote) => upvote.userId) : null;

	$: upvoted = user && upvoteUsers ? upvoteUsers.includes(user.id) : false;
	$: downvoted = user && downvoteUsers ? downvoteUsers.includes(user.id) : false;

	$: postScore = upvotes && downvotes ? upvotes.length - downvotes.length : 'N/A';

	const date = DateTime.fromISO(post.creationDate).toLocaleString(DateTime.DATETIME_MED);
	const description = post.content.substring(0, 100);

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

{#if post.published}
	<div class="p-8 border rounded-lg hover:bg-base-300 flex flex-col gap-2">
		<a class="flex flex-col" href={`/posts/${post.id}`}>
			<a class="text-sm mb-2 hover:text-primary" href={`/profile/${post.userId}`}
				>@{post.user.username}</a
			>
			<h1 class="text-lg">{post.title}</h1>
			<p class="text-sm">{description}...</p>
			<p class="text-xs mt-2">{date}</p>
		</a>
		<span class="flex gap-2">
			<div class="flex gap-2 text-sm rounded-xl bg-base-200 px-2 py-1">
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
			<div class="flex gap-2 text-sm rounded-xl bg-base-200 px-2 py-1">
				<IconamoonCommentDotsLight />
				<span>{post.comments.length}</span>
			</div>
		</span>
	</div>
{/if}
