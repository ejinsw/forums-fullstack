<script lang="ts">
	import type { Post } from '$lib/types';
	import { DateTime } from 'luxon';

	export let post: Post;
	const date = DateTime.fromISO(post.creationDate).toLocaleString(DateTime.DATETIME_MED);
	const description = post.content.substring(0, 100);
</script>

{#if post.published}
	<a class="flex flex-col p-8 border-y hover:bg-base-300" href={`/posts/${post.id}`}>
		<a class="text-sm mb-2 hover:text-primary" href={`/profile/${post.userId}`}>@{post.user.username}</a>
		<h1 class="text-lg fontbo">{post.title}</h1>
		<p class="text-sm">{description}...</p>
		<p class="text-xs mt-2">{date}</p>
	</a>
{/if}
