<script>
  import { onMount } from "svelte";
  import { Svroller } from "svrollbar";
  import { page } from "$app/stores";

  let urlPath;
  $: urlPath = $page.url.pathname;

  let isSidebarCollapsed = false; // Reactive variable to track sidebar state

  // Function to toggle sidebar
  function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  onMount(() => {
    /* Navbar list dropdown */
    const sidebarNav = document.querySelector(".sidebar_nav");
    const sidebarNavChild = sidebarNav.querySelectorAll(".has-child");
    const mainSidebar = document.querySelector(".sidebar");
    const menuItem = document.querySelectorAll(".menu-item a");

    menuItem.forEach((item) => {
      const itemPath = item.getAttribute("href");
      if (itemPath === urlPath) {
        let currentActiveMenu = document.querySelector(".has-child.open");
        let uList = currentActiveMenu.querySelector("ul");
        currentActiveMenu
          .querySelector(".has-child__toggle")
          .classList.remove("active");
        currentActiveMenu
          .querySelector(".menu-item")
          .classList.remove("active");
        uList.style.cssText = "";
        currentActiveMenu.classList.remove("open");

        let _closest = item.closest(".has-child");
        item.classList.add("active");
        if (_closest) {
          _closest.classList.add("open");
          _closest.querySelector(".has-child__toggle").classList.add("active");
          let uList = _closest.querySelector("ul");
          let uListHeight = uList.offsetHeight;
          uList.style.cssText = `height: ${uListHeight}px; padding-bottom: 12px;`;
        }
      }
      item.addEventListener("click", function () {
        this.closest(".sidebar_nav")
          .querySelectorAll(".menu-item")
          .forEach((elm) => {
            elm.classList.remove("active");
          });
        this.closest("li").classList.add("active");
        sidebarNavChild.forEach((elm) => {
          elm.querySelector(".has-child__toggle").classList.remove("active");
          elm.classList.remove("open");
          let uList = elm.querySelector("ul");
          uList.style.cssText = "height: 0; padding-bottom: 0;";
        });
        if (this.closest(".has-child")) {
          this.closest(".has-child").classList.add("open");
          this.closest(".has-child")
            .querySelector(".has-child__toggle")
            .classList.add("active");
          let uList = this.closest(".has-child").querySelector("ul");
          let uListHeight = uList.offsetHeight;
          uList.style.cssText = `height: ${uListHeight}px; padding-bottom: 12px;`;
        }

        if (window.innerWidth < 991) {
          mainSidebar.classList.toggle("sidebar--collapsed");
        }
      });
    });
    document.body.addEventListener("click", function (e) {
      if (window.innerWidth < 991) {
        if (
          !e.target.closest(".sidebar") &&
          !e.target.closest(".sidebar-toggle")
        ) {
          mainSidebar.classList.add("sidebar--collapsed");
        }
      }
    });

    /* Looping all dropdown items */
    sidebarNavChild.forEach((elm) => {
      let uList = elm.querySelector("ul");
      let uListHeight = uList.offsetHeight;

      /* Reset all submenu height and padding */
      uList.style.cssText = "height: 0; padding-bottom: 0;";

      /* Set height & padding to submenu if parent has 'open' class */
      if (elm.classList.contains("open")) {
        uList.style.cssText = `height: ${uListHeight}px; padding-bottom: 12px;`;
      }

      /* Event listener for all submenu trigger anchors */
      elm.children[0].addEventListener("click", function (e) {
        e.preventDefault();

        /* Close if any submenu already opened */
        sidebarNavChild.forEach((element) => {
          if (e.target.closest(".has-child") !== element) {
            element.classList.remove("open");
            element.querySelector("ul").style.cssText =
              "height: 0; padding-bottom: 0;";
          }
        });

        /* Current targeted submenu actions */
        let childParent = elm.children[0].closest(".has-child");
        let ul = childParent.querySelector("ul");
        childParent.classList.toggle("open");

        if (childParent.classList.contains("open")) {
          ul.style.cssText = `height: ${uListHeight}px; padding-bottom: 12px;`;
        } else {
          ul.style.cssText = "height: 0; padding-bottom: 0;";
        }
      });
    });

    /* Submenu position relative to it's parent */
    function sidebarCollapsed() {
      let direction = document.querySelector("html").getAttribute("dir");
      let collapsedChild = document.querySelectorAll(
        ".sidebar--collapsed .has-child"
      );
      collapsedChild.forEach((item) => {
        item.addEventListener("mouseover", function () {
          if (mainSidebar.classList.contains("sidebar--collapsed")) {
            let menuItem = this;
            let menuItemRect = menuItem.getBoundingClientRect();
            let submenuWrapper = menuItem.querySelector("ul");
            menuItem.classList.add("open");
            submenuWrapper.style.cssText = `height: auto; padding-bottom: 12px; top: ${menuItemRect.top}px;`;
            if (direction === "ltr") {
              submenuWrapper.style.left = `${
                menuItemRect.left + Math.round(menuItem.offsetWidth * 0.75) + 10
              }px`;
              submenuWrapper.style.right = "auto";
            } else if (direction === "rtl") {
              submenuWrapper.style.right = `${
                Math.round(menuItem.offsetWidth * 0.75) + 10
              }px`;
              submenuWrapper.style.left = "auto";
            }
          }
        });
      });
    }

    /* sidebar scroll to active link on page load */
    const activeLink = document.querySelector(
      ".sidebar_nav .menu-item a.active"
    );
    if (activeLink !== null) {
      const activeLinkOffset = activeLink.offsetTop;
      document.querySelector(".svlr-viewport").scrollTop = activeLinkOffset;
    }
  });

  function handleLayoutDirecction(e, direction) {
    e.preventDefault();

    document.documentElement.setAttribute("dir", direction);
    if (direction === "rtl") {
      document.getElementById("bootstrap-css-link").href =
        "../css/bootstrap.rtl.min.css";
    } else {
      document.getElementById("bootstrap-css-link").href =
        "../css/bootstrap.min.css";
    }
  }

  /* Active Top Menu */
  function handleMenuType(e) {
    e.preventDefault();
    document.body.classList.add("top-menu");
    document.body.classList.remove("side-menu");
  }
</script>

<aside class="sidebar" class:sidebar--collapsed={isSidebarCollapsed}>
  <button on:click={toggleSidebar} class="text-black">Minify</button>

  <!-- <Svroller width="100%" height="100%"> -->
  <div class="sidebar__menu-group h-full">
    <ul class="sidebar_nav">
      <li>
        <a href={"/admin"} class={$page.route.id === "/admin" && "active"}>
          <span class="nav-icon uil uil-apps" />
          <span class="menu-text">Dashboard</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/recent-earnings"}
          class={$page.route.id === "/admin/recent-earnings" && "active"}
        >
          <span class="nav-icon uil uil-search-alt" />
          <span class="menu-text">Recent Earnings</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/featured-offers"}
          class={$page.route.id === "/admin/featured-offers" && "active"}
        >
          <span class="nav-icon uil uil-star" />
          <span class="menu-text">Featured Offers</span>
        </a>
      </li>
	  <li>
        <a
          href={"/admin/offers"}
          class={$page.route.id === "/admin/offers" && "active"}
        >
          <span class="nav-icon uil uil-search-alt" />
          <span class="menu-text">Offers</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/csv"}
          class={$page.route.id === "/admin/csv" && "active"}
        >
          <span class="nav-icon uil uil-file-download-alt" />
          <span class="menu-text">CSV Download</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/search"}
          class={$page.route.id === "/admin/search" && "active"}
        >
          <span class="nav-icon uil uil-user-location" />
          <span class="menu-text">User Search</span>
        </a>
      </li>

	  <li>
		<a href={'/admin/giveaway-manage'} class={$page.route.id === "/admin/giveaway-manage" && "active"}>
			<span class="nav-icon uil uil-user-location" />
			<span class="menu-text">Giveaway Manage</span>
		</a>
	</li>

	<li>
		<a href={'/admin/promocode'} class={$page.route.id === "/admin/promocode" && "active"}>
			<span class="nav-icon uil uil-user-location" />
			<span class="menu-text">Promocodes Manage</span>
		</a>
	</li>

      <li class="menu-title mt-30">
        <span>Rewards</span>
      </li>
	  <li>
        <a
          href={"/admin/gamble-requests"}
          class={$page.route.id === "/admin/gamble-requests" && "active"}
        >
		  <img src="/coin.svg" alt="coin" class="w-4 h-4 mr-5">
          <span class="menu-text">Gamble Requests</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/reward-requests"}
          class={$page.route.id === "/admin/reward-requests" && "active"}
        >
          <span class="nav-icon uil uil-gift" />
          <span class="menu-text">Reward Requests</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/paypal-requests"}
          class={$page.route.id === "/admin/paypal-requests" && "active"}
        >
          <span class="nav-icon uil uil-paypal" />
          <span class="menu-text">PayPal Requests</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/crypto-requests"}
          class={$page.route.id === "/admin/crypto-requests" && "active"}
        >
          <span class="nav-icon uil uil-bitcoin" />
          <span class="menu-text">Crypto Requests</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/held-rewards"}
          class={$page.route.id === "/admin/held-rewards" && "active"}
        >
          <span class="nav-icon uil uil-gift" />
          <span class="menu-text">Held Rewards</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/held-paypal"}
          class={$page.route.id === "/admin/held-paypal" && "active"}
        >
          <span class="nav-icon uil uil-paypal" />
          <span class="menu-text">Held PayPal</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/held-crypto"}
          class={$page.route.id === "/admin/held-crypto" && "active"}
        >
          <span class="nav-icon uil uil-bitcoin" />
          <span class="menu-text">Held Crypto</span>
        </a>
      </li>
      <li>
        <a
          href={"/admin/reward-history"}
          class={$page.route.id === "/admin/reward-history" && "active"}
        >
          <span class="nav-icon uil uil-gift" />
          <span class="menu-text">Reward History</span>
        </a>
      </li>

      <!-- <li class="menu-title mt-30">
					<span>Database</span>
				</li>
                <li>
					<a href={'/admin/user'}>
						<span class="nav-icon uil uil-users-alt" />
						<span class="menu-text">Users</span>
					</a>
				</li>


				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-envelope" />
						<span class="menu-text">Email</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/email/inbox">Inbox</a>
						</li>
						<li class="menu-item">
							<a href="/email/single">Read Email</a>
						</li>
					</ul>
				</li>
				<li class="menu-item">
					<a href="/chat">
						<span class="nav-icon uil uil-chat" />
						<span class="menu-text">Chat</span>
						<span class="badge badge-success menuItem rounded-circle">3</span>
					</a>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-bag" />
						<span class="menu-text text-initial">eCommerce</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/ecommerce/product-grid">Products</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/productDetails">Product Details</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/product-add">Product Add</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/product-add">Product Edit</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/cart">Cart</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/orders">Orders</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/sellers">Sellers</a>
						</li>
						<li class="menu-item">
							<a href="/ecommerce/invoice">Invoices</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-folder" />
						<span class="menu-text">Project</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/projects/all-projects">Project</a>
						</li>
						<li class="menu-item">
							<a href="/projects/project-single">Project Details</a>
						</li>
					</ul>
				</li>
				<li class="menu-item">
					<a href="/calendar/day" class="has-child__toggle">
						<span class="nav-icon uil uil-calendar-alt" />
						<span class="menu-text">Calendar</span>
					</a>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-users-alt" />
						<span class="menu-text">Users</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/users/team">Team</a>
						</li>
						<li class="menu-item">
							<a href="/users/grid">Users Grid</a>
						</li>
						<li class="menu-item">
							<a href="/users/list">Users List</a>
						</li>
						<li class="menu-item">
							<a href="/users/grid-two">Users Grid style</a>
						</li>
						<li class="menu-item">
							<a href="/users/group">Users Group</a>
						</li>
						<li class="menu-item">
							<a href="/users/add-user">Add User</a>
						</li>
						<li class="menu-item">
							<a href="/users/table">Users Table</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-at" />
						<span class="menu-text">Contacts</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/contacts/grid">Contacts Grid</a>
						</li>
						<li class="menu-item">
							<a href="/contacts/list">Contacts List</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-apps" />
						<span class="menu-text">Social App</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/social/profile">My Profile</a>
						</li>
						<li class="menu-item">
							<a href="/social/settings">Profile Settings</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-user" />
						<span class="menu-text">Support</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/support/tickets">Support Ticket</a>
						</li>
						<li class="menu-item">
							<a href="/support/details">Ticket Details</a>
						</li>
						<li class="menu-item">
							<a href="/support/create-ticket">New Ticket</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-clipboard-alt" />
						<span class="menu-text">Note</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/note/all">All</a>
						</li>
						<li class="menu-item">
							<a href="/note/favorite">Favorite</a>
						</li>
					</ul>
				</li>
				<li class="menu-item">
					<a href="/todo">
						<span class="nav-icon uil uil-check-square" />
						<span class="menu-text">Todo</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/task">
						<span class="nav-icon uil uil-lightbulb-alt" />
						<span class="menu-text">Task App</span>
					</a>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-clipboard-alt" />
						<span class="menu-text">Import Export</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/import">Import</a>
						</li>
						<li class="menu-item">
							<a href="/import/export">Export</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-books" />
						<span class="menu-text">learning App</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/course">Course</a>
						</li>
						<li class="menu-item">
							<a href="/course/details">Details</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-search"/>
						<span class="menu-text">Job Search</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/job/job-grid">Grid View</a>
						</li>
						<li class="menu-item">
							<a href="/job/job-list">List View</a>
						</li>
						<li class="menu-item">
							<a href="/job/job-details">Job Details</a>
						</li>
						<li class="menu-item">
							<a href="/job/job-apply">Job Apply</a>
						</li>
					</ul>
				</li>
				<li class="menu-title mt-30">
					<span>Features</span>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-layers" />
						<span class="menu-text">UI Elements</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/components/alerts">Alert</a>
						</li>
						<li class="menu-item">
							<a href="/components/avatars">Avatar</a>
						</li>
						<li class="menu-item">
							<a href="/components/badges">Badge</a>
						</li>
						<li class="menu-item">
							<a href="/components/breadcrumbs">Breadcrumb</a>
						</li>
						<li class="menu-item">
							<a href="/components/buttons">Button</a>
						</li>
						<li class="menu-item">
							<a href="/components/cards">Cards</a>
						</li>
						<li class="menu-item">
							<a href="/components/carousels">Carousel</a>
						</li>
						<li class="menu-item">
							<a href="/components/checkbox">Checkbox</a>
						</li>
						<li class="menu-item">
							<a href="/components/collapse">Collapse</a>
						</li>
						<li class="menu-item">
							<a href="/components/comments">Comments</a>
						</li>
						<li class="menu-item">
							<a href="/components/datepicker">DatePicker</a>
						</li>
						<li class="menu-item">
							<a href="/components/drawer">Drawer</a>
						</li>
						<li class="menu-item">
							<a href="/components/draggable-list">Draggable List</a>
						</li>
						<li class="menu-item">
							<a href="/components/dropdown">Dropdown</a>
						</li>
						<li class="menu-item">
							<a href="/components/empty">Empty</a>
						</li>
						<li class="menu-item">
							<a href="/components/grid">Grid</a>
						</li>
						<li class="menu-item">
							<a href="/components/input">Input</a>
						</li>
						<li class="menu-item">
							<a href="/components/list">List</a>
						</li>
						<li class="menu-item">
							<a href="/components/menu">Menu</a>
						</li>
						<li class="menu-item">
							<a href="/components/message">Message</a>
						</li>
						<li class="menu-item">
							<a href="/components/modals">Modals</a>
						</li>
						<li class="menu-item">
							<a href="/components/notifications">Notifications</a>
						</li>
						<li class="menu-item">
							<a href="/components/page-headers">Page Headers</a>
						</li>
						<li class="menu-item">
							<a href="/components/paginations">Paginations</a>
						</li>
						<li class="menu-item">
							<a href="/components/progress">Progress</a>
						</li>
						<li class="menu-item">
							<a href="/components/radio">Radio</a>
						</li>
						<li class="menu-item">
							<a href="/components/rate">Rate</a>
						</li>
						<li class="menu-item">
							<a href="/components/result">Result</a>
						</li>
						<li class="menu-item">
							<a href="/components/select">Select</a>
						</li>
						<li class="menu-item">
							<a href="/components/skeleton">Skeleton</a>
						</li>
						<li class="menu-item">
							<a href="/components/slider">Slider</a>
						</li>
						<li class="menu-item">
							<a href="/components/spinner">Spinner</a>
						</li>
						<li class="menu-item">
							<a href="/components/statistic">Statistic</a>
						</li>
						<li class="menu-item">
							<a href="/components/steps">Steps</a>
						</li>
						<li class="menu-item">
							<a href="/components/switch">Switch</a>
						</li>
						<li class="menu-item">
							<a href="/components/tabs">Tabs</a>
						</li>
						<li class="menu-item">
							<a href="/components/tags">Tags</a>
						</li>
						<li class="menu-item">
							<a href="/components/timeline">Timeline</a>
						</li>
						<li class="menu-item">
							<a href="/components/timepicker">Timepicker</a>
						</li>
						<li class="menu-item">
							<a href="/components/typography">Typography</a>
						</li>
						<li class="menu-item">
							<a href="/components/upload">Upload</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-chart" />
						<span class="menu-text">Charts</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/features/charts/chartjs">Chart JS</a>
						</li>
						<li class="menu-item">
							<a href="/features/charts/apex-charts">Apex Charts</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-keyhole-circle" />
						<span class="menu-text">Forms</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/features/forms/basic">Basics</a>
						</li>
						<li class="menu-item">
							<a href="/features/forms/layout">Layouts</a>
						</li>
						<li class="menu-item">
							<a href="/features/forms/elements">Elements</a>
						</li>
						<li class="menu-item">
							<a href="/features/forms/components">Components</a>
						</li>
						<li class="menu-item">
							<a href="/features/forms/validations">Validations</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-server" />
						<span class="menu-text">Widget</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/features/widgets/charts">Chart</a>
						</li>
						<li class="menu-item">
							<a href="/features/widgets/cards">Cards</a>
						</li>
						<li class="menu-item">
							<a href="/features/widgets/mixed">Mixed</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-square" />
						<span class="menu-text">Wizards</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/features/wizard">Wizard 1</a>
						</li>
					</ul>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-grid" />
						<span class="menu-text">Icons</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/features/icons/unicons">Unicon Icons</a>
						</li>
						<li class="menu-item">
							<a href="/features/icons/lineawesome">Line Awesome</a>
						</li>
					</ul>
				</li>
				<li class="menu-item">
					<a href="/features/editor">
						<span class="nav-icon uil uil-edit" />
						<span class="menu-text">Editors</span>
					</a>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-map" />
						<span class="menu-text">Maps</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/features/maps/google-maps">Google Maps</a>
						</li>
						<li class="menu-item">
							<a href="/features/maps/leaflet-maps">Leaflet Maps</a>
						</li>
						<li class="menu-item">
							<a href="/features/maps/vector-maps">Vector Maps</a>
						</li>
					</ul>
				</li>
				<li class="menu-title mt-30">
					<span>Pages</span>
				</li>
				<li class="menu-item">
					<a href="/pages/gallery">
						<span class="nav-icon uil uil-images" />
						<span class="menu-text">Gallery</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/pricing">
						<span class="nav-icon uil uil-bill" />
						<span class="menu-text">Pricing</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/banner">
						<span class="nav-icon uil uil-thumbs-up" />
						<span class="menu-text">Banners</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/testimonial">
						<span class="nav-icon uil uil-book-open" />
						<span class="menu-text">Testimonial</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/faqs">
						<span class="nav-icon uil uil-question-circle" />
						<span class="menu-text">FAQ's</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/search-result">
						<span class="nav-icon uil uil-credit-card-search" />
						<span class="menu-text">Search Results</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/blank">
						<span class="nav-icon uil uil-circle" />
						<span class="menu-text">Blank Page</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/support">
						<span class="nav-icon uil uil-headphones" />
						<span class="menu-text">Support Center</span>
					</a>
				</li>
				<li class="has-child">
					<a href={'#'} class="has-child__toggle">
						<span class="nav-icon uil uil-images" />
						<span class="menu-text">Blog</span>
						<span class="toggle-icon" />
					</a>
					<ul>
						<li class="menu-item">
							<a href="/pages/blog/style-one">style 1</a>
						</li>
						<li class="menu-item">
							<a href="/pages/blog/style-two">Style 2</a>
						</li>
						<li class="menu-item">
							<a href="/pages/blog/style-three">Style 3</a>
						</li>
						<li class="menu-item">
							<a href="/pages/blog/details">Details</a>
						</li>
					</ul>
				</li>
				<li class="menu-item">
					<a href="/pages/terms">
						<span class="nav-icon uil uil-question-circle" />
						<span class="menu-text">Terms & Conditions</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/maintenance">
						<span class="nav-icon uil uil-airplay" />
						<span class="menu-text">Maintenance</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/404">
						<span class="nav-icon uil uil-exclamation-triangle" />
						<span class="menu-text">404</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/pages/coming-soon">
						<span class="nav-icon uil uil-sync" />
						<span class="menu-text">Coming Soon</span>
					</a>
				</li> -->
    </ul>
  </div>
  <!-- </Svroller> -->
</aside>

<style lang="scss">
  @import "../../../assets/sass/mixins/directional.scss";
  @import "./style.scss";
  $dir: ltr;

  /* CSS for collapsed sidebar */
  .sidebar--collapsed {
    width: 75px; /* Adjust the width as per your design */
    min-width: 75px; /* Adjust the width as per your design */
    /* Other styles for collapsed state */
  }
  .sidebar-icon-fr {
	height: 10px;
	width: 10px
  }

  /* :global(aside.sidebar) {
		@import '../../../assets/sass/mixins/directional.scss';
		@import './style.scss';

		$dir: ltr;
	} */
</style>
