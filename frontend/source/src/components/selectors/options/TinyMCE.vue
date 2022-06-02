<template>
  <div>
    <tinymce
      :id="id"
      v-model="$store.state.blog.post"
      :other_options="options"
      :readonly="readonly" />
    <div
      id="articleData"
      style="visibility: hidden"
      data-count="0" />
      <input id="image" type="file" name="image" class="d-none" @change="onFileChanged" />
  </div>
</template>

<style lang='scss'>
figure.image {
    width: 100%;
    display: inline-block;
    background: black;
    text-align: center;
    margin: 0 !important;
}

figure.image figcaption {
    display: block !important;
}

.small-image {
    width: 100% !important;
    height: 400px !important;
    object-fit: contain;
}

.large-image {
    width: 100% !important;
    height: 400px !important;
    object-fit: cover;
}
</style>

<script>

import tinymce from 'vue-tinymce-editor';

export default {
  name: 'TinyMCE',
  components: {
    tinymce,
  },
  props: {
    description: String,
    id: String,
    height: String,
    article: Object,
    images: Object,
  },
  data() {
    return {
      readonly: false,
      valid: false,
      pictureCount: 1,
      options: {
        valid_elements: '*[*]',
        language_url: `https://cdn.jsdelivr.net/npm/tinymce-lang/langs/hu_HU.js`,
        height: parseInt(this.height),
  menubar: "tools",
  toolbar: "spellchecker | language",
        //menubar: false,
        link_class_list: [{
          title: 'None',
          value: 'article-link',
        }],
        paste_data_images: true,
        spellchecker_language: 'hu',
        spellchecker_callback: function(method, text, success, failure) {
          console.log('----', text);
    var words = text.match(this.getWordCharPattern());
     console.log('--words--', words);
    if (method == "spellcheck" && words) {
      var suggestions = {};
      for (var i = 0; i < words.length; i++) {
        suggestions[words[i]] = ["modositas", "Second"];
      }
      success(suggestions);
    }
  },
        plugins: [
          'image',
          'link anchor pagebreak',
          'searchreplace wordcount fullscreen',
          'template paste textpattern',
          'media',
          'preview',
          'spellchecker',
        ],
        toolbar1: 'undo redo | bold italic | link image | blockquote | styleselect | media | preview',
        style_formats: [
          {
            title: 'Szerző',
            inline: 'cite'
          },
          {
            title: 'Spoiler',
            inline: 'span',
            classes: 'spoiler-alert',
          },
        ],
        image_advtab: false,
        image_description: true,
        image_title: true,
        image_caption: true,
        object_resizing: false,
        image_dimensions: false,
        media_dimensions: false,
        file_picker_types: 'image',
        file_picker_callback: function(cb, value, meta) {
          const article = document.querySelector('#articleData');
          const input = document.getElementById('image');
          let count = parseInt(article.dataset.count);

          if (meta.filetype == 'image') {
            input.click();
            input.onchange = function () {
              const file = input.files[0];
              const reader = new FileReader();
              reader.onload = function (e) {
                  count++;
                  article.setAttribute('data-count', count.toString());
                  cb(e.target.result, {
                    alt: ''
                  });
              };
              reader.readAsDataURL(file);
            };
          }
        },
        setup: function(editor) {
          editor.on('NodeChange', function(e) {
            const article = document.querySelector('#articleData');
            const count = parseInt(article.dataset.count);
            if (e.element.tagName === 'IMG') {
              e.element.setAttribute('data-image-count', count);
              e.element.setAttribute('width', '100%');
              e.element.setAttribute('height', '400px');
            }
          });
        },
        video_template_callback: function(data) {
          console.log('video', data);
          return `
            <iframe
              src="https://player.twitch.tv?video=1260324936&parent=localhost&autoplay=false"
              height="720"
              width="100%"
              allowfullscreen="true">
            </iframe>`;
        },
      },
    }
  },
  methods: {
    onFileChanged(e) {
      this.images.pictures.push({
        file: e.target.files[0],
        filename: this.pictureCount++,
      });

      console.log('this.images.pictures', this.images.pictures)
    },
  },
};
</script>