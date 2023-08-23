<script>
	import Calendar from '@view/apps/calendar/element/uidate.svelte';
	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
	import '@fullcalendar/core/vdom';
	import FullCalendar from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';
	import timegridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import {
		Button,
		Modal,
		ModalBody,
		ModalHeader,
		Form,
		Input,
		Label
	} from 'sveltestrap';
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday'];
	let options = {
		droppable: true,
		editable: true,
		initialView: 'timeGridDay',
		selectable: true,
		plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
		headerToolbar: {
			left: 'today prev,title,next',
			right: 'timeGridDay,timeGridWeek,dayGridMonth',
		},
		weekends: true,
		showNonCurrentDates: false,
		dateClick: (info) => {
			let daySiblings = info.dayEl.closest('tbody').querySelectorAll('.fc-daygrid-day');
			daySiblings.forEach((el) => {
				el.classList.remove('fc-day_selected');
			});
			info.dayEl.classList.add('fc-day_selected');
		},
		dayHeaderContent: function (arg) {
			return dayNames[arg.date.getDay()];
		}
	};
	let open = false;
	const toggle = () => (open = !open);
</script>

<div class="row calendar-grid justify-content-center">
	<div class="col-xxl-3 col-xl-5 col-md-6 col-sm-8">
		<div class="dm-calendar-left">
			<Button color="primary" class="btn-create-event" on:click={toggle}>
				<i class="las la-plus fs-16" />Create New Event
			</Button>
			<Modal isOpen={open} {toggle} class="c-event-modal ">
				<ModalHeader {toggle}>
					<h6 class="modal-title fw-500" id="staticBackdropLabel">Create Event</h6>
				</ModalHeader>
				<ModalBody>
					<Form class="c-event-form">
						<div class="e-form-row d-flex">
							<div class="e-form-row__left">
								<Label for="name47">Title</Label>
							</div>
							<div class="e-form-row__right">
								<Input type="text" id="name47" placeholder="Weekly report meeting"
									class="form-control-md" />
							</div>
						</div>
						<div class="e-form-row d-flex">
							<div class="e-form-row__left">
								<Label class="mb-15">Event type</Label>
							</div>
							<div class="e-form-row__right">
								<div class="radio-horizontal-list d-flex">
									<div class="radio-theme-default custom-radio ">
										<input class="radio" type="radio" name="radio-optional" value="0"
											id="radio-hl1" />
										<label for="radio-hl1">
											<span class="radio-text">Event</span>
										</label>
									</div>

									<div class="radio-theme-default custom-radio ">
										<input class="radio" type="radio" name="radio-optional" value="0"
											id="radio-hl2" />
										<label for="radio-hl2">
											<span class="radio-text">Remainder</span>
										</label>
									</div>

									<div class="radio-theme-default custom-radio ">
										<input class="radio" type="radio" name="radio-optional" value="0"
											id="radio-hl3" />
										<label for="radio-hl3">
											<span class="radio-text">Task</span>
										</label>
									</div>
								</div>
							</div>
						</div>

						<div class="e-form-row d-flex">
							<div class="e-form-row__left">
								<Label class="mb-15">Start</Label>
							</div>
							<div class="e-form-row__right">
								<div class="w-100 d-flex custom-date-ranger mb-0">
									<div class="input-container icon-left position-relative me-2">
										<DatePicker format="MMMM DD, YYYY" />
										<span class="input-icon icon-left">
											<img class="svg" src="/img/svg/chevron-right.svg" alt="">
										</span>
									</div>

									<div class="input-container icon-left position-relative">
										<span class="input-icon icon-left">
											<img class="svg" src="/img/svg/clock.svg" alt="">
										</span>
										<input type="text" class="form-control form-control-md" name="s-time"
											placeholder="Select Time">
									</div>
								</div>
							</div>
						</div>
						<div class="e-form-row d-flex">
							<div class="e-form-row__left">
								<Label class="mb-15">End</Label>
							</div>
							<div class="e-form-row__right">
								<div class="w-100 d-flex custom-date-ranger mb-0">
									<div class="input-container icon-left position-relative me-2">
										<DatePicker format="MMMM DD, YYYY" />
										<span class="input-icon icon-left">
											<img class="svg" src="/img/svg/chevron-right.svg" alt="">
										</span>
									</div>

									<div class="input-container icon-left position-relative">
										<span class="input-icon icon-left">
											<img class="svg" src="/img/svg/clock.svg" alt="">
										</span>
										<input type="text" class="form-control form-control-md" name="s-time"
											placeholder="Select Time">
									</div>
								</div>
							</div>
						</div>
						<div class="e-form-row d-flex">
							<div class="e-form-row__left">
								<Label for="exampleFormControlTextarea1">Description</Label>
							</div>
							<div class="e-form-row__right d-flex">
								<Input type="textarea" id="exampleFormControlTextarea1" rows="3"
									placeholder="Add description" />
							</div>
						</div>
						<div class="button-group d-flex justify-content-end pt-25">
							<Button color="light" size="default" type="button"
								class="btn-squared fs-15 fw-400 text-capitalize b-light btn-transparent-light"
								on:click={toggle}>cancel</Button>
							<Button color="primary" size="default" class="fs-15 btn-squared text-capitalize">save
							</Button>
						</div>
					</Form>
				</ModalBody>
			</Modal>
			<div class="card card-md mb-4">
				<div class="card-body px-10">
					<div class="date-picker">
						<div class="date-picker__calendar">
							<Calendar />
						</div>
						<!-- ends: .date-picker__calendar -->
					</div>
				</div>
			</div>
			<div class="card card-md mb-4">
				<div class="card-body">
					<div class="draggable-events" id="draggable-events">
						<div class="draggable-events__top d-flex justify-content-between">
							<h6>My Calendars</h6>
							<a href={"#"}>
								<img class="svg" src="/img/svg/plus.svg" alt=""></a>
						</div>
						<ul class="draggable-event-list">
							<li class="draggable-event-list__single d-flex align-items-center" data-class="primary">
								<span class="badge-dot badge-primary"></span>
								<span class="event-text">Family Events</span>
							</li>
							<!-- ends: .draggable-event-list__single -->
							<li class="draggable-event-list__single d-flex align-items-center" data-class="secondary">
								<span class="badge-dot badge-secondary"></span>
								<span class="event-text">Product Launch</span>
							</li>
							<!-- ends: .draggable-event-list__single -->
							<li class="draggable-event-list__single d-flex align-items-center" data-class="success">
								<span class="badge-dot badge-success"></span>
								<span class="event-text">Team Meeting</span>
							</li>
							<!-- ends: .draggable-event-list__single -->
							<li class="draggable-event-list__single d-flex align-items-center" data-class="primary">
								<span class="badge-dot badge-primary"></span>
								<span class="event-text">UI/UX Tasks</span>
							</li>
							<!-- ends: .draggable-event-list__single -->
							<li class="draggable-event-list__single d-flex align-items-center" data-class="warning">
								<span class="badge-dot badge-warning"></span>
								<span class="event-text">Project Update</span>
							</li>
							<!-- ends: .draggable-event-list__single -->
						</ul>
					</div>
				</div>
			</div>
			<!-- ends: .card -->
		</div>
	</div>
	<!-- ends: .col-lg-3 -->
	<div class="col-xxl-9 col-xl-7">
		<div class="card card-default card-md mb-4">
			<div class="card-body">
				<FullCalendar {options} class="date-picker__calendar" />
			</div>
		</div>
		<!-- ends: .card -->
	</div>
</div>


<style lang="scss">
	:global {
		@import '../../../../assets/sass/mixins/media-queries';
		@import '../../../../assets/sass/mixins/functions';
		@import '../../../../assets/sass/components/calendar';
	}
</style>