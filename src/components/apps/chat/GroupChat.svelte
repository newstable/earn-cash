<script>
	import { chatContent } from '@store/chatStore';
	import UserList from './components/UserList.svelte';
	const groupChats = $chatContent[0].groupChat;
	let allUsers = groupChats;
</script>

<UserList {allUsers} />
