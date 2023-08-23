<script>
	import { Row, Col } from 'sveltestrap';
	import courseData from '@data/courseData.json';
	import PaginationBasic from '../../../../../lib/components/pagination/PaginationBasic.svelte';
</script>

<Row class="mt-2">
	{#each courseData as item}
		<div class="col-xxl-3 col-xl-4 col-sm-6 col-12 mb-25">
			<div class="course-card">
				<div class="course-card__img-area">
					<img class="big-img" src="img/{item.coverImg}.png" alt={item.coverImg} />
				</div>
				<div class="course-card__body">
					<div class="course-card__title">
						<h4><a href="/course/details">{item.title}</a></h4>
					</div>
					<div class="course-card__about">
						<img src="img/{item.authorImg}.png" alt={item.authorImg} />
						<span>{item.authorName}</span>
					</div>
				</div>
				<div class="course-card__footer">
					<div class="course-card__footer_left">
						<div class="total-money color-success">
							{item.price}
						</div>
					</div>
					<div class="course-card__footer_right">
						<div class="total-lextures no-btn">
							<img class="svg" alt="" src={`/img/svg/${item.totalLectureIcon}`} />
							{item.totalLecture} Lectures
						</div>
						<div class="total-hours no-btn">
							<img class="svg" alt="" src={`/img/svg/${item.totalHourIcon}`} />
							{item.totalHour} Hrs
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</Row>
<Row>
	<Col lg={12}>
		<PaginationBasic pageDropdown={true} />
	</Col>
</Row>
