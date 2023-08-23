<script>
	import { Button, Modal, ModalBody, ModalFooter } from 'sveltestrap';

	let open = false;
	const toggle = () => (open = !open);

	export let addNote;
</script>

<div class="px-3">
	<Button on:click={toggle} color="primary" size="default" class="btn-rounded btn-block">
		<img class="svg" alt="" src={'/img/svg/plus.svg'} />
		Add Note
	</Button>
</div>
<Modal isOpen={open} {toggle} class="noteModal">
	<ModalBody class="pb-0">
		<Button color="transparent" class="close" on:click={toggle}>
			<span aria-hidden="true">&times;</span>
		</Button>
		<form action="/">
			<div class="form-group mb-25">
				<label class="mb-2" for="text">Title</label>
				<input type="text" class="form-control" placeholder="Note Title" id="text" />
			</div>
			<div class="form-group mb-25">
				<label class="mb-2" for="textarea">Description</label>
				<textarea id="textarea" class="form-control" placeholder="Note Description" />
			</div>
			<div class="form-group">
				<label class="mb-2" for="select-search">Note Label</label>
				<select class="form-control" id="noteType">
					<option>Social</option>
					<option>Work</option>
					<option>Personal</option>
					<option>Important</option>
				</select>
			</div>
		</form>
	</ModalBody>
	<ModalFooter
		class="note-submit-btn d-flex justify-content-start border-top-0 m-n1 px-30 pt-25 pb-25"
	>
		<Button color="primary" size="sm" on:click={addNote}>Add New Note</Button>
	</ModalFooter>
</Modal>
