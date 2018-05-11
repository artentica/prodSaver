<template>
  <v-layout 
    row 
    wrap>
    <v-flex class="mr-2">
      <v-text-field 
        :name="name"
        :label="label"
        class="form-control" 
        v-model="colorValue" 
        @focus="showPicker()" 
        @input="updateFromInput"
        @mousedown.stop />
    </v-flex>
    <div
      style="width:24px">
      <span 
        class="current-color" 
        :style="'background-color: ' + colorValue" 
        @mousedown.stop="togglePicker()"/>
    </div>
    <chrome-picker 
      ref="colorpicker"
      :value="colors" 
      @input="updateFromPicker" 
      v-if="displayPicker" />
  </v-layout>
</template>

<script>
import { Chrome } from 'vue-color';
export default {
  name: 'ColorPicker',
  components: {
    'chrome-picker': Chrome,
  },
  props: {
    color: { type: String, default: '' },
    name: { type: String, default: 'colorPicker' },
    label: { type: String, default: 'Banner color' },
    value: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      colors: {
        hex: '#000000',
      },
      colorValue: '',
      displayPicker: false,
    };
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.$emit('input', val);
      }
    },
  },
  mounted() {
    this.setColor(this.value || '#000000');
  },
  methods: {
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == '#') {
        this.colors = {
          hex: color,
        };
      } else if (color.slice(0, 4) == 'rgba') {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(','),
          hex =
            '#' +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3],
        };
      }
    },
    showPicker() {
      document.addEventListener('mousedown', this.documentMouseDown);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener('mousedown', this.documentMouseDown);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          'rgba(' +
          color.rgba.r +
          ', ' +
          color.rgba.g +
          ', ' +
          color.rgba.b +
          ', ' +
          color.rgba.a +
          ')';
      }
    },
    documentMouseDown(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== undefined && el.$el !== target && !el.$el.contains(target)) {
        this.hidePicker();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.current-color {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #000;
  cursor: pointer;
  margin-top: 24px;
}
</style>
