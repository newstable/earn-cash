<script>
	/* Active Side Menu */
	function handleMenuType(e) {
		e.preventDefault();
		document.body.classList.add('side-menu');
		document.body.classList.remove('top-menu');
	}
	function handleLayoutDirecction(e, direction) {
		e.preventDefault();

		document.documentElement.setAttribute('dir', direction);
		if (direction === 'rtl') {
			document.getElementById('bootstrap-css-link').href = '../css/bootstrap.rtl.min.css';
		} else {
			document.getElementById('bootstrap-css-link').href = '../css/bootstrap.min.css';
		}
	}
</script>

<div class="top-menu">
	<div class="ninjadash-top-menu position-relative">
		<ul>
			<li class="has-subMenu">
				<a href={'#'} class="active">Dashboard</a>
				<ul class="subMenu">
					<li class="active">
						<a href="/home-one">Demo 1</a>
					</li>
					<li>
						<a href="/home-two">Demo 2</a>
					</li>
					<li>
						<a href="/home-three">Demo 3</a>
					</li>
					<li>
						<a href="/home-four">Demo 4</a>
					</li>
					<li>
						<a href="/home-five"> Demo 5</a>
					</li>
				</ul>
			</li>
			<li class="has-subMenu">
				<a href={'#'}>Layouts</a>
				<ul class="subMenu">
					<li class="l_navbar">
						<a href={'#'} data-layout="side" on:click={(e) => handleMenuType(e)}>Side Menu</a>
					</li>
					<!-- <li class="layout">
						<a href={'#'} class="direction-js" on:click={(e) => handleLayoutDirecction(e, 'rtl')}
							>RTL</a
						>
					</li>
					<li class="layout">
						<a href={'#'} class="direction-js" on:click={(e) => handleLayoutDirecction(e, 'rtl')}
							>LTR</a
						>
					</li> -->
				</ul>
			</li>
			<li class="has-subMenu">
				<a href={'#'}>Apps</a>
				<ul class="megaMenu-wrapper megaMenu-dropdown">
					<li>
						<ul>
							<li class="has-subMenu-left">
								<a href={'#'}>
									<span class="nav-icon uil uil-envelope" />
									<span class="menu-text">Email</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/email/inbox">Inbox</a>
									</li>
									<li>
										<a href="/email/single">Read Email</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="/chat">
									<span class="nav-icon uil uil-chat" />
									<span class="menu-text">Chat</span>
									<span class="badge badge-success menuItem rounded-circle">3</span>
								</a>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'} class="">
									<span class="nav-icon uil uil-bag" />
									<span class="menu-text text-initial">eCommerce</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/ecommerce/product-grid">Products</a>
									</li>
									<li>
										<a href="/ecommerce/productDetails">Product Details</a>
									</li>
									<li>
										<a href="/ecommerce/product-add">Product Add</a>
									</li>
									<li>
										<a href="/ecommerce/cart">Cart</a>
									</li>
									<li>
										<a href="/ecommerce/orders">Orders</a>
									</li>
									<li>
										<a href="/ecommerce/sellers">Sellers</a>
									</li>
									<li>
										<a href="/ecommerce/invoice">Invoices</a>
									</li>
								</ul>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'} class="">
									<span class="nav-icon uil uil-folder" />
									<span class="menu-text">Project</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/projects/all-projects">Project</a>
									</li>
									<li>
										<a href="/projects/project-single">Project Details</a>
									</li>
								</ul>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'}>
									<span class="nav-icon uil uil-clipboard-alt" />
									<span class="menu-text">Note</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/note/all">All</a>
									</li>
									<li>
										<a href="/note/favorite">Favorite</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li>
						<ul>
							<li>
								<a href="/todo">
									<span class="nav-icon uil uil-check-square" />
									<span class="menu-text">Todo</span>
								</a>
							</li>
							<li>
								<a href="/task">
									<span class="nav-icon uil uil-lightbulb-alt" />
									<span class="menu-text">Task App</span>
								</a>
							</li>
							<li>
								<a href="/import">
									<span class="nav-icon uil uil-lightbulb-alt" />
									<span class="menu-text">Import</span>
								</a>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'} class="">
									<span class="nav-icon uil uil-users-alt" />
									<span class="menu-text">Users</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/users/team">Team</a>
									</li>
									<li>
										<a href="/users/grid">Users Grid</a>
									</li>
									<li>
										<a href="/users/list">Users List</a>
									</li>
									<li>
										<a href="/users/grid-two">Users Grid style</a>
									</li>
									<li>
										<a href="/users/group">Users Group</a>
									</li>
									<li>
										<a href="/users/add-user">Add User</a>
									</li>
									<li>
										<a href="/users/table">Users Table</a>
									</li>
								</ul>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'} class="">
									<span class="nav-icon uil uil-at" />
									<span class="menu-text">Contact</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/contacts/grid">Contact 1</a>
									</li>
									<li>
										<a href="/contacts/list">Contact 2</a>
									</li>
								</ul>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'}>
									<span class="nav-icon uil uil-apps" />
									<span class="menu-text">Social app</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/social/profile">My Profile</a>
									</li>
									<li>
										<a href="/social/settings">Profile Settings</a>
									</li>
								</ul>
							</li>
							<li class="has-subMenu-left">
								<a href={'#'} class="">
									<span class="nav-icon uil uil-user" />
									<span class="menu-text">Support</span>
								</a>
								<ul class="subMenu">
									<li>
										<a href="/support/tickets">Support Ticket</a>
									</li>
									<li>
										<a href="/support/details">Ticket Details</a>
									</li>
									<li>
										<a href="/support/create-ticket">New Ticket</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>

			<li class="has-subMenu">
				<a href={'#'}>Features</a>
				<ul class="subMenu">
					<li class="has-subMenu-left">
						<a href={'#'}>
							<img class="svg" alt="" src={'/img/svg/bar-chart-2.svg'} />
							<span class="menu-text">Charts</span>
						</a>
						<ul class="subMenu">
							<li>
								<a href="/features/charts/chartjs">Chart JS</a>
							</li>
							<li>
								<a href="/features/charts/apex-charts">Apex Charts</a>
							</li>
						</ul>
					</li>
					<li class="has-subMenu-left">
						<a href={'#'} class="">
							<span class="nav-icon uil uil-keyhole-circle" />
							<span class="menu-text">Froms</span>
						</a>
						<ul class="subMenu">
							<li>
								<a href="/features/forms/basic">Basics</a>
							</li>
							<li>
								<a href="/features/forms/layout">Layouts</a>
							</li>
							<li>
								<a href="/features/forms/elements">Elements</a>
							</li>
							<li>
								<a href="/features/forms/components">Components</a>
							</li>
							<li>
								<a href="/features/forms/validations">Validations</a>
							</li>
						</ul>
					</li>
					<li class="has-subMenu-left">
						<a href={'#'}>
							<img class="svg" alt="" src={'/img/svg/server.svg'} />
							<span class="menu-text">Widget</span>
						</a>
						<ul class="subMenu">
							<li>
								<a href="/features/widgets/charts">Chart</a>
							</li>
							<li>
								<a href="/features/widgets/mixed">Mixed</a>
							</li>
							<li>
								<a href="/features/widgets/cards">Card</a>
							</li>
						</ul>
					</li>
					<li class="has-subMenu-left">
						<a href={'#'} class="">
							<span class="nav-icon uil uil-square" />
							<span class="menu-text">Wizards</span>
						</a>
						<ul class="subMenu">
							<li>
								<a href="/features/wizard">Wizard 1</a>
							</li>
						</ul>
					</li>
					<li class="has-subMenu-left">
						<a href={'#'}>
							<img class="svg" alt="" src={'/img/svg/grid.svg'} />
							<span class="menu-text">Icons</span>
						</a>
						<ul class="subMenu">
							<li>
								<a href="/features/icons/unicons">Unicon Icons</a>
							</li>
							<li>
								<a href="/features/icons/lineawesome">Line Awesome</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="/features/editor">
							<img class="svg" alt="" src={'/img/svg/edit.svg'} />
							<span class="menu-text">Editors</span>
						</a>
					</li>
					<li class="has-subMenu-left">
						<a href={'#'}>
							<img class="svg" alt="" src={'/img/svg/map.svg'} />
							<span class="menu-text">Maps</span>
						</a>
						<ul class="subMenu">
							<li>
								<a href="/features/maps/google-maps">Google Maps</a>
							</li>
							<li>
								<a href="/features/maps/leaflet-maps">Leaflet Maps</a>
							</li>
							<li>
								<a href="/features/maps/vector-maps">Vector Maps</a>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="mega-item has-subMenu">
				<a href={'#'}>Pages</a>
				<ul class="megaMenu-wrapper megaMenu-small">
					<li>
						<ul>
							<li>
								<a href="/pages/changelog">
									<span class="menu-text">Changelog</span>
									<span class="badge badge-info-10 menuItem rounded-pill">1.1.1</span>
								</a>
							</li>
							<li>
								<a href="/pages/gallery">
									<span class="menu-text">Gallery</span>
								</a>
							</li>
							<li>
								<a href="/pages/pricing">
									<span class="menu-text">Pricing</span>
								</a>
							</li>
							<li>
								<a href="/pages/banner">
									<span class="menu-text">Banners</span>
								</a>
							</li>
							<li>
								<a href="/pages/testimonial">
									<span class="menu-text">Testimonial</span>
								</a>
							</li>
							<li>
								<a href="/pages/faqs">
									<span class="menu-text">FAQ's</span>
								</a>
							</li>

							<li>
								<a href="/pages/search-result">
									<span class="menu-text">Search Results</span>
								</a>
							</li>
							<li>
								<a href="/pages/blank">
									<span class="menu-text">Blank Page</span>
								</a>
							</li>
						</ul>
					</li>
					<li>
						<ul>
							<li>
								<a href="/pages/support">
									<span class="menu-text">Support Center</span>
								</a>
							</li>
							<li>
								<a href="/pages/blog/style-one">Blog Style 1</a>
							</li>
							<li>
								<a href="/pages/blog/style-two">Blog Style 2</a>
							</li>
							<li>
								<a href="/pages/blog/style-three">Blog Style 3</a>
							</li>
							<li>
								<a href="/pages/blog/details">Blog Details</a>
							</li>
							<li>
								<a href="/pages/terms">
									<span class="menu-text">Terms & Conditions</span>
								</a>
							</li>
							<li>
								<a href="/pages/maintenance">
									<span class="menu-text">Maintenance</span>
								</a>
							</li>
							<li>
								<a href="/pages/404">
									<span class="menu-text">404</span>
								</a>
							</li>
							<li>
								<a href="/pages/coming-soon">
									<span class="menu-text">Coming Soon</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="mega-item has-subMenu">
				<a href={'#'}>Components</a>
				<ul class="megaMenu-wrapper megaMenu-wide">
					<li>
						<span class="mega-title">Components</span>
						<ul>
							<li>
								<a href="/components/alerts">Alert</a>
							</li>
							<li>
								<a href="/components/avatars">Avatar</a>
							</li>
							<li>
								<a href="/components/badges">Badge</a>
							</li>
							<li>
								<a href="/components/breadcrumbs">Breadcrumb</a>
							</li>
							<li>
								<a href="/components/buttons">Button</a>
							</li>
							<li>
								<a href="/components/cards">Cards</a>
							</li>
							<li>
								<a href="/components/carousels">Carousel</a>
							</li>
							<li>
								<a href="/components/checkbox">Checkbox</a>
							</li>
							<li>
								<a href="/components/collapse">Collapse</a>
							</li>
							<li>
								<a href="/components/comments">Comments</a>
							</li>
						</ul>
					</li>
					<li>
						<span class="mega-title">Components</span>
						<ul>
							<li>
								<a href="/components/datepicker">DatePicker</a>
							</li>
							<li>
								<a href="/components/drawer">Drawer</a>
							</li>
							<li>
								<a href="/components/draggable-list">Draggable List</a>
							</li>
							<li>
								<a href="/components/dropdown">Dropdown</a>
							</li>
							<li>
								<a href="/components/empty">Empty</a>
							</li>
							<li>
								<a href="/components/input">Input</a>
							</li>
							<li>
								<a href="/components/list">List</a>
							</li>
							<li>
								<a href="/components/menu">Menu</a>
							</li>
							<li>
								<a href="/components/message">Message</a>
							</li>
						</ul>
					</li>
					<li>
						<span class="mega-title">Components</span>
						<ul>
							<li>
								<a href="/components/modals">Modals</a>
							</li>
							<li>
								<a href="/components/notifications">Notification</a>
							</li>
							<li>
								<a href="/components/page-headers">Page Headers</a>
							</li>
							<li>
								<a href="/components/paginations">Paginations</a>
							</li>
							<li>
								<a href="/components/progress">Progress</a>
							</li>
							<li>
								<a href="/components/radio">Radio</a>
							</li>
							<li>
								<a href="/components/rate">Rate</a>
							</li>
							<li>
								<a href="/components/result">Result</a>
							</li>
							<li>
								<a href="/components/select">Select</a>
							</li>
							<li>
								<a href="/components/skeleton">Skeleton</a>
							</li>
							<li>
								<a href="/components/timepicker">Timepicker</a>
							</li>
						</ul>
					</li>
					<li>
						<span class="mega-title">Components</span>
						<ul>
							<li>
								<a href="/components/slider">Slider</a>
							</li>
							<li>
								<a href="/components/spinner">Spinner</a>
							</li>
							<li>
								<a href="/components/statistic">Statistic</a>
							</li>
							<li>
								<a href="/components/steps">Steps</a>
							</li>
							<li>
								<a href="/components/switch">Switch</a>
							</li>
							<li>
								<a href="/components/tabs">Tabs</a>
							</li>
							<li>
								<a href="/components/tags">Tags</a>
							</li>
							<li>
								<a href="/components/timeline">Timeline</a>
							</li>
							<li>
								<a href="/components/typography">Typography</a>
							</li>
							<li>
								<a href="/components/upload">Upload</a>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</div>
