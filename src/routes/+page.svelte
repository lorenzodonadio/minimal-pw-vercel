<script lang="ts">
	import { page } from '$app/stores';

	import Counter from '$lib/Counter.svelte';

	const BASE_URL = $page.url.origin;
	const PATHNAME = $page.url.pathname;

	let disabled = false;
	let pdf: any;
	let pdfDownloadAnchor: HTMLAnchorElement;
	$: if (pdfDownloadAnchor) {
		pdfDownloadAnchor.click();
	}
	const handleClick = async () => {
		disabled = true;

		const res: Response = await fetch(BASE_URL + '/api/pdf', {
			method: 'POST',
			body: JSON.stringify({
				BASE_URL,
				PATHNAME
			})
		});

		if (res.ok) {
			pdf = await res.arrayBuffer();
		}
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if pdf}
	<a
		style="display:none;"
		bind:this={pdfDownloadAnchor}
		download="pageprint.pdf"
		href={URL.createObjectURL(
			new Blob([pdf], {
				type: 'application/pdf'
			})
		)}>Download PDF</a
	>
{/if}
<section>
	<span class="welcome">
		<picture>
			<source srcset="svelte-welcome.webp" type="image/webp" />
			<img src="svelte-welcome.png" alt="Welcome" />
		</picture>
	</span>

	<button {disabled} on:click={handleClick}>
		<h1>CLICK ME TO TEST PLAYWIGHT AND DOWNLOAD A PDF OF THIS PAGE</h1>
	</button>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
