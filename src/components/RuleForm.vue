<template>
  <div>
    <v-flex 
      xs10 
      offset-xs1>
      <h2>{{ ruleTitle }}</h2>
      <v-text-field
        name="RuleName"
        label="Rule name"
        v-model="rule.name"
      />
    </v-flex>
    <v-flex 
      xs10 
      offset-xs1>
      <v-text-field
        name="URLPattern"
        label="Url pattern to match (Regex)"
        v-model="rule.pattern"
      />
    </v-flex>
    <v-flex 
      xs10 
      offset-xs1>
      <select-chips 
        :chips="methodsList" 
        v-model="rule.methods" />
    </v-flex>
    <v-divider/>

    <v-flex 
      xs10 
      offset-xs1>
      <v-text-field
        name="bannerLabel"
        label="banner label"
        v-model="rule.banner.label"
      />
    </v-flex>
    <v-flex 
      xs10 
      offset-xs1>
      <color-picker 
        v-model="rule.banner.color"/>
    </v-flex>

    <v-flex 
      xs10 
      offset-xs1>
      <v-select
        :items="bannerTypes"
        v-model="rule.banner.type"
        label="banner type"
        single-line
      />
    </v-flex>    

    <v-flex 
      xs10 
      offset-xs1>
      <v-select
        :items="bannerPositionsAvailable"
        v-model="rule.banner.position"
        label="banner position"
        single-line
      />
    </v-flex>    
    
    <v-container>
      <v-layout 
        row 
        wrap>
        <v-btn @click="cancel">Annuler</v-btn>
        <v-spacer/>
        <v-btn
          dark 
          color="primary"
          @click="save">Enregistrer</v-btn>
      </v-layout>
    </v-container>
  </div>
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

    if (this.restoredSavedRule === null) {
      this.savedRule = _.cloneDeep(this.rule);
    } else {
      this.savedRule = _.cloneDeep(this.restoredSavedRule);
    }

    this.bannerTypes = this.$store.getters.bannerTypes.map(el => {
      return el.type;
    });

    this.methodsList = this.$store.getters.methodsList;
  },
  methods: {
    cancel() {
      this.rule = _.cloneDeep(this.savedRule);
      // We need to trigger saveRule because the rule watch handler
      // does not have time to do it before leaving the route
      this.$store.dispatch('saveRule', this.rule);
      this.$store.dispatch('updatePendingModifications', false);
      router.push({ name: 'Rules' });
    },
    save() {
      this.rule.new = false;
      this.savedRule = _.cloneDeep(this.rule);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
