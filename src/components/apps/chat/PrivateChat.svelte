<script>
	import { chatContent } from '@store/chatStore';
	import UserList from './components/UserList.svelte';
	const privateChats = $chatContent[0].privateChat;
	let allUsers = privateChats;
</script>

<UserList {allUsers} />
