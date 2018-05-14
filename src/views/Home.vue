<template>
  <v-container class="pa-0 ma-0">
    <v-layout class="px-0 mx-3 my-2">
      <h2>Rules</h2>
    </v-layout>
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs12
        v-if="!this.$store.getters.rulesLength"
        class="text-xs-center mb-5">
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

    <HomeFooter />
  </v-container>
</template>

<script>
import RuleCard from '@/components/RuleCard.vue';
import HomeFooter from '@/components/HomeFooter.vue';

export default {
  name: 'Rules',
  components: {
    RuleCard,
    HomeFooter,
  },
  methods: {
    newRule() {
      const rule = this.$store.getters.rule();
      this.$store.dispatch('saveRule', rule);
      this.$router.push({ name: 'EditRule', params: { id: rule.id } });
    },
  },
};
</script>
