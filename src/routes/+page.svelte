<script lang="ts">
	let { data } = $props();

	const getActor = (character: string) => {
		return Object.entries(data.distribution)
			.values()
			.find(([actor, characters]) => characters.includes(character))?.[0];
	};
</script>

<div class="p-4 font-serif">
	{#each data.dialogs as scene}
		<h2 class="py-8 text-xl font-bold text-blue-900">{scene.title}</h2>
		<div class="flex flex-col gap-4">
			{#each scene.dialogs as dialog}
				{#if dialog.type === 'didascalie'}
					<p><em class="text-sm whitespace-pre-line text-red-900">{dialog.text}</em></p>
				{:else}
					<p>
						<strong>{dialog.character} ({getActor(dialog.character)}) : </strong>
						{dialog.text}
					</p>
				{/if}
			{/each}
		</div>
	{/each}
</div>
