<template>
  <div>
    <v-flex
      xs12
      sm6
      class="pl-0 pr-0">
      <v-text-field
        v-model="$store.state.blog.title"
        :rules="[v => !!v || 'A mező kitöltése kötelező!']"
        label="Cím"
        outlined
        hide-details />
    </v-flex>
    <v-flex
      xs12
      sm6
      class="pl-0 pr-0">
      <v-textarea
        v-model="$store.state.blog.intro"
        :rules="[v => !!v || 'A mező kitöltése kötelező!']"
        label="Bevezető"
        outlined
        no-resize
        hide-details />
    </v-flex>
    <v-flex
      xs12
      sm6
      class="pl-0 pr-0">
      <v-text-field
        v-model="selectedCoverName"
        :rules="[v => !!v || 'A mező kitöltése kötelező!']"
        label="Borítókép"
        outlined
        clearable
        hide-details
        @focus="onFileSelecting"
        @click:clear="clear()" />
      <input
        ref="uploader"
        type="file"
        class="d-none"
        @change="onFileChanged">
    </v-flex>
  </div>
</template>

<script>

export default {
  name: 'Default',
  props: {
    article: Object,
    images: Object,
  },
  data() {
    return {
      selectedCoverName: '',
    }
  },
  methods: {
    onFileSelecting() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        const input = this.$refs.uploader;
        input.type = 'text';
        input.type = 'file';
        this.images.cover = {};
        this.selectedCoverName = '';
      } else {
        this.images.cover = {
          file: e.target.files[0],
          type: 'cover',
        };
        this.selectedCoverName = `${e.target.files[0].name} (${this.bytesToSize(e.target.files[0].size)})`;
      }
    },
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    clear() {
      const input = this.$refs.uploader;
      input.type = 'text';
      input.type = 'file';
      this.images.cover = {};
      this.selectedCoverName = '';
    },
  },
};
</script>