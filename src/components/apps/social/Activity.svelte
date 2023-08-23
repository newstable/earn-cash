<script>
	import { Row, Col } from 'sveltestrap';
	import Activities from '@apps/social/contents/Activities.svelte';
	import Friends from '@apps/social/widgets/Friends.svelte';
	import Photos from '@apps/social/widgets/Photos.svelte';
	import Videos from '@apps/social/widgets/Videos.svelte';
</script>

<Row>
	<Col xl={8}>
		<Activities />
	</Col>
	<Col xl={4}>
		<Friends />
		<Photos />
		<Videos />
	</Col>
</Row>
