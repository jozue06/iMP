<template>
	<section>
		 <div id="mapContainer" class="map-container"> 
		 </div>
	</section>
</template>

<script>
	import mapbox from "mapbox-gl";
	import axios from "axios";
	export default {
		name: "BaseMap",
		props: {
		},
		data() {
			return {
				accessToken: process.env.VUE_APP_MAP_BOX_TOKEN,
				map: null
			};
		},

		mounted() {
			mapbox.accessToken = this.accessToken;
			
			var map = new mapbox.Map({
				container: 'mapContainer',
				style: 'mapbox://styles/mapbox/streets-v11'
			});
			
			const geolocate = new mapbox.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			});

			map.addControl(geolocate, "top-right");
			const nav = new mapbox.NavigationControl();
			map.addControl(nav, "top-right");
			this.map = map;
		},

		methods: {
			displayOnMap(address) {
				axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${this.accessToken}&limit=1`).then(res => {
					let chords = res.data.features[0].geometry.coordinates;
					new mapbox.Marker().setLngLat(chords).addTo(this.map);
					this.map.flyTo({center: chords});
				}).catch(e => {
					console.error('mapbox erre:', e);
				})
			}
		}
	};

</script>

<style lang="scss" scoped>
.map-container {
	min-height: 300px;
	width: 80%;
} 
</style>