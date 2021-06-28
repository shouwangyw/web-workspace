<template>
  <div id="app">
    <a href="#">{{info}}</a> <br />
    <a href="#">{{host}}</a> <br/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data () {
    return {
      info: '',
      host: ''
    };
  },
  created() {
    this.Api.some().then(res => { this.info = res; });
    this.Api.hostname().then(res => { this.host = res; });
  },
  methods: {
  }
};
</script>

