<template>
  <section>
    <header>
      <h2>Albums</h2>
    </header>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Release Date</th>
          <th>Label</th>
          <th>ASIN</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="album in albums">
          <td>{{album.name}}</td>
          <td>{{album.released}}</td>
          <td>{{album.label}}</td>
          <td>{{album.asin}}
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'albums',

  data () {
    return {
      albums: []
    }
  },

  created () {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      var id = this.$route.params.artistID
      var url = '/api/artists/' + id + '/albums'

      this.$http.get(url)
        .then(function (response) {
          this.albums = response.data
        })
    }
  }
}
</script>

<style scoped>
table { width: 100%; }
thead tr { background-color: #eee; }
thead th { text-align: left; }
thead th, tbody td { padding: 0.5em; }
</style>
