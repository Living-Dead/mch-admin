<template>
  <div class="pt-3">
    <v-row>
      <v-col cols="10">
        <v-file-input
          multiple
          outlined
          show-size
          label="Select Image"
          accept="image/*"
          @change="selectImage"
          hide-details
        ></v-file-input>
      </v-col>
    </v-row>

    <div v-if="progress">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive>
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-layout v-if="previewImages.length !== 0">
      <v-flex
        v-for="(item, index) in previewImages"
        v-bind:key="index"
        style="flex: 0 0 auto;">
        <img
          class="preview my-3"
          :src="item"
          :alt="currentImage[index].name"
          width="100"
          height="100" />
      </v-flex>
    </v-layout>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

    <v-card v-if="imageInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Images</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(image, index) in imageInfos" :key="index">
            <a :href="image.url">{{ image.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import UploadService from "@/services/uploadFiles.service";

export default {
  name: 'UploadImage',
  data() {
    return {
      currentImages: [],
      previewImages: [],

      progress: 0,
      message: null,

      imageInfos: []
    }
  },
  methods: {
    selectImage(images) {
      console.log('image', images)
      /*images.forEach((image) => {
        this.currentImage.push(image)
      });*/
      this.currentImage = [];

      images.forEach((currentImage, index) => {
        console.log('currentImage', currentImage);
        const renamedFile = new File([currentImage], `${index + 1}${currentImage.type.replace('image/', '.')}`);
        console.log('myRenamedFile', renamedFile);
        this.currentImage.push(renamedFile);
        this.previewImages.push(URL.createObjectURL(renamedFile));
      });

      
      this.progress = 0;
      this.message = null;
    },
    upload() {
      if (!this.currentImage) {
        this.message = "Please select an Image!";
        return;
      }

      this.progress = 0;

      UploadService.upload(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });
    },
  }
};
</script>