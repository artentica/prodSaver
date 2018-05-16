<template>
  <v-footer class="py-4">
    <v-menu 
      transition="slide-y-transition"
      top>
      <v-btn 
        slot="activator">
        <img
          :src="require(`@/assets/img/${this.$store.getters.langChosen}.png`)" 
        >
      </v-btn>
      <v-list>
        <v-list-tile 
          v-for="lang in langs" 
          :key="lang"
          @click="changeLanguage(lang)">
          <img
            :src="require(`@/assets/img/${lang}.png`)" 
          >     
          <v-list-tile-title>{{ lang }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>        
  </v-footer>
</template>

<script>
export default {
  name: 'HomeFooter',
  components: {},
  computed: {
    langs: function() {
      return this.$store.getters.langsAvailable;
    },
  },
  methods: {
    changeLanguage(lang) {
      this.$store.dispatch('changeLanguage', lang);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu__activator {
  img {
    width: 32px;
  }
}
.list {
  img {
    width: 32px;
  }
  img ~ .list__tile__title {
    padding-left: 7px;
  }
}
</style>
