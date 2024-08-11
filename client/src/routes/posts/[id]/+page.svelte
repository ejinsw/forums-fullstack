<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Comment, Post, User } from '$lib/types.js';
	import { DateTime } from 'luxon';
	import MaterialSymbolsArrowBackIosNew from '~icons/material-symbols/arrow-back-ios-new';
	import MingcuteSendLine from '~icons/mingcute/send-line';

	interface Data {
		post: Post;
		previous_route: string;
		user: User;
	}

	export let data: Data;

	$: post = data.post;

	$: comments = post.comments;

	let replyVisible: Record<string, boolean> = {};
	$: {
		initializeReplyVisible(comments);
	}

	function initializeReplyVisible(comments: Comment[]) {
		comments.forEach((comment) => {
			replyVisible[comment.id] = false;

			if (comment.replies) initializeReplyVisible(comment.replies);
		});
	}

	function toggleReplyVisible(id: number) {
		Object.keys(replyVisible).forEach((id) => {
            replyVisible[id] = false;
        });
		replyVisible[id] = !replyVisible[id];
	}

	function formatDate(date: string) {
		// Parse the input date string
		const parsedDate = DateTime.fromISO(date);

		// Calculate the difference between now and the input date
		const timeBetween = DateTime.now().diff(parsedDate);

		// Convert the difference to a human-readable format, like days, hours, etc.
		const timeDifference = timeBetween.toFormat("d 'days' h'h' m'm'");

		return timeDifference;
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
			<form use:enhance method="post" class="flex items-center text-sm">
				<input
					type="text"
					name="comment"
					placeholder="Add a comment..."
					class="flex-grow border border-gray-300 rounded-lg py-2 px-4 mr-4"
					required
				/>
				<button
					type="submit"
					class="bg-primary text-white rounded-lg py-2 px-6 hover:bg-primary-dark"
				>
					Submit
				</button>
			</form>
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
			<div class="flex flex-col">
				<li>
					<div class="flex items-center justify-between">
						<a class="text-sm hover:text-primary" href={`/profile/${comment.userId}`}
							>@{comment.user.username}</a
						>
						<small class="text-xs">{formatDate(comment.creationDate)}</small>
					</div>
					<p class="text-sm">{comment.content}</p>
					<button class="text-sm" on:click={() => toggleReplyVisible(comment.id)}>Reply</button>
				</li>
				{#if data.user && replyVisible[comment.id]}
					<form use:enhance method="post" class="flex items-center text-sm">
						<input
							type="text"
							name="comment"
							placeholder="Reply..."
							class="flex-grow border rounded-lg py-1 px-4 mr-4"
							required
						/>
						<button type="submit" class="text-primary text-xl">
							<MingcuteSendLine />
						</button>
					</form>
				{:else if replyVisible[comment.id]}
					<div class="flex w-full justify-center">
						<a
							class="shadow-lg px-4 py-1 rounded-xl bg-primary text-secondary-content"
							href="/login">Login</a
						>
					</div>
				{/if}
			</div>
		{/each}
	</ul>
</div>
