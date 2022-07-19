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
      data-image="0" />
      <input id="image" type="file" name="image" class="d-none" />
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
        link_class_list: [{
          title: 'None',
          value: 'article-link',
        }],
        content_css: false,
        //content_style: '',
        paste_data_images: false,
        plugins: [
          'image',
          'link anchor pagebreak',
          'searchreplace wordcount fullscreen',
          'template paste textpattern',
          'media instagram',
          'preview',
          'powerpaste',
        ],
        toolbar1: 'undo redo | bold italic | link image | blockquote | styleselect | media | preview | instagram',
        style_formats: [
          {
            title: 'Spoiler',
            inline: 'div',
            classes: 'mch-article-spoiler-alert',
          },
          {
            title: 'Képaláírás',
            inline: 'cite',
            classes: 'mch-article-cite'
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
          let count = parseInt(article.dataset.image);
          if (meta.filetype == 'image') {
            input.click();
            input.onchange = function () {
              const file = input.files[0];
              const reader = new FileReader();
              reader.onload = function (e) {
                  count++;
                  article.setAttribute('data-image', count.toString());
                  cb(e.target.result, {
                    alt: ''
                  });
              };
              reader.readAsDataURL(file);
            };
          }
        },
         media_url_resolver: function (data, resolve/*, reject*/) {
    if (data.url.indexOf('youtube') !== -1) {
      var embedHtml = '<iframe src="' + data.url +
      '" width="100%" height="720px" ></iframe>';
      resolve({html: embedHtml});
    } else {
      resolve({html: ''});
    }
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
            /*
            <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>*/
        },
        setup: function(editor) {
          editor.on('NodeChange', function(e) {
            const article = document.querySelector('#articleData');
            const count = parseInt(article.dataset.image);
            if (e.element.tagName === 'IMG') {
              e.element.setAttribute('data-image', count);
              e.element.setAttribute('width', '100%');
              e.element.setAttribute('height', '400px');
              e.element.setAttribute('style', 'object-fit: contain; background: black;');
            }
          });
          window.tinymce.PluginManager.add('instagram', function(editor, url) {
            // Add a button that opens a window
            editor.addButton('instagram', {
                icon: 'instagram-icon mdi mdi-instagram',
                tooltip: 'Instagram',
                onclick: function() {
                    // Open window
                    editor.windowManager.open({
                        title: 'Instagram Embed',
                        body: [
                            {   type: 'textbox',
                                size: 40,
                                height: '100px',
                                name: 'instagram',
                                label: 'instagram'
                            }
                        ],
                        onsubmit: function(e) {
                            // Insert content when the window form is submitted
                            var embedCode = e.data.instagram;
                            var script = embedCode.match(/<script.*<\/script>/)[0];
                            var scriptSrc = script.match(/".*\.js/)[0].split("\"")[1];
                            var sc = document.createElement("script");
                            sc.setAttribute("src", scriptSrc);
                            sc.setAttribute("type", "text/javascript");

                            var iframe = document.getElementById('instagram' + "_ifr");
                            var iframeHead = iframe.contentWindow.document.getElementsByTagName('head')[0];

                            tinyMCE.activeEditor.insertContent(e.data.instagram);
                            iframeHead.appendChild(sc);
                            // editor.insertContent('Title: ' + e.data.title);
                        }
                    });
                }
            });
          });
          window.tinymce.PluginManager.add('youtube', function(editor, url) {
            // Add a button that opens a window
            editor.addButton('youtube', {
                icon: 'instagram-icon mdi mdi-instagram',
                tooltip: 'Instagram',
                onclick: function() {
                    // Open window
                    editor.windowManager.open({
                        title: 'Youtube Embed',
                        body: [
                            {   type: 'textbox',
                                size: 40,
                                height: '100px',
                                name: 'youtube',
                                label: 'Youtube'
                            }
                        ],
                        onsubmit: function(e) {
                          console.log('youtube e', e)
                            /*
                            var ifrm = document.createElement('iframe');
ifrm.setAttribute('id', 'ifrm'); // assign an id

//document.body.appendChild(ifrm); // to place at end of document

// to place before another page element
var el = document.getElementById('marker');
el.parentNode.insertBefore(ifrm, el);

// assign url
ifrm.setAttribute('src', 'demo.html');
*/
                        }
                    });
                }
            });
        });
        }
      },
    }
  },
};
</script>