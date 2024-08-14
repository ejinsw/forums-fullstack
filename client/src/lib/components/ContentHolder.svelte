<script lang="ts">
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';
	import PostCard from './PostCard.svelte';
	import { DateTime } from 'luxon';

	enum SortBy {
		Date,
		Hot
	}

	export let title: string = [];
	export let items: Post[] = [];
	export let link: string;
	export let sortBy: SortBy = SortBy.Date;

	let sortedItems = items;

	function sortItems(items: Post[], sortBy: SortBy) {
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

<div class="border flex flex-col bg-base-100">
	<a class="m-4 text-2xl" href={link}>{title}</a>
	<ul>
		{#each sortedItems as post}
			<li>
				<PostCard {post} />
			</li>
		{/each}
	</ul>
</div>
