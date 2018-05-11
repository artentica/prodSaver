<template>
  <v-container class="pa-0 ma-0">

    <v-layout 
      class="px-0 mx-3 my-2"
    >
      <h2>{{ ruleTitle }}</h2>
    </v-layout>

    <v-layout
      column
      class="mx-3"
    >
      <v-flex>
        <v-text-field
          name="RuleName"
          label="Rule name"
          v-model="rule.name"
        />
      </v-flex>
      <v-flex>
        <v-text-field
          name="URLPattern"
          label="Url pattern to match (Regex)"
          v-model="rule.pattern"
        />
      </v-flex>
      <v-flex>
        <select-chips 
          :chips="methodsList" 
          v-model="rule.methods" />
      </v-flex>

      <v-divider/>

      <v-flex>
        <v-text-field
          name="bannerLabel"
          label="Banner label"
          v-model="rule.banner.label"
        />
        <color-picker 
          v-model="rule.banner.color"/>
      </v-flex>
    </v-layout>

    <v-layout
      class="mx-3"
      row 
      wrap>
      <v-flex class="mr-4">
        <v-select
          :items="bannerTypes"
          v-model="rule.banner.type"
          label="Banner type"
        />
      </v-flex>    
      <v-flex>
        <v-select
          :items="bannerPositionsAvailable"
          v-model="rule.banner.position"
          label="Banner position"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash';
import ColorPicker from '@/components/ColorPicker.vue';
import SelectChips from '@/components/SelectChips.vue';
import router from '../router';

export default {
  name: 'RuleForm',
  components: {
    ColorPicker,
    SelectChips,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    restoredSavedRule: {
      type: Object,
      default: null,
    },
  },
  data: function() {
    return {
      rule: _.cloneDeep(this.$store.getters.defaultRule),
      bannerTypes: [],
      methodsList: [],
    };
  },
  computed: {
    ruleTitle: function() {
      return this.rule.new ? 'New Rule' : 'Rule modification';
    },
    bannerPositionsAvailable: function() {
      const bannerType = this.$store.getters.bannerType(this.rule.banner.type);
      return bannerType.positionsAvailable;
    },
  },
  watch: {
    rule: {
      handler: function() {
        this.$store.dispatch('saveRule', this.rule);
        if (!_.isEqual(this.rule, this.savedRule)) {
          this.$store.dispatch('updatePendingModifications', this.rule);
        }
      },
      deep: true,
    },
    bannerPositionsAvailable: {
      handler(newList, oldList) {
        if (
          !_.isEqual(newList, oldList) &&
          !newList.includes(this.rule.banner.position)
        ) {
          this.rule.banner.position = newList[0];
        }
      },
      deep: true,
    },
  },
  created: function() {
    this.rule = this.$store.getters.rule(this.id);
    this.savedRule = _.cloneDeep(
      this.restoredSavedRule === null ? this.rule : this.restoredSavedRule,
    );

    this.bannerTypes = this.$store.getters.bannerTypes.map(el => {
      return el.type;
    });

    this.methodsList = this.$store.getters.methodsList;
  },
  methods: {
    cancel() {
      this.rule = _.cloneDeep(this.savedRule);
      this.applyChanges();
    },
    save() {
      this.rule.new = false;
      this.savedRule = _.cloneDeep(this.rule);
      this.applyChanges();
    },
    applyChanges() {
      // We need to trigger saveRule because the rule watch handler
      // does not have time to do it before leaving the route
      this.$store.dispatch('saveRule', this.rule);
      this.$store.dispatch('updatePendingModifications', false);
      router.push({ name: 'Rules' });
    },
  },
  beforeRouteLeave(to, from, next) {
    // If there is no difference between rule and savedRule
    // (the rule has been saved, or no change was made)
    if (_.isEqual(this.rule, this.savedRule)) {
      // If the rule is new, remove it
      if (this.rule.new) {
        this.$store.dispatch('removeRule', this.rule.id);
      }
      next();
      // Else, if changes were saved using the top bar button
    } else if (!this.$store.getters.pendingModifications) {
      next();
      // Else, if changes were made and not saved
    } else {
      this.$store.dispatch('showUnsavedRuleDialog', {
        cancel: this.cancel,
        save: this.save,
      });
    }
  },
};
</script>
