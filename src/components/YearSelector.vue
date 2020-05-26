<template>
	<div class="year-picker">
		<div class="year-picker-wrapper" :class="{ 'active visible':showMenu }">
		<div class="year-label picker" type="text" autocomplete="off" tabindex="0" @click="openMenu">
			<div
				@click="openMenu"
				class="year-display"
				:disabled="disabled"
				:class="[inputClass, {'placeholder': !value}]"
			>
			<div
				class="display-text"
				:class="'display-text-'+alignment"
				:style="[{'text-align': alignment}]"
				
			>{{ displayText }}</div>
			<span
				class="vmp-input-append"
				@click.stop.prevent="clearSelect"
				v-if="clearOption && value"
			>
				<i class="vmp-clear-icon" />
			</span>
			</div>
		</div>
		<div class="text"></div>
		<div class="date-popover" :class="menuClass" :style="menuStyle" tabindex="-1">
			<div class="picker" style="text-align: center">
				<div class="flexbox">
					<span class="prev" @click="prevYear" :class="{deactive: !canBack}"></span>
					<div
						@click="selectYear"
					>
						{{ year }}
					</div>
					<span class="next" @click="nextYear" :class="{deactive: !canNext}"></span>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import moment from "moment";
	export default {
		name: "YearSelector",
		props: {
			value: {
				default: null
			},
			disabled: {
				type: Boolean,
				default: false
			},
			inputClass: {
				default: "input"
			},
			placeHolder: {
				type: String,
				default: "Select a Year"
			},
			alignment: {
				type: String,
				default: "center",
				validator: function(value) {
					// The value must match one of these strings
					return ["left", "right", "center"].indexOf(value) !== -1;
				}
			},
			selectedBackgroundColor: {
				type: String,
				default: "#007bff"
			},
			min: {
				default: null
			},
			max: {
				default: null
			},
			dateFormat: {
				type: String,
				default: "YYYY"
			},
			clearOption: {
				type: Boolean,
				default: true
			}
		},

		data() {
			return {
				showMenu: false,
				year: moment().format("YYYY")
			};
		},

		mounted() {
			this.init();
		},

		watch: {
			value: function(value) {
				this.setValue(value);
			}
		},

		computed: {
			menuClass() {
				return {
					visible: this.showMenu,
					hidden: !this.showMenu
				};
			},

			menuStyle() {
				return {
					display: this.showMenu ? "block" : "none",
					left:
					this.alignment === "right"
						? "100%"
						: this.alignment === "center"
						? "50%"
						: "",
					transform:
					this.alignment === "right"
						? "translate(-100%,0)"
						: this.alignment === "center"
						? "translate(-104%,0)"
						: ""
				};
			},

			displayText() {
				if (this.value) {
					let valueMoment = null;
					if (typeof this.value === "string") {
						valueMoment = moment(this.value);
					} else {
						valueMoment = this.value;
					}
					if (valueMoment && valueMoment.isValid()) {
						return valueMoment.format(this.dateFormat);
					}
				}
				return this.placeHolder.toString();
			},

			canBack() {
				if (!this.min) return true;
				const currentVal = this.internalMomentValue.clone().startOf("year");
				return this.min.isBefore(currentVal);
			},

			canNext() {
				if (!this.max) return true;
				const currentVal = this.internalMomentValue.clone().endOf("year");
				return currentVal.isBefore(this.max);
			},

			internalMomentValue() {				
				const yr = this.year;
				return moment(yr, "YYYY");
			}
		},

		methods: {
			init() {
				document.addEventListener(
					"click",
					e => {
						if (this.$el && !this.$el.contains(e.target)) {
							this.closeMenu();
						}
					},
					false
				);
				this.setValue(this.value);
			},

			openMenu() {
				if (!this.disabled) {
					this.showMenu = true;
				}
			},

			closeMenu() {
				this.showMenu = false;
			},

			prevYear() {
				if (!this.canBack) return;
				let newYear = parseInt(this.year) - 1;
				this.year = newYear.toString();
			},

			nextYear() {
				if (!this.canNext) return;
				let newYear = parseInt(this.year) + 1;
				this.year = newYear.toString();
			},

			selectYear() {				
				this.selectPicker()
				this.closeMenu()
			},

			selectPicker() {				
				this.$emit("input",  this.internalMomentValue.clone());
				this.$emit("selected", this.internalMomentValue.clone());
			},

			setValue(value) {
				if (typeof value === "string") {
					value = moment(value);
				}
				if (value && value.isValid()) {
					this.year = value.format("YYYY");
				}
			},

			isActive() {
				const yr = this.year;
				if (this.min && moment(yr, "YYYY").isBefore(this.min)) {
					return false;
				}
				if (this.max && moment(yr, "YYYY").isAfter(this.max)) {
					return false;
				}
				return true;
			},

			isCurrentSelected(year) {
				if (!this.value) {
					return false;
				}
				let checkValue = this.value;
				if (typeof this.value === "string") {
					checkValue = moment(this.value);
				}
				if (checkValue && checkValue.isValid()) {
					const currentYear = checkValue.format("YYYY");
					return Number(currentYear) === Number(year);
				}
				return false;
			},

			getBackgroundColor(year) {
				if (this.isCurrentSelected(year)) {
					return this.selectedBackgroundColor;
				}
			},

			clearSelect() {
				this.$emit("input", null);
				this.$emit("selected", null);
			}
		}
	};
</script>

<style lang="scss">
	$lightgray: #d4d4d4;
	.year-picker {
		.picker {
			.next,
			.prev {
				&:hover {
					cursor: pointer;
				}
			}
			.flexbox {
				padding: 0px;
				display: flex;
				flex-wrap: wrap;
			div {
				flex-grow: 1;
				padding: 15px 0;
			}
			.item {
				flex: 1;
				flex-basis: 25%;
			}
		}
	}
	.placeholder {
		color: #8b8b8b;
	}
	.date-popover {
		overflow-x: hidden;
		overflow-y: hidden;
		outline: none;
		max-width: 200px;
		width: 100%;
		border-radius: 0 0 0.28571429rem 0.28571429rem;
		box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
		background: #fff;
		transition: opacity 0.1s ease;
		position: absolute;
		margin: auto;
		z-index: 10;
		border: 1px solid $lightgray;
		font-size: 1rem;
		font-weight: 200;
	}
	.year-label {
		outline: none;
		.vmp-input-append {
		display: none;
		}
		&:hover .vmp-input-append {
		display: block;
		}
	}
	.text {
		position: relative;
		z-index: 2;
	}
	.year-display {
		&:hover {
			cursor: pointer;
		}
	}
	.next,
	.prev {
		width: 16%;
		float: left;
		text-indent: -10000px;
		position: relative;
		&:after {
			content: "";
			position: absolute;
			left: 50%;
			top: 50%;
			-webkit-transform: translateX(-50%) translateY(-50%);
			transform: translateX(-50%) translateY(-50%);
			border: 6px solid transparent;
		}
	}
	.next {
		&:after {
			border-left: 10px solid #000;
			margin-left: 5px;
		}
		&.deactive {
			&:hover {
				cursor: default;
			}
			&:after {
				border-left: 10px solid #999999;
			}
		}
	}
	.prev {
		&:after {
			border-right: 10px solid #000;
			margin-left: -5px;
		}
		&.deactive {
			&:hover {
				cursor: default;
			}
			&:after {
				border-right: 10px solid #999999;
			}
		}
	}
	.input {
		-moz-appearance: none;
		-webkit-appearance: none;
		align-items: center;
		border: 1px solid transparent;
		border-radius: 0.25rem;
		box-shadow: none;
		display: inline-flex;
		font-size: 1rem;
		min-width: 200px;
		height: 2.40em;
		justify-content: flex-start;
		line-height: 1.5;
		padding: 2px calc(0.625em - 1px);
		position: relative;
		vertical-align: top;
		background-color: #fff;
		border-color: #dbdbdb;
		color: #363636;
		box-shadow: inset 0 1px 2px hsla(0, 0%, 4%, 0.1);
		max-width: 100%;
		width: 100%;
	}
	.deactive {
		color: #999999;
	}
	.selected {
		color: #fff;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
		font-weight: bold;
	}
	.display-text {
		width: 100%;
	}
	.display-text-right {
		margin-right: 20px;
	}
	.vmp-input-append {
		position: absolute;
		top: 0;
		right: 0;
		width: 30px;
		height: 100%;
		padding: 6px;
	}
	.vmp-clear-icon {
		display: inline-block;
		width: 100%;
		height: 100%;
		font-style: normal;
		color: #555;
		text-align: center;
		cursor: pointer;
		&:before {
			display: inline-block;
			content: "\2716";
			vertical-align: middle;
		}
	}
}
</style>