<script>
	import TaskApp from '$lib/components/tasklist/TaskApp.svelte';
	let taskTab = 'all';
	let actionBtn = true;
</script>

<TaskApp header="" description={false} taskStatus={taskTab} taskLimit="8" {actionBtn} />
