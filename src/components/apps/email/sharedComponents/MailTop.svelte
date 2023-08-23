<script>
	import {
		InputGroup,
		Input,
		Tooltip,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle
	} from 'sveltestrap';

	const searchIcon = '/img/svg/search.svg';
	const archiveIcon = '/img/svg/archive.svg';
	const alertIcon = '/img/svg/alert-octagon.svg';
	const trashIcon = '/img/svg/trash-2.svg';
	const bookOpenIcon = '/img/svg/book-open.svg';
	const folderIcon = '/img/svg/folder.svg';
	const sliderIcon = '/img/svg/sliders.svg';
</script>

<div class="mailbox-top d-flex justify-content-between align-items-center">
	<div class="mailbox-top__left">
		<ul class="mailbox-top__actions d-flex align-items-center">
			<li class="mail-selection checkbox-theme-default custom-checkbox">
				<input type="checkbox" class="checkbox" id="mail-select" />
				<label for="mail-select">
					<i class="uil uil-angle-down" />
				</label>
				<ul class="mail-selection__dropdown">
					<li><a href="/">All</a></li>
					<li><a href="/">Read</a></li>
					<li><a href="/">Unread</a></li>
					<li><a href="/">Stared</a></li>
					<li><a href="/">Unstared</a></li>
				</ul>
			</li>
			<li>
				<a class="icon-action active" id="wpwax-vm-mail-refresh" href="/">
					<i class="las la-redo-alt" />
				</a>
				<Tooltip placement="bottom" target="wpwax-vm-mail-refresh">Refresh</Tooltip>
			</li>
			<li>
				<a class="icon-action" id="wpwax-vm-mail-archive" href="/">
					<img class="svg" alt="" src={archiveIcon} />
				</a>
				<Tooltip placement="bottom" target="wpwax-vm-mail-archive">Archive</Tooltip>
			</li>
			<li>
				<a class="icon-action" id="wpwax-vm-mail-info" href="/">
					<img class="svg" alt="" src={alertIcon} />
				</a>
				<Tooltip placement="bottom" target="wpwax-vm-mail-info">Info</Tooltip>
			</li>
			<li>
				<a class="icon-action" id="wpwax-vm-mail-delete" href="/">
					<img class="svg" alt="" src={trashIcon} />
				</a>
				<Tooltip placement="bottom" target="wpwax-vm-mail-delete">Delete</Tooltip>
			</li>
			<li>
				<a class="icon-action" id="wpwax-vm-mail-read" href="/">
					<img class="svg" alt="" src={bookOpenIcon} />
				</a>
				<Tooltip placement="bottom" target="wpwax-vm-mail-read">Read</Tooltip>
			</li>
			<li>
				<a class="icon-action" id="wpwax-vm-mail-folder" href="/">
					<img class="svg" alt="" src={folderIcon} />
				</a>
				<Tooltip placement="bottom" target="wpwax-vm-mail-folder">Folder</Tooltip>
			</li>
		</ul>
	</div>
	<div class="mailbox-top__right d-flex align-items-center">
		<div class="mailbox-top__search">
			<div class="input-container icon-left position-relative">
				<span class="input-icon icon-left">
					<img class="svg" alt="" src={searchIcon} />
				</span>
				<InputGroup size="lg">
					<Input placeholder="Search Mail" />
				</InputGroup>
			</div>
		</div>
		<div class="mailbox-top__extra d-flex align-items-center">
			<span class="result-perpage">1 - 50 of 235</span>
			<div class="mail-sliding-control">
				<a href="/" class="icon-action"><i class="la la-angle-left" /></a>
				<a href="/" class="icon-action active"><i class="la la-angle-right" /></a>
			</div>
			<a href="/" class="icon-action mail-sliding-control-slider"
				><img class="svg" alt="" src={sliderIcon} /></a
			>
			<Dropdown>
				<DropdownToggle><i class="uil uil-ellipsis-v m-0" /></DropdownToggle>
				<DropdownMenu>
					<DropdownItem href="/">More One</DropdownItem>
					<DropdownItem href="/">More Two</DropdownItem>
					<DropdownItem href="/">More Three</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	</div>
</div>
