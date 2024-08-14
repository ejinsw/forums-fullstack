<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Comment as CommentType, User } from '$lib/types';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	import MingcuteSendLine from '~icons/mingcute/send-line';
	import Popup from '$lib/components/Popup.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let comment: CommentType;
	export let user: User;
	export let jwt: string;

	let showReply = false;
	let replies: CommentType[] = [];
	let replyText: string  = "";

	let isEditing = false; // Track edit mode
	let editedContent = comment.content; // Store edited content

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

	async function getReplies() {
		try {
			const res = await fetch(`http://localhost:3000/api/comments/${comment.id}/replies`);
			if (!res.ok) {
				return;
			}
			replies = await res.json();
		} catch (err) {
			console.log(err.message);
		}
	}

	function enableEdit() {
		isEditing = true;
	}

	const currentPath = $page.url.pathname;
	$: encodedRedirect = encodeURIComponent(currentPath);

	async function saveEdit() {
		comment.content = editedContent;
		isEditing = false;
		const encodedContent = encodeURIComponent(comment.content);

		goto(`/comments/${comment.id}/update?content=${encodedContent}&redirect=${encodedRedirect}`);
	}

	function cancelEdit() {
		editedContent = comment.content;
		isEditing = false;
	}

	async function deleteComment() {
		try {
			const response = await fetch(`http://localhost:3000/api/comments/${comment.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`
				}
			});
		} catch (error) {
			console.log(error);
		}

		location.reload();
	}

	async function addReply() {
        if (replyText === "") {
            console.log("Invalid reply content")
            return;
        }


		const response = await fetch(`http://localhost:3000/api/comments/${comment.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify({ content: replyText })
		});

		if (!response.ok) {
			const errorText = await response.json();
			console.error('Error:', errorText);
		}

		location.reload();
	}

	const userCommentMenu = [
		{
			title: 'Edit',
			callback: enableEdit
		},
		{
			title: 'Delete',
			callback: deleteComment
		},
		{
			title: 'Share',
			callback: function () {
				console.log('Share');
			}
		}
	];

	// Fetch replies when the component mounts
	onMount(() => {
		getReplies();
	});
</script>

<div class="flex flex-col">
	<li>
		<div class="flex items-center">
			<a
				class="text-sm hover:text-primary {comment.isDeleted && 'italic'}"
				href={`/profile/${comment.userId}`}
				>@{!comment.isDeleted ? comment.user.username : 'Deleted'}</a
			>
			<small class="text-xs ml-auto">{formatDate(comment.creationDate)}</small>
			<Popup items={userCommentMenu} />
		</div>
		{#if isEditing}
			<div class="flex items-center">
				<input
					type="text"
					class="flex-grow border rounded-lg py-1 px-2"
					bind:value={editedContent}
				/>
				<button class="ml-2 text-primary" on:click={saveEdit}>Save</button>
				<button class="ml-2 text-secondary" on:click={cancelEdit}>Cancel</button>
			</div>
		{:else}
			<p class="text-sm">
				{!comment.isDeleted ? comment.content : '[This comment has been deleted]'}
			</p>
		{/if}
		<button
			class="text-xs text-primary disabled:text-gray-500"
			disabled={comment.isDeleted}
			on:click={() => (showReply = !showReply)}>Reply</button
		>
	</li>
	{#if user && showReply}
		<div class="flex items-center text-sm">
			<input
				bind:value={replyText}
				type="text"
				name="comment"
				placeholder="Reply..."
				class="flex-grow border rounded-lg py-1 px-4 mr-4"
			/>
			<button on:click={addReply} class="text-primary text-xl">
				<MingcuteSendLine />
			</button>
		</div>
	{:else if !user}
		<div class="flex w-full justify-center">
			<a class="shadow-lg px-4 py-1 rounded-xl bg-primary text-secondary-content" href="/login"
				>Login</a
			>
		</div>
	{/if}

	{#if replies && replies.length > 0}
		<div class="flex flex-col pl-6 pt-2 gap-2 border-l">
			{#each replies as c}
				<svelte:self comment={c} {jwt} user={c.user} />
			{/each}
		</div>
	{/if}
</div>
