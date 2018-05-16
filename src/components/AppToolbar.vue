<template>
  <v-toolbar
    dense
    dark 
    color="primary"
  >
    <v-toolbar-side-icon
      :disabled="leftBtn.disabled"
      @click.native="leftBtn.action">
      <v-icon>{{ leftBtn.icon }}</v-icon>
    </v-toolbar-side-icon>

    <v-spacer />

    <v-toolbar-title>ProdSaver</v-toolbar-title>

    <v-spacer />

    <v-toolbar-side-icon
      :disabled="rightBtn.disabled"
      @click.native="rightBtn.action">
      <v-icon>{{ rightBtn.icon }}</v-icon>
    </v-toolbar-side-icon>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  components: {},
  computed: {
    leftBtn() {
      if (this.previousIconVisible) {
        return {
          disabled: false,
          action: this.rulesPage,
          icon: 'chevron_left',
        };
      }
      return {
        disabled: true,
        action: null,
        icon: '',
      };
    },
    rightBtn() {
      if (this.saveIconVisible) {
        return {
          disabled: false,
          action: this.saveRule,
          icon: 'done',
        };
      }
      if (this.addIconVisible) {
        return {
          disabled: false,
          action: this.newRule,
          icon: 'add',
        };
      }
      return {
        disabled: true,
        action: null,
        icon: '',
      };
    },
    previousIconVisible() {
      return this.$route.path !== '/';
    },
    saveIconVisible() {
      return this.$store.getters.pendingModifications;
    },
    addIconVisible() {
      return this.$route.path === '/';
    },
  },
  methods: {
    rulesPage() {
      this.$router.push({ name: 'Rules' });
    },
    saveRule() {
      this.$store.dispatch('saveRule', {
        ...this.$store.getters.pendingModifications,
        new: false,
      });
      this.$store.dispatch('updatePendingModifications', false);
      this.$router.push({ name: 'Rules' });
    },
    newRule() {
      const rule = this.$store.getters.rule();
      this.$store.dispatch('saveRule', rule);
      this.$router.push({ name: 'EditRule', params: { id: rule.id } });
    },
  },
};
</script>
