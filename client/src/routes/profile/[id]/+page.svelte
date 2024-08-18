<script lang="ts">
	import type { Post, User } from '$lib/types.js';
	import MaterialSymbolsArrowBackIosNew from '~icons/material-symbols/arrow-back-ios-new';

	import { goto } from '$app/navigation';
	import ContentHolder from '$lib/components/ContentHolder.svelte';
	import CommentsHolder from '$lib/components/CommentsHolder.svelte';

	interface Data {
		jwt: string;
		previous_route: string;
		user: User;
		profile: User;
	}

	enum Tab {
		posts,
		comments
	}

	export let data: Data;

	let selected: Tab = Tab.posts;

	$: user = data.user;

	$: jwt = data.jwt;

	$: profile = data.profile;
</script>

<div class="prose bg-base-100 min-h-screen m-4 border">
	<a class="flex min-w-fit min-h-fit m-8" href={data.previous_route}
		><MaterialSymbolsArrowBackIosNew /></a
	>
	<div class="flex flex-col mx-12 mb-12">
		<h1 class="text-3xl">{profile.name}</h1>
		<h1 class="text-xl">@{profile.username}</h1>
	</div>

	<div role="tablist" class="tabs tabs-lifted">
		<button
			role="tab"
			class="tab {selected === Tab.posts && 'tab-active'}"
			on:click={() => (selected = Tab.posts)}>Posts</button
		>
		<button
			role="tab"
			class="tab {selected === Tab.comments && 'tab-active'}"
			on:click={() => (selected = Tab.comments)}>Comments</button
		>
	</div>

	<div class="flex flex-col mx-12 my-12">
		{#if selected === Tab.posts}
			<ContentHolder items={profile.posts} {user} {jwt} />
		{:else}
			<CommentsHolder items={profile.comments} {user} {jwt} />
		{/if}
	</div>
</div>
