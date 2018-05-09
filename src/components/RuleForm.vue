<template>
  <div>
    <h2>{{ ruleTitle }}</h2>
    <v-flex 
      xs10 
      offset-xs1>
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
        name="bannerName"
        label="banner name"
        v-model="rule.banner.name"
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
        :items="bannerType"
        v-model="rule.banner.type"
        label="banner type"
        single-line
      />
    </v-flex>    

    <v-flex 
      xs10 
      offset-xs1>
      <v-select
        :items="bannerPosition"
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
  },
  data: function() {
    return {
      rule: {
        enabled: true,
        name: '',
        pattern: '',
        methods: [],
        banner: {
          name: '',
          type: '',
          position: '',
          color: '',
        },
      },
      bannerType: [],
      methodsList: [],
    };
  },
  computed: {
    ruleTitle: function() {
      return this.rule.new ? 'New Rule' : 'Rule modification';
    },
    bannerPosition: function() {
      const banners = this.$store.getters.banner;
      let index = banners.findIndex(el => {
        return this.rule.banner.type === el.type;
      });
      return banners[index].position;
    },
  },
  watch: {
    rule: {
      handler: function() {
        this.$store.dispatch('updateBackend', this.id);
      },
      deep: true,
    },
  },
  created: function() {
    this.rule = this.$store.getters.rule(this.id);
    this.savedRule = Object.assign({}, this.savedRule, this.rule);

    this.bannerType = this.$store.getters.banner.map(el => {
      return el.type;
    });

    this.methodsList = this.$store.getters.methodsList;
  },
  methods: {
    cancel() {
      if (this.rule.new) this.$store.dispatch('removeRule', this.rule.id);
      else this.$store.dispatch('saveRule', this.savedRule);
      router.push({ name: 'Rules' });
    },
    save() {
      router.push({ name: 'Rules' });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.rule.new = false;
    next();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
