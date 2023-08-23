<script>
	import EmailNav from './sidebarComponents/EmailNav.svelte';
	import EmailLabel from './sidebarComponents/EmailLabel.svelte';
	import AddLabel from './sidebarComponents/AddLabel.svelte';
	import { Card, CardBody, Button } from 'sveltestrap';
	import { mailBoxVisibility } from '../../../store/mailStore.js';

	export let navList;
	export let labelList;

    function handleComposerVisibility(){
        let visibility;
        const mailBoxVisibilitySubscribe = mailBoxVisibility.subscribe(value=> {
            visibility = value;
        });
        mailBoxVisibility.update(()=>{
            return !visibility;
        });
    }
</script>

<aside class="mailbox-sidebar-container">
	<div class="dm-mail-sidebar show mb-30">
		<Card>
			<a href="#" class="mailbar-cross d-md-none">
				<i class="uil uil-times" />
			</a>
			<CardBody>
				<div class="d-flex align-content-center content-center px-15">
					<Button
						class="btn-compose btn-shadow-primary"
						color={'primary'}
						block
						on:click={handleComposerVisibility}
					>
						<i class="uil uil-plus" /> Compose
					</Button>
				</div>
				<div class="mail-sidebar-bottom">
					<EmailNav {navList} />
				</div>
				<span class="dm-mail-label mt-35">Label</span>
				<EmailLabel {labelList} />
				<AddLabel />
			</CardBody>
		</Card>
	</div>
</aside>
