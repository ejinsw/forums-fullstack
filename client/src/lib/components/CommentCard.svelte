<script lang="ts">
	import type { Comment as CommentType, User } from '$lib/types';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	import Popup from '$lib/components/Popup.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import UpvoteHollow from '~icons/bx/upvote';
	import UpvoteFilled from '~icons/bx/bxs-upvote';
	import DownvoteHollow from '~icons/bx/downvote';
	import DownvoteFilled from '~icons/bx/bxs-downvote';
	import { PUBLIC_API_HOST } from '$env/static/public';

	export let comment: CommentType;
	export let user: User;
	export let jwt: string;

	$: upvotes = comment.upvotes;
	$: downvotes = comment.downvotes;

	$: upvoteUsers = upvotes ? upvotes.map((upvote) => upvote.userId) : null;
	$: downvoteUsers = downvotes ? downvotes.map((upvote) => upvote.userId) : null;

	$: upvoted = user && upvoteUsers ? upvoteUsers.includes(user.id) : false;
	$: downvoted = user && downvoteUsers ? downvoteUsers.includes(user.id) : false;

	$: commentScore = upvotes && downvotes ? upvotes.length - downvotes.length : 'N/A';

	function formatDate(date: string) {
		// Parse the input date string
		const parsedDate = DateTime.fromISO(date);

		// Calculate the difference between now and the input date
		const timeBetween = DateTime.now().diff(parsedDate);

		// Get the total minutes difference
		const totalMinutes = timeBetween.as('minutes');
		const totalHours = timeBetween.as('hours');
		const totalDays = timeBetween.as('days');

		// Format based on the time difference
		if (totalMinutes < 60) {
			// If less than 60 minutes, show minutes
			return `${Math.floor(totalMinutes)} minutes ago`;
		} else if (totalHours < 24) {
			// If less than 24 hours, show hours and minutes
			const hours = Math.floor(totalHours);
			const minutes = Math.floor(totalMinutes % 60);
			return `${hours}h ${minutes}m ago`;
		} else {
			// Otherwise, show days and hours
			const days = Math.floor(totalDays);
			const hours = Math.floor(totalHours % 24);
			return `${days} days ${hours}h ago`;
		}
	}

	async function toggleUpvote() {
		if (!user || !jwt) {
			goto('/login');
			return;
		}
		if (downvoted) toggleDownvote();

		const response = await fetch(`${PUBLIC_API_HOST}/api/comments/${comment.id}/upvote`, {
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

		const response = await fetch(`${PUBLIC_API_HOST}/api/comments/${comment.id}/downvote`, {
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

	const userCommentMenu = [
		{
			title: 'Share',
			callback: function () {
				console.log('Share');
			}
		}
	];

	const otherCommentMenu = [
		{
			title: 'Share',
			callback: function () {
				console.log('Share');
			}
		}
	];
</script>

<div class="flex flex-col">
	<li>
		<div class="flex items-center">
			<a
				class="text-sm hover:text-primary {comment.isDeleted && 'italic'}"
				href={`/posts/${comment.postId}`}
				>{!comment.isDeleted
					? `${comment.post.title} | ${comment.post.user.username}`
					: 'Deleted'}</a
			>
			<small class="text-xs ml-auto">{formatDate(comment.creationDate)}</small>
			<Popup items={user && user.id === comment.userId ? userCommentMenu : otherCommentMenu} />
		</div>
		{#if comment.parent}
			<p class="text-sm text-gray-400">
				@{comment.user.username} replied to @{comment.parent.user.username}
			</p>
		{/if}
		<p class="text-sm">
			{!comment.isDeleted ? comment.content : '[This comment has been deleted]'}
		</p>
		<span class="flex gap-2">
			<div class="flex gap-2 text-sm rounded-xl bg-base-300 px-2 py-1">
				<button on:click={toggleUpvote}>
					{#if upvoted}
						<UpvoteFilled />
					{:else}
						<UpvoteHollow />
					{/if}
				</button>
				<small class="text-xs">{commentScore}</small>
				<button on:click={toggleDownvote}>
					{#if downvoted}
						<DownvoteFilled />
					{:else}
						<DownvoteHollow />
					{/if}
				</button>
			</div>
		</span>
	</li>
</div>
