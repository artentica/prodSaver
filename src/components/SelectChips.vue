<template>
  <v-select
    label="Request methods to catch"
    :items="chips"
    v-model="chipsSelect"
    multiple
    chips
    max-height="auto"
    autocomplete
  >
    <template 
      slot="selection" 
      slot-scope="data">
      <v-chip
        close
        small
        @input="data.parent.selectItem(data.item)"
        :selected="data.selected"
        class="chip--select-multi"
        :key="JSON.stringify(data.item)"
      >
        {{ data.item }}
      </v-chip>
    </template>
    <template 
      slot="item" 
      slot-scope="data">
      <v-list-tile-content>
        <v-list-tile-title v-html="data.item"/>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

     <script>
export default {
  name: 'SelectChips',
  props: {
    chips: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chipsSelect: this.value,
    };
  },
  watch: {
    chipsSelect(val) {
      this.$emit('input', val);
    },
  },
};
</script>
