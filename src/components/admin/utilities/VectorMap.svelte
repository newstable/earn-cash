<script>
	import { onMount } from 'svelte';
	import 'svgmap/dist/svgMap.min.css';
	import svgMapDataGDP from '@data/vectorMap.js';

	export let id = 'svgMap';
	export let options = svgMapDataGDP;

	export function usePackage(svgMap) {
		let svgMapPackage = new svgMap({
			targetElementID: id,
			initialZoom: 1,
			initialPan: { x: 300, y: 60 },
			flagType: 'emoji',
			colorMax: '#DBE1E8',
			colorMin: '#DBE1E8',
			colorNoData: '#DBE1E8',
			data: { ...options }
		});
	}

	onMount(async () => {
		const svgMap = await import('svgmap');
		usePackage(svgMap.default);
	});
</script>

<div {id} />

<style lang="scss">
	:global {
		.regions-svg {
			width: 100%;
			height: 100%;
			min-height: 160px;

			.svgMap-wrapper {
				width: 100%;
				height: 100%;
				.svgMap-container,
				.svgMap-map-container,
				.svgMap-map-wrapper,
				.svgMap-map-image {
					height: 100%;
				}
				.svgMap-map-wrapper {
					position: relative;
					background-color: #fff;
					padding-top: 0;
				}
			}
			> div {
				width: 100%;
				height: 250px;
				overflow: hidden;
				@media only screen and (max-width: 479px) {
					height: 200px;
				}
			}
			svg {
				width: 450px;
				@media only screen and (max-width: 479px) {
					height: 180px;
				}
				@media only screen and (max-width: 440px) {
					width: 310px;
				}
				@media only screen and (max-width: 320px) {
					width: 280px;
				}
			}
			.svgMap-map-controls-wrapper {
				position: absolute;
				right: 0;
				left: auto !important;
				bottom: 10px;
				box-shadow: none !important;
				.svgMap-map-controls-zoom {
					display: flex;
					flex-direction: column;
				}
				button {
					display: inline-block;
					width: 28px;
					height: 28px;
					background: none;
					color: var(--color-dark);
					border: 1px solid var(--border-color);
					padding: 0;
					font-size: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color:var(--bg-white);
					cursor: pointer;
					margin: 0 !important;
					&.svgMap-zoom-in-button {
						&:before {
							width: 8px !important;
							height: 1px !important;
							background-color: currentColor;
						}
						&:after {
							width: 1px !important;
							height: 8px !important;
							background-color: currentColor;
						}
					}
					&.svgMap-zoom-out-button {
						&:before {
							width: 8px !important;
							height: 1px !important;
							background-color: currentColor;
						}
					}
					&:first-child {
						border-radius: 6px 6px 0 0;
					}
					&:last-child {
						border-radius: 0 0 6px 6px;
					}
					&:focus {
						outline: none;
					}
					svg {
						width: 10px;
					}
				}
				button + button {
					border-top: 0 none;
				}
			}
		}
		/* vector map */
		.svgMap-map-wrapper {
			background: var(--bg-white) !important;
		}
		.svgMap-tooltip {
			background: var(--bg-white) !important;
			border-radius: 3px !important;
			border: 1px solid var(--border-color);
			box-shadow: 0 10px 15px rgba(var(--color-dark-rgba), .15) !important;
			border-bottom: 0 none !important;
			text-align: center;
			color: var(--color-dark);
			font-size: 13px;
			font-weight: 500;
			.svgMap-tooltip-pointer{
				&:after{
					border: 1px solid var(--color-white);
				}
			}
			.svgMap-tooltip-title{
				color: var(--color-gray);
				font-weight: 400;
			}
		}

		.svgMap-tooltip .svgMap-tooltip-content {
			color: var(--color-white) !important;
		}
		.svgMap-tooltip .svgMap-tooltip-content table td span {
			color: var(--color-primary) !important;
		}

		/* Vector map hover fill color */
		.svgMap-map-wrapper .svgMap-country.svgMap-active,
		.svgMap-map-wrapper .svgMap-country:hover {
			stroke: transparent !important;
			fill: var(--color-primary);
		}
		/* SVG map Style */
		.svgMap-tooltip .svgMap-tooltip-content-container {
			padding: 10px;
			min-width: 130px;
		}
		.svgMap-tooltip .svgMap-tooltip-content-container .svgMap-tooltip-content {
			display: none;
		}
		.svgMap-tooltip
			.svgMap-tooltip-content-container
			.svgMap-tooltip-flag-container.svgMap-tooltip-flag-container-emoji {
			font-size: 22px !important;
			line-height: 0 !important;
			padding: 4px 0 6px !important;
		}
		.svgMap-tooltip .svgMap-tooltip-content-container .svgMap-tooltip-title {
			font-size: 13px;
			line-height: 20px;
			padding-bottom: 0;
		}
	}
</style>
