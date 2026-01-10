<script lang="ts">
	let { data } = $props();

	let selectedActor = $state('Aucun');
	let mode = $state<'blur' | 'color'>('blur');
	const getActor = (character: string) => {
		return Object.entries(data.distribution)
			.values()
			.find(([actor, characters]) => characters.includes(character))?.[0];
	};
	const scenes = $derived.by(() => {
		const scenes: number[] = [];
		for (let i = 0; i < data.dialogs.length; i++) {
			if (
				data.dialogs[i].dialogs.find(
					(dialog) => dialog.type === 'dialog' && getActor(dialog.character) === selectedActor
				)
			) {
				scenes.push(i + 1);
			}
		}
		return scenes;
	});
</script>

<header>
	<label
		>Personnage :
		<select bind:value={selectedActor}>
			<option>Aucun</option>
			{#each Object.keys(data.distribution) as actor}
				<option>{actor}</option>
			{/each}
		</select>
	</label>
	<label
		>Mode : <select bind:value={mode}>
			<option value="blur">Flouter</option>
			<option value="color">Surligner</option>
		</select>
	</label>
	{#each scenes as scene}<a href="#{scene}" class="text-blue-900">#{scene}</a>{/each}
</header>

<div class="p-4 font-serif">
	{#each data.dialogs as scene, index}
		<a href="#{index + 1}"
			><h2 id={(index + 1).toString()} class="py-8 text-xl font-bold text-blue-900">
				{scene.title}
			</h2></a
		>
		<div class="flex flex-col gap-4">
			{#each scene.dialogs as dialog}
				{#if dialog.type === 'didascalie'}
					<p><em class="text-sm whitespace-pre-line text-red-900">{dialog.text}</em></p>
				{:else}
					{@const actor = getActor(dialog.character)}
					<p
						class:blur={mode === 'blur' && selectedActor === actor}
						class:color={mode === 'color' && selectedActor === actor}
					>
						<strong>{dialog.character} ({actor}) : </strong>
						{dialog.text}
					</p>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	header {
		position: fixed;
		display: flex;
		bottom: 0;
		width: 100%;
		gap: 1rem;
		background-color: var(--color-white);
		padding: 1rem;
		flex-wrap: wrap;
		align-items: center;
		select {
			padding: 0.5rem;
			font-size: 1rem;
			background-color: var(--color-slate-200);
		}
	}

	.blur {
		filter: blur(0.5rem);
	}
	.color {
		color: #212120;
		background-color: var(--color-yellow-200);
	}
	@media print {
		header {
			display: none;
		}
	}
</style>
