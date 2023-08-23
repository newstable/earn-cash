<script>
	import { Row, Col } from 'sveltestrap';
	import PostForm from '@apps/social/contents/PostForm.svelte';
	import Posts from '@apps/social/contents/Posts.svelte';
	import Friends from '@apps/social/widgets/Friends.svelte';
	import Photos from '@apps/social/widgets/Photos.svelte';
	import Videos from '@apps/social/widgets/Videos.svelte';
</script>

<Row>
	<Col xxl={8}>
		<PostForm />
		<Posts />
	</Col>
	<Col xxl={4}>
		<Friends />
		<Photos />
		<Videos />
	</Col>
</Row>
