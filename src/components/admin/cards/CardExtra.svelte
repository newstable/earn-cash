<script>
	import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap';
	const src = '/img/svg/more-horizontal.svg';
</script>

<div class="card-extra">
	<Dropdown nav>
		<DropdownToggle nav>
			<img class="svg" alt="" {src} />
		</DropdownToggle>
		<DropdownMenu end>
			<DropdownItem href={'#'}>Action</DropdownItem>
			<DropdownItem href={'#'}>Another action</DropdownItem>
			<DropdownItem href={'#'}>Something else here</DropdownItem>
		</DropdownMenu>
	</Dropdown>
</div>

<style lang="scss">
	.card-extra {
		:global {
			.nav-link {
				padding: 0;
				svg {
					outline: 0;
				}
			}
		}
	}
</style>
