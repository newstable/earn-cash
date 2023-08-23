<script>
	import {} from 'sveltestrap';

	let files;
	$: if (files) {
		console.log(files);
		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}
	let avatarSrc;
	function avatarUpload() {
		let readURL = function (input) {
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
					avatarSrc = e.target.result;
					if (avatarSrc) {
						let img = document.querySelector('.avatrSrc');
						if (img) img.src = avatarSrc;
					}
				};

				reader.readAsDataURL(input.files[0]);
			}
		};
		document.querySelector('.upload-avatar-input').addEventListener('change', function () {
			readURL(this);
		});
	}
	function handleClick(event) {
		event.preventDefault();
		avatarUpload();
		document.querySelector('.upload-avatar-input').click();
	}
	function handleKeyDown(event) {
		if (event.keyCode === 32 || event.keyCode === 13) {
			handleClick(event);
		}
	}
	let deleteButton;

	function handleDelete() {
		deleteButton.parentNode.removeChild(deleteButton);
	}
</script>

<div class="dm-upload">
	<div class="dm-upload-avatar media-import" on:click={handleClick} on:keydown={handleKeyDown}>
		<img class="svg" alt="" src={'/img/svg/upload.svg'} />
		<p class="color-dark fs-20">Drop File or <a href="/">Browse</a></p>
	</div>
	<div class="avatar-up">
		<input bind:files id="many" multiple type="file" class="upload-avatar-input d-none" />
	</div>
	{#if files}
		{#each Array.from(files) as file}
			<div class="avatar-result" bind:this={deleteButton}>
				<div class="avatar-result__left">
					<img class="svg" alt="" src={'/img/svg/file.svg'} />
					<p>{file.name} ({file.size} bytes)</p>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					src={'/img/svg/trash-2.svg'}
					class="delete-button svg"
					alt=""
					on:click={handleDelete}
				/>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	:global {
		.media-import {
			margin: 10px auto 30px;
			position: relative;
			padding: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			min-height: 280px;
			border: 2px dashed #c6d0dc;
			background-color: var(--color-white);
			border-radius: 10px;

			svg {
				color: var(--body-color);
				width: 80px;
				height: auto;
			}

			p {
				line-height: 1.25;
				font-weight: 500;
				margin-top: 27px;
				margin-bottom: 0;
				font-size: 20px;

				a {
					color: var(--color-primary);
				}
			}
		}
		.avatar-result {
			border: 1px dashed #d9d9d9;
			border-radius: 4px;
			height: 66px;
			padding: 8px 20px;
			position: relative;
			font-size: 15px;
			margin-top: 8px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&__left {
				display: flex;
				align-items: center;
				gap: 15px;
				svg {
					color: var(--color-info);
				}
				p {
					margin-bottom: 0;
					font-size: 15px;
					font-weight: 400;
				}
			}
			.delete-button {
				cursor: pointer;
				color: var(--color-danger);
			}
		}
	}
</style>
