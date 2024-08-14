<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
    import MdiDotsVertical from '~icons/mdi/dots-vertical'

	export let items: {title: string; callback: () => void}[] = []; // Array of menu items

	let isOpen = false;
	let menuElement: HTMLElement;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function handleItemClick(index) {
		items[index].callback();
		isOpen = false; // Close the menu after item click
	}

	function handleClickOutside(event) {
		if (menuElement && !menuElement.contains(event.target)) {
			isOpen = false;
		}
	}

    onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClickOutside);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="relative inline-block" bind:this={menuElement}>
	<!-- Three Dots Button -->
	<button class="text-gray-500 hover:text-gray-700 p-2 focus:outline-none" on:click={toggleMenu}>
		<MdiDotsVertical/>
	</button>

	<!-- Menu -->
	{#if isOpen}
		<ul
			class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20"
		>
			{#each items as item, i}
				<li>
					<button
						class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
						on:click={() => handleItemClick(i)}
					> 
						{item.title}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
