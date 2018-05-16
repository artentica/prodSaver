<template>
  <v-app>
    <div id="app">
      <AppToolbar/>
      <router-view/>
      <UnsavedRuleDialog />
    </div>
  </v-app>
</template>

<script>
import AppToolbar from './components/AppToolbar.vue';
import UnsavedRuleDialog from './components/UnsavedRuleDialog.vue';

export default {
  name: 'App',
  components: { AppToolbar, UnsavedRuleDialog },
  created() {
    this.$store.dispatch('loadSettings', () => {
      // If a rule was being edited right before closing the popup
      // or if a new, unedited rule was open, reopen that rule
      const pendingRule = this.$store.getters.pendingModifications;
      const newRule = this.$store.getters.rules.find(r => r.new);

      const rule = pendingRule ? pendingRule : newRule;

      if (rule) {
        this.$router.push({
          name: 'EditRule',
          params: {
            id: rule.id,
            restoredSavedRule: rule,
          },
        });
      }
    });
  },
};
</script>

<style lang="scss">
body {
  /*
   * Setting a fixed `width` produces an unwanted right margin
   * in the extension popup, so we use `min-width`.
   * `max-width` is set for in-browser development.
   */
  min-width: 350px;
  max-width: 380px;

  .application--wrap {
    min-height: auto;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
}
</style>
