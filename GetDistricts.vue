<template>

  <section class="get-districts">
    <h1>get-districts Component</h1>
    {{ data }}
    {{ $consoleLog('data?? ', data) }}
    
  </section>

</template>

<script>
  import axios from "axios";
  export default  {
    
    name: 'get-districts',
    props: [],
    mounted () {

    },
    data () {
      return {
        data: this.get(),
      }
    },
    methods: {
      get() {
        console.log('getting? ');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        let url = "https://ag.org/Resources/Directories/Find%20a%20Church?"
        axios.get(url).then(res => {
          console.log('wooo,' , res);
          
        })
      }

    },
    computed: {

    }
}


</script>