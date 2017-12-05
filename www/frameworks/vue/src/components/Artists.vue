<template>
  <section class="artists">
    <header>
      <h1>
        <router-link to="/">Artists</router-link>
      </h1>
    </header>

    <ul>
      <li v-for="artist in artists">
        <router-link v-bind:to="'/artists/' + artist.id + '/albums'">
          <span class="name">{{artist.name}}</span>
          ({{artist.formation_year}})
        </router-link>
      </li>
    </ul>

    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'artists',

  // Function to return component data.
  data () {
    return {
      artists: []
    }
  },

  // Called when this component is created.
  created () {
    this.fetchData()
  },

  // Component methods.
  methods: {
    fetchData () {
      this.$http.get('/api/artists')
        .then(function (response) {
          this.artists = response.data
        })
    }
  }
}
</script>

<style scoped>
.name { font-size: 1.1em; }
</style>
