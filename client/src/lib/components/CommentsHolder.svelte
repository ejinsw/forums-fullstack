<script lang="ts">
	import type { Comment, User } from '$lib/types';
	import CommentCard from './CommentCard.svelte';
	import { DateTime } from 'luxon';

	enum SortBy {
		Date,
		Hot
	}

	export let items: Comment[] = [];
	export let sortBy: SortBy = SortBy.Date;
	export let user: User;
	export let jwt: string;

	let sortedItems = items;

	function sortItems(items: Comment[], sortBy: SortBy) {
		switch (sortBy) {
			case SortBy.Date:
				sortedItems = [...items].sort(
					(a, b) =>
						DateTime.fromISO(b.creationDate).toMillis() -
						DateTime.fromISO(a.creationDate).toMillis()
				);
				break;
			case SortBy.Hot:
				sortedItems = [...items].sort((a, b) => b.upvotes.length - a.upvotes.length);
				break;
		}
	}

	$: sortItems(items, sortBy);
</script>

<div class="border flex flex-col bg-base-100 p-4">
	<ul class="flex flex-col gap-2">
		{#each sortedItems as comment}
			{#if !comment.isDeleted}
				<li>
					<CommentCard {comment} {user} {jwt} />
				</li>
			{/if}
		{/each}
	</ul>
</div>
