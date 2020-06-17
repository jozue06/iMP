<template>
	<div>
		<label>District</label>
		<b-form-select v-model="currentContact.district" :options="districtOptions">
			<template v-if="!currentContact.district" v-slot:first>
				<b-form-select-option value="" disabled>
					Please select a District
				</b-form-select-option>
			</template>	
		</b-form-select>
		<label>Section</label>
		<b-form-select v-model="currentContact.section" :options="sectionOptions">
			<template v-if="!currentContact.district" v-slot:first>
				<b-form-select-option value="" disabled>
					Please select a District
				</b-form-select-option>
			</template>	
			<template v-else v-slot:first>
				<b-form-select-option value="" disabled>
					Please select a Section
				</b-form-select-option>
			</template>	
		</b-form-select>
	</div>
</template>

<script>
	import { districts, sections } from "../constants/districts";

	export default  {

		name: 'district-selector',

		props: {
			currentContact: Object,
		},

		mounted () {

		},

		data() {
			return {
			}
		},

		methods: {

		},

		computed: {
			districtOptions() {
				return districts.map(dis => ({ text: dis.districtNameShort, value: dis.districtCode }));
			},

			sectionOptions() {
				return sections.filter(sec => sec.districtCode == this.currentContact.district).map(nSec => ({value: nSec.section, text: nSec.section})) || {};
			},
			
		}
}

</script>