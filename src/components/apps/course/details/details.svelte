<script>
	import { onMount } from 'svelte';
	import { Row, Col } from 'sveltestrap';
	import BiggerPicture from 'bigger-picture/svelte';
	import 'bigger-picture/css';

	const lectureCategory = [
		{
			color: 'primary',
			icon: 'book-alt.svg',
			title: '35 Lectures'
		},
		{
			color: 'secondary',
			icon: 'clock2.svg',
			title: '15 Lectures'
		},
		{
			color: 'info',
			icon: 'award.svg',
			title: '18 Lectures'
		},
		{
			color: 'warning',
			icon: 'sync.svg',
			title: '21 Lectures'
		}
	];

	const collapseItem = [
		{
			idName: 'one',
			title: 'Getting Started',
			lecture: '03 Lectures',
			duration: '15:00',
			activeIcon: 'true',
			activeClass: '',
			activeClassBody: 'show',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		},
		{
			idName: 'two',
			title: 'User Interface Vs User Experience',
			lecture: '05 Lectures',
			duration: '17:00',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: '',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		},
		{
			idName: 'three',
			title: 'Design Fundamental',
			lecture: '05 Lectures',
			duration: '17:00',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: '',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		},
		{
			idName: 'four',
			title: 'Colors Theory',
			lecture: '05 Lectures',
			duration: '17:00',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: '',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		},
		{
			idName: 'five',
			title: 'Typography',
			lecture: '05 Lectures',
			duration: '17:00',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: '',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		},
		{
			idName: 'six',
			title: 'Live Project 03',
			lecture: '05 Lectures',
			duration: '17:00',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: '',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		},
		{
			idName: 'seven',
			title: 'Conclusion',
			lecture: '05 Lectures',
			duration: '17:00',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: '',
			youtubeUrl: 'https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1'
		}
	];

	const faqItem = [
		{
			idName: 'FaqOne',
			title: 'How can I Apply for this Course?',
			iconName: 'plus',
			activeIcon: 'true',
			activeClass: '',
			activeClassBody: 'show'
		},
		{
			idName: 'FaqTwo',
			title: 'What is UI/UX Design?',
			iconName: 'plus',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: ''
		},
		{
			idName: 'FaqThree',
			title: 'How to use SCSS variables to build custom color',
			iconName: 'plus',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: ''
		},
		{
			idName: 'FaqFour',
			title: 'What is the flex layout?',
			iconName: 'plus',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: ''
		},
		{
			idName: 'FaqFive',
			title: 'How long does it take to download updates?',
			iconName: 'plus',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: ''
		},
		{
			idName: 'FaqSix',
			title: 'Where to buy this Ul dashboard?',
			iconName: 'plus',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: ''
		},
		{
			idName: 'FaqSeven',
			title: 'How long does it take to download updates?',
			iconName: 'plus',
			activeIcon: 'false',
			activeClass: 'collapsed',
			activeClassBody: ''
		}
	];

	onMount(() => {
		let bp = BiggerPicture({
			target: document.body
		});

		let links = document.querySelectorAll('a.popup-youtube');
		for (let link of links) {
			link.addEventListener('click', openBiggerPicture);
		}

		function openBiggerPicture(e) {
			e.preventDefault();
			bp.open({
				items: e.currentTarget,
				el: e.currentTarget
			});
		}
	});
</script>

<div class="course-details-wrapper mb-45">
	<Row class="mt-2">
		<Col lg={6}>
			<div class="course-details-about">
				<div class="course-details-about__content">
					<h1 class="main-title">UI/UX Design Masters Course</h1>
					<p class="main-title-sub mb-30">
						Many support queries and technical questions will already be answered in supporting
						documentation such as and comments from previous buyers. Anim pariatur cliche
						reprehenderit, enim eiusmod.
					</p>
					<h5 class="mb-3">About Instructor</h5>
					<div class="course-details-author">
						<img src="/img/ellipse1.png" alt="ellipse1" />
						<div class="course-details-author__title">
							<h6>David Warner</h6>
							<span>Senior UI/UX Designer at Dribble, Top Rated Freelancer at Upwork </span>
						</div>
					</div>
					<h5>About This Course</h5>
					<p class="main-title-sub mb-30">
						User interface design or user interface engineering is the design of user interfaces for
						machines and software, such as computers, home appliances, mobile devices, and other
						electronic devices, with the focus on maximizing usability and the user experience.
					</p>
					<p class="main-title-sub mb-40">
						User interface design or user interface engineering is the design of user interfaces for
						machines and software, such as computers, home appliances, mobile devices, and other
						electronic devices, with the focus on maximizing.
					</p>
					<h5>What You Will Learn</h5>
					<div class="course-details__step-list">
						<ul>
							<li>Basic to Advance knowledge of UI/UX Design</li>
							<li>UI/UX Design Fundamental</li>
							<li>Colors Theory</li>
							<li>Typography</li>
							<li>Design Systems</li>
							<li>Alignment</li>
							<li>User Research</li>
							<li>User Flow</li>
						</ul>
					</div>
					<h5>Course content</h5>
					<div class="course-details-collapse mb-30">
						<div class="course-collapse course-accordion" id="accordionExample">
							<div class="border-0 dm-collapse dm-accordion">
								{#each collapseItem as item}
									<div class="dm-collapse-item">
										<div class="border-bottom-0 mb-0 dm-collapse-item__header">
											<a
												href="/"
												class="item-link {item.activeClass}"
												data-bs-toggle="collapse"
												data-bs-target="#collapse{item.idName}"
												aria-expanded={item.activeIcon}
												aria-controls="collapse{item.idName}"
											>
												<div class="dm-collapse-title">
													<i class="las la-plus" />
													<h6>{item.title}</h6>
												</div>
												<div class="course-collapse-right">
													<div class="course-collapse-lecture">
														{item.lecture}
													</div>
													<div class="course-collapse-duration">
														{item.duration}
													</div>
												</div>
											</a>
										</div>
										<div
											id="collapse{item.idName}"
											class="dm-collapse-item__body collapse {item.activeClassBody}"
											data-bs-parent="#accordionExample"
										>
											<div class="collapse-body-text">
												<div class="course-collapse-body-item">
													<div class="course-collapse-body-item__left">
														<a
															class="popup-youtube"
															href="https://www.youtube.com/watch?v=i9E_Blai8vk"
															data-thumb="/img/profile_bg_2.png"
															data-iframe={item.youtubeUrl}
														>
															<img class="course-icon" src="/img/play.png" alt="play" />
														</a>
														<div class="course-title">Course Introduction</div>
													</div>
													<div class="course-collapse-body-item__right">
														<div class="course-preview-lectures">Preview</div>
														<div class="course-duration">5:00</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
					<h5>FAQ</h5>
					<div class="course-details-collapse mb-30">
						<div class="course-collapse course-accordion" id="accordionExample2">
							<div class="border-0 dm-collapse dm-accordion">
								{#each faqItem as item}
									<div class="dm-collapse-item">
										<div class="border-bottom-0 mb-0 dm-collapse-item__header">
											<a
												href="/"
												class="item-link {item.activeClass}"
												data-bs-toggle="collapse"
												data-bs-target="#collapse{item.idName}"
												aria-expanded={item.activeIcon}
												aria-controls="collapse{item.idName}"
											>
												<div class="dm-collapse-title">
													<h6>{item.title}</h6>
												</div>
												<div class="course-collapse-right">
													<i class="las la-{item.iconName}" />
												</div>
											</a>
										</div>
										<div
											id="collapse{item.idName}"
											class="dm-collapse-item__body collapse {item.activeClassBody}"
											data-bs-parent="#accordionExample2"
										>
											<div class="collapse-body-text">
												<div class="course-collapse-body-item">
													<p>
														User interface design or user interface engineering is the design of
														user interfaces for machines and software, such as computers, home
														appliances, mobile devices, and other electronic devices, with the User
														interface design or user interface engineering is the design of user
														interfaces for machines and software, such as computers, home
														appliances, mobile devices, and other electronic devices, with the
													</p>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Col>
		<Col lg={6} class="mt-lg-0 mt-30">
			<div class="cvg">
				<div class="cvg__item cvg-overlay">
					<img src="/img/profile_bg_2.png" alt="gallery" />
					<div class="cvg__item-content">
						<a
							class="cvg__iconWrapper popup-youtube"
							href="https://www.youtube.com/watch?v=i9E_Blai8vk"
							data-thumb="/img/profile_bg_2.png"
							data-iframe="https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1"
						>
							<img class="svg" alt="" src={'/img/svg/youtube.svg'} />
						</a>
					</div>
				</div>
				<div class="d-flex align-items-center justify-content-center flex-wrap mt-20">
					{#each lectureCategory as item}
						<div class="cvg__icon-area">
							<div class="svg-icon order-bg-opacity-{item.color}">
								<img class="svg" alt="" src={`/img/svg/${item.icon}`} />
							</div>
							<span>{item.title}</span>
						</div>
					{/each}
				</div>
				<div class="cvg__contents">
					<h1>$250</h1>
					<button class="btn btn-primary"> Start This Course </button>
				</div>
			</div>
		</Col>
	</Row>
</div>
