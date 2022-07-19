<template>
  <v-flex
    class="pl-0 pr-0 mt-3"
    xs12
    md10>

    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="$store.state.blog.searchEngine"
      :search-input.sync="search"
      hide-selected
      label="Search for an option"
      multiple
      small-chips
      outlined
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading"> Hozzáad: </span>
          <v-chip
            :color="`${hexToRgbA(colors[nonce - 1])}`"
            label
            small
            @click="addSearch(search, colors[nonce - 1])"
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${hexToRgbA(item.color)}`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon
            small
            @click="parent.selectItem(item)"
          >
            $delete
          </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip
          v-else
          :color="`${hexToRgbA(item.color)}`"
          dark
          label
          small
        >
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn
            icon
            @click.stop.prevent="edit(index, item)"
          >
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
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
    colors: [],
    attach: null,
    editing: null,
    editingIndex: -1,
    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0,
  }),
  mounted() {
    this.makeColor();
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }

          this.$store.state.blog.searchEngine.push(v)

          this.nonce++
        }

        return v
      })
    },
  },
  methods: {
    addSearch(value, color) {
      console.log('value, color', value, color);
      this.$store.state.blog.searchEngine.push({
        text: value,
        color: color,
      });
      this.nonce++
      this.search = null;
    },
    makeColor() {
      for (let i = 0; i < 30; i++) {
        this.colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      }
    },
    hexToRgbA(hex) {
      if (hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, .7)`;
      }
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
  },
};
</script>