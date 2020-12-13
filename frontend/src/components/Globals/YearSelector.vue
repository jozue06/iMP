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
				:class="'display-text-' + alignment"
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
						valueMoment = moment(this.value, "YYYY");
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
				document.addEventListener("click", e => {
					if (this.$el && !this.$el.contains(e.target)) {
						this.closeMenu();
					}
				}, false);

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
