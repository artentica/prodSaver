<template>
  <div class="home">
    <v-container>
      <v-layout 
        row 
        wrap>
        <h2>Rules</h2>
        <v-spacer/>
        <v-btn 
          @click="newRule"
          icon
          slot="activator"
          color="primary">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
      <v-layout 
        row 
        wrap>
        <v-flex 
          xs12
          v-if="!this.$store.getters.rulesLength"
          class="empty">
          <v-icon large>edit</v-icon>
          <p class="h5">You have no rules.</p>
          <p>Click the button to create your first rule</p>
          <v-btn 
            @click="newRule"
            slot="activator"
            color="primary">
            <v-icon>add</v-icon>
            Create a rule
          </v-btn>
        </v-flex>
        <rule-card 
          v-else
          v-for="rule in $store.getters.rules" 
          :key="rule.id"
          :id="rule.id"
          :name="rule.name" 
          :pattern="rule.pattern"
          :methods="rule.methods"
          :enabled="rule.enabled"
        />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import RuleCard from '@/components/RuleCard.vue';
import router from '../router';

export default {
  name: 'Rules',
  components: {
    RuleCard,
  },
  methods: {
    newRule() {
      const rule = this.$store.getters.rule();
      this.$store.dispatch('saveRule', rule);
      router.push({ name: 'EditRule', params: { id: rule.id } });
    },
  },
};
</script>

<style scoped lang="scss">
.empty {
  padding: 3.2rem 1.6rem;
  text-align: center;
}
</style>
