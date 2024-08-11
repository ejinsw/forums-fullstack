<script lang="ts">
	import ContentHolder from '$lib/components/ContentHolder.svelte';

	export let data;
</script>

<ContentHolder items={data.posts} title="Recent Posts" link="/posts/recent" />
