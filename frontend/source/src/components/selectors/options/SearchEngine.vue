<template>
  <v-flex
    class="pl-0 pr-0 mt-3"
    xs12
    md10>
    <v-combobox
      height="46px"
      v-model="searchEngine"
      :items="items"
      label="Kereső optimalizáció"
      multiple
      chips
      outlined>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${hexToRgbA(item.color)}`"
          :input-value="selected"
          label
          small>
          <span class="pr-2" v-text="item.text"></span>
          <v-icon
            small
            @click="remove(item, selected)">
            mdi-close
          </v-icon>
        </v-chip>
      </template>
    </v-combobox>
  </v-flex>
</template>

<style>
  .v-chip--label {
    margin-left: 4px;
  }
</style>

<script>

export default {
  name: 'SearchEngine',
  data: () => ({
    activator: null,
    attach: null,
    editing: null,
    editingIndex: -1,
    items: [],
    nonce: 1,
    menu: false,
    searchEngine: [],
  }),
  watch: {
    searchEngine(val, prev) {
      if (this.searchEngine.length !== 0) {
        if (val.length === prev.length) return

        this.searchEngine.forEach((element, index) => {
          if (val[0] === element.text) {
            return;
          }
        })

        this.searchEngine = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: `#${this.makeColor()}`,
            }
            this.items.push(v)

            this.$set(this.article, 'labels', this.items)

            this.nonce++
          }
          return v
        })
      }
    },
  },
  methods: {
    makeColor(length) {
      return Math.floor(Math.random() * 16777215).toString(16);
    },
    hexToRgbA(hex){
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      return `rgba(${r}, ${g}, ${b}, .7)`;
    },
    remove(item) {
      this.searchEngine.forEach((element, index) => {
        if (item.text === element.text) {
          this.searchEngine.splice(index, 1);
        }
      });
      this.items.forEach((element, index) => {
        if (item.text === element.text) {
          this.items.splice(index, 1);
        }
      });
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
        this.$set(this.items, index, this.editing);

      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
  },
};
</script>