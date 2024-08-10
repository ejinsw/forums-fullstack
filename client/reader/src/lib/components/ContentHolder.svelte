<script lang="ts">
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';
	import PostCard from './PostCard.svelte';

	export let title: string = [];
	export let items: Post[] = [];
	export let link: string;
	export let sortBy: SortBy = SortBy.Date;

	enum SortBy {
		Date,
		Hot
	}

	onMount(() => {
		switch (sortBy) {
			case SortBy.Date:
				items.sort((a, b) => a.creationDate > b.creationDate);
				break;
			case SortBy.Hot:
				items.sort((a, b) => a.comments.length > b.comments.length);
				break;
		}
	});
</script>

<div class="border m-4 flex flex-col bg-base-100">
	<a class="m-4 text-2xl" href={link}>{title}</a>
	<ul>
		{#each items as post}
			<li>
				<PostCard {post} />
			</li>
		{/each}
	</ul>
</div>
