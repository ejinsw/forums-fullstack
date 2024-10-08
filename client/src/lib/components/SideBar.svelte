<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import clsx from 'clsx';

	import MageDashboard2 from '~icons/mage/dashboard-2';
	import MaterialSymbolsArrowBackIosNew from '~icons/material-symbols/arrow-back-ios-new';
	import LetsIconsColorModeLight from '~icons/lets-icons/color-mode-light';
	import MaterialSymbolsHomeRounded from '~icons/material-symbols/home-rounded';
	import MaterialSymbolsPersonRounded from '~icons/material-symbols/person-rounded';
	import MaterialSymbolsSettingsRounded from '~icons/material-symbols/settings-rounded';
	import MaterialSymbolsLogoutRounded from '~icons/material-symbols/logout-rounded';
	import MaterialSymbolsLoginRounded from '~icons/material-symbols/login-rounded';
	import MaterialSymbolsAddBoxOutline from '~icons/material-symbols/add-box-outline';
	import MaterialSymbolsArrowForwardIosRounded from '~icons/material-symbols/arrow-forward-ios-rounded';

	import type { User } from '$lib/types';

	export let user: User | null = null;

	let open: boolean = false;
	let navElement: HTMLElement;

	const routes = [
		{
			title: 'Home',
			route: '/',
			icon: MaterialSymbolsHomeRounded
		},
		{
			title: 'Profile',
			route: '/profile',
			icon: MaterialSymbolsPersonRounded
		},
		{
			title: 'Create',
			route: '/posts/create',
			icon: MaterialSymbolsAddBoxOutline
		}
	];

	const accountRoutes = [
		{
			title: 'Settings',
			route: '/settings',
			icon: MaterialSymbolsSettingsRounded
		},
		{
			title: user ? 'Log out' : 'Log in',
			route: user ? '/logout' : '/login',
			icon: user ? MaterialSymbolsLogoutRounded : MaterialSymbolsLoginRounded
		}
	];

	onMount(() => {
		if (typeof window !== 'undefined') {
			themeChange(false);
		}
	});

	function toggleCollapse() {
		open = !open;
	}
</script>

<nav
	bind:this={navElement}
	class={clsx(
		'hidden md:flex flex-col py-4 px-4 border border-l-0 bg-base-100 min-h-screen rounded-r-xl transition-width duration-300 ease-in-out overflow-hidden text-lg',
		open ? 'w-fit' : 'w-22',
		$$props.class
	)}
	style="transition: width 0.3s;"
>
	<div class="flex justify-between items-center">
		<button
			class="flex items-center justify-center space-x-3 py-2 px-4 rounded-md"
			on:click={toggleCollapse}
		>
			<MageDashboard2 />
		</button>
		{#if open}
			<button class="text-xs min-w-fit" on:click={toggleCollapse}>
				<MaterialSymbolsArrowBackIosNew />
			</button>
		{/if}
	</div>

	<hr class="my-4 bg-slate-400" />

	<div class="flex-1">
		{#if open}
			<p class="text-sm mb-2 font-semibold">OVERVIEW</p>
		{/if}
		{#each routes as { title, route, icon }}
			<a
				class="flex items-center space-x-3 py-2 px-4 mb-2 rounded-md hover:bg-base-200 transition-colors"
				href={route}
			>
				<svelte:component this={icon} class="text-lg min-w-fit" />
				{#if open}
					<span class="whitespace-nowrap text-sm">{title}</span>
				{/if}
			</a>
		{/each}

		<hr class="my-4 bg-slate-400" />

		{#if open}
			<p class="text-sm mb-2 font-semibold">Account</p>
		{/if}
		{#each accountRoutes as { title, route, icon }}
			<a
				class="flex items-center space-x-3 py-2 px-4 mb-2 rounded-md hover:bg-base-200 transition-colors"
				href={route}
			>
				<svelte:component this={icon} class="text-lg min-w-fit" />
				{#if open}
					<span class="whitespace-nowrap text-sm">{title}</span>
				{/if}
			</a>
		{/each}
	</div>

	<!-- Theme toggler -->
	<div class="mt-auto flex items-center justify-between">
		{#if open}
			<span>Theme</span>
		{/if}
		<button
			data-toggle-theme="dark,light"
			data-act-class="ACTIVECLASS"
			class="shadow-md p-2 bg-primary text-secondary-content rounded-full"
		>
			<LetsIconsColorModeLight class="text-lg" />
		</button>
	</div>
</nav>

<button
	class="absolute md:hidden block top-12 bg-white px-6 py-3 rounded-full border -left-4 text-xs min-w-fit"
	on:click={toggleCollapse}
>
	<MaterialSymbolsArrowForwardIosRounded />
</button>

<div
	class={clsx(
		'absolute top-0 left-0 md:hidden block w-screen h-screen bg-black/50 transition-all duration-300 ease-in-out',
		open ? 'translate-x-0' : '-translate-x-full'
	)}
>
	<nav
		bind:this={navElement}
		class={clsx(
			'absolute flex flex-col w-screen py-4 px-4 border border-l-0 bg-base-100 min-h-screen transition-transform duration-300 ease-in-out overflow-hidden text-lg',
			open ? 'translate-x-0' : '-translate-x-full',
			$$props.class
		)}
	>
		<div class="flex justify-between items-center">
			<button
				class="flex items-center justify-center space-x-3 py-2 px-4 rounded-md"
				on:click={toggleCollapse}
			>
				<MageDashboard2 />
			</button>
			<button class="text-xs min-w-fit" on:click={toggleCollapse}>
				<MaterialSymbolsArrowBackIosNew />
			</button>
		</div>

		<hr class="my-4 bg-slate-400" />

		<div class="flex-1">
			<p class="text-sm mb-2 font-semibold">OVERVIEW</p>
			{#each routes as { title, route, icon }}
				<a
					class="flex items-center space-x-3 py-2 px-4 mb-2 rounded-md hover:bg-base-200 transition-colors"
					href={route}
				>
					<svelte:component this={icon} class="text-lg min-w-fit" />
					{#if open}
						<span class="whitespace-nowrap text-sm">{title}</span>
					{/if}
				</a>
			{/each}

			<hr class="my-4 bg-slate-400" />

			<p class="text-sm mb-2 font-semibold">Account</p>
			{#each accountRoutes as { title, route, icon }}
				<a
					class="flex items-center space-x-3 py-2 px-4 mb-2 rounded-md hover:bg-base-200 transition-colors"
					href={route}
				>
					<svelte:component this={icon} class="text-lg min-w-fit" />
					{#if open}
						<span class="whitespace-nowrap text-sm">{title}</span>
					{/if}
				</a>
			{/each}
		</div>

		<!-- Theme toggler -->
		<div class="mt-auto flex items-center justify-between">
			<span>Theme</span>
			<button
				data-toggle-theme="dark,light"
				data-act-class="ACTIVECLASS"
				class="shadow-md p-2 bg-primary text-secondary-content rounded-full"
			>
				<LetsIconsColorModeLight class="text-lg" />
			</button>
		</div>
	</nav>
</div>
