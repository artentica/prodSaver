<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="90%"
    >
      <v-card>
        <v-card-title>
          <div class="title">Before you leave...</div>
        </v-card-title>
        <v-card-text>
          <p>You have pending modifications. What do you want to do?</p>
        </v-card-text>
        <v-card-actions class="centered">
          <v-btn
            small
            color="error"
            @click.native="discardChanged"
          >Discard</v-btn>
          <v-btn
            small
            color="info"
            @click.native="saveChanges"
          >Save</v-btn>
        </v-card-actions>
        <v-card-actions class="centered">
          <v-btn
            flat
            small
            color="info"
            class="preserve-case"
            @click.native="stayHere"
          >
            Or stay here
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'UnsavedRuleDialog',
  computed: {
    showDialog: {
      get: function() {
        return this.$store.state.unsavedRuleDialog.visible;
      },
      set: function(newValue) {
        this.$store.state.unsavedRuleDialog.visible = newValue;
      },
    },
  },
  methods: {
    stayHere() {
      this.$store.dispatch('hideUnsavedRuleDialog');
    },
    discardChanged() {
      this.$store.dispatch('discardUnsavedRule');
    },
    saveChanges() {
      this.$store.dispatch('saveUnsavedRule');
    },
  },
};
</script>

<style scoped lang="scss">
.centered {
  justify-content: center;
}
.preserve-case {
  text-transform: none;
}
</style>
