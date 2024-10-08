<script lang="ts">
	import type { Post, User } from '$lib/types';
	import { onMount } from 'svelte';
	import PostCard from './PostCard.svelte';
	import { DateTime } from 'luxon';

	enum SortBy {
		Date,
		Hot
	}

	export let title: string = '';
	export let items: Post[] = [];
	export let link: string = '/';
	export let sortBy: SortBy = SortBy.Date;
	export let user: User;
	export let jwt: string | undefined;
	
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

<div class="border flex flex-col bg-base-100 p-4">
	{#if title !== ''}
		<a class="mb-4 text-2xl" href={link}>{title}</a>
	{/if}
	<ul class="flex flex-col gap-2">
		{#each sortedItems as post}
			<li>
				<PostCard {post} {user} {jwt}/>
			</li>
		{/each}
	</ul>
</div>
