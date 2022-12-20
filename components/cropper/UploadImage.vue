<template>

  <div>
    <div class="relative w-full flex mb-2">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          class="w-5 h-5 text-gray-500 dark:text-gray-400" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
      </div>
      <input type="url" v-model="url"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Đường dẫn hình ảnh (url)" required>
      <button @click.prevent="loadImageFromUrl"
        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tải ảnh</button>
    </div>
    <div class="flex flex-col md:flex-row md:items-stretch gap-2">
      <div class="md:basis-1/3">
        <div class="flex items-center justify-center w-full h-full" draggable="true" @drop.prevent="onDrop"
          @dragover.prevent="$refs.dropzone.classList.add('border-primary-700')"
          @dragleave.prevent="$refs.dropzone.classList.remove('border-primary-700')">
          <label for="dropzone-file" ref="dropzone"
            class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="md-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Nhấn để tải
                  lên</span>
                hoặc kéo và thả</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">(Tối thiểu 800x800, Tối đa: 15MB)</p>
            </div>
            <input id="dropzone-file" ref="file" type="file" class="hidden" accept="image/*" @change="loadImage($event)"
              @click="$event.target.value = null" />
          </label>
        </div>
      </div>
      <div class="md:basis-2/3 md:flex md:items-center object-cover min-h-0 min-w-0">
        <div
          class="relative rounded-lg md:max-w-full h-full md:flex-1 max-h-[300px] md:min-h-[300px] border-2 border-gray-300">
          <label v-if="!image.src"
            class="flex flex-col items-center justify-center w-full h-full rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-10 h-10 mb-3 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Khu vực xem
                  trước</span>
                và chỉnh sửa ảnh</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Tỉ lệ khung hình ảnh 1:1</p>
            </div>
          </label>
          <cropper v-else ref="cropper" class="object-cover h-full w-full" backgroundClass="rounded-lg bg-white"
            foregroundClass="rounded-lg bg-white" :stencil-props="{
              aspectRatio: 1 / 1,
            }" check-orientation :src="image.src" />
          <CropperComponentsVerticalButtons v-if="image.src">
            <CropperComponentsSquareButton title="Flip Horizontal" @click="flip(true, false)">
              <img
                src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cline fill='%23FFFFFF' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' x1='8' y1='1' x2='8' y2='14.9'/%3E%3Cg%3E%3Cg%3E%3Cline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' x1='11.5' y1='12.8' x2='12' y2='12.8'/%3E%3Cpolyline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' points='14.2,12.8 14.7,12.8 14.7,12.3 '/%3E%3Cline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' stroke-dasharray='0.8091,2.4273' x1='14.7' y1='9.9' x2='14.7' y2='4.6'/%3E%3Cpolyline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' points='14.7,3.4 14.7,2.9 14.2,2.9 '/%3E%3Cline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' x1='12' y1='2.9' x2='11.5' y2='2.9'/%3E%3C/g%3E%3C/g%3E%3Cpolyline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linejoin='round' stroke-miterlimit='10' points='4.5,2.9 1.3,2.9 1.3,12.8 4.5,12.8 '/%3E%3C/svg%3E%0A" />
            </CropperComponentsSquareButton>
            <CropperComponentsSquareButton title="Flip Vertical" @click="flip(false, true)">
              <img
                src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cline fill='%23FFFFFF' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' x1='15' y1='8' x2='1' y2='8'/%3E%3Cg%3E%3Cg%3E%3Cline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' x1='3.2' y1='11.5' x2='3.2' y2='12'/%3E%3Cpolyline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' points='3.2,14.2 3.2,14.7 3.7,14.7 '/%3E%3Cline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' stroke-dasharray='0.8091,2.4273' x1='6.1' y1='14.7' x2='11.4' y2='14.7'/%3E%3Cpolyline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' points='12.6,14.7 13.1,14.7 13.1,14.2 '/%3E%3Cline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' x1='13.1' y1='12' x2='13.1' y2='11.5'/%3E%3C/g%3E%3C/g%3E%3Cpolyline fill='none' stroke='%23FFFFFF' stroke-width='1.5' stroke-linejoin='round' stroke-miterlimit='10' points='13.1,4.4 13.1,1.3 3.2,1.3 3.2,4.4 '/%3E%3C/svg%3E%0A" />
            </CropperComponentsSquareButton>
            <CropperComponentsSquareButton title="Rotate Clockwise" @click="rotate(90)">
              <img
                src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg enable-background='new '%3E%3Cpath fill='%23FFFFFF' d='M1.5,8c0-3.7,3-6.5,6.5-6.5c1.7,0,3.3,0.7,4.5,1.8l1.1-1.1c0.1-0.1,0.4-0.1,0.6-0.1 c0.1,0.1,0.3,0.3,0.3,0.6v3.8c0,0.3-0.3,0.6-0.6,0.6h-3.8C10,6.9,9.8,6.7,9.7,6.6C9.6,6.4,9.7,6.2,9.8,6L11,4.9 C10.1,4,9.1,3.6,8,3.6c-2.4,0-4.4,2-4.4,4.4s2,4.4,4.4,4.4c1.4,0,2.5-0.6,3.4-1.7l0.1-0.1c0.1,0,0.1,0,0.3,0.1l1.1,1.1 c0.1,0.1,0.1,0.3,0,0.4c-1.1,1.4-3,2.3-4.9,2.3C4.3,14.5,1.5,11.7,1.5,8z'/%3E%3C/g%3E%3C/svg%3E%0A" />
            </CropperComponentsSquareButton>
            <CropperComponentsSquareButton title="Rotate Counter-Clockwise" @click="rotate(-90)">
              <img
                src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg enable-background='new '%3E%3Cpath fill='%23FFFFFF' d='M8,14.5c-2,0-3.8-0.8-5.1-2.4c-0.1-0.1-0.1-0.3,0-0.4l1.1-1.1c0,0,0.1-0.1,0.3-0.1c0.1,0,0.1,0,0.1,0.1 c1,1.3,2.1,1.8,3.5,1.8c2.4,0,4.4-2,4.4-4.4s-2-4.4-4.4-4.4c-1.1,0-2.1,0.4-3,1.1l1.1,1.1c0.1,0.3,0.3,0.4,0.1,0.7 C6.2,6.7,6.1,6.9,5.9,6.9H2c-0.3,0-0.6-0.3-0.6-0.6V2.5c0-0.3,0.1-0.4,0.3-0.6c0.1-0.1,0.4,0,0.6,0.1l1.1,1.1 c1.3-1.1,2.8-1.8,4.5-1.8c3.7,0,6.5,3,6.5,6.5S11.7,14.5,8,14.5z'/%3E%3C/g%3E%3C/svg%3E%0A" />
            </CropperComponentsSquareButton>
            <CropperComponentsSquareButton title="Hủy bỏ" @click="reset()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"
                stroke-width="2" stroke="currentColor">
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>

            </CropperComponentsSquareButton>
          </CropperComponentsVerticalButtons>
          <div class="absolute bottom-0 right-0 p-2">
            <!-- <button v-if="!image.src"
          class="flex items-center px-2 py-2 font-medium tracking-wide capitalize transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80 text-yellow-500"
          @click="$refs.file.click();">
          <input class="hidden" ref="file" type="file" accept="image/*" @change="loadImage($event)" />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>Upload image
        </button> -->
            <button type="button" v-if="image.src" @click="save()"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="mr-2 w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>

              Tải lên
            </button>

          </div>
          <div class="upload-area__file-type" v-if="image.type">
            Format: {{ image.type }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4 mb-1" v-if="progress">
      <span class="text-base font-medium text-blue-700 dark:text-white">Đang tải lên</span>
      <span class="text-sm font-medium text-blue-700 dark:text-white">{{ progress }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700" v-if="progress">
      <div class="bg-blue-600 h-2.5 rounded-full" :style="`width: ${progress}%`"></div>
    </div>

  </div>

</template>

<script>

// This function is used to detect the actual image type,
function getMimeType(file, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = '';
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16);
  }
  switch (header) {
    case '89504e47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg';
    default:
      return fallback;
  }
}
export default {
  data() {
    return {
      image: {
        src: null,
        type: null,
      },
      url: '',
    };
  },
  props: ['progress'],
  methods: {
    onDrop(e) {
      this.$refs.dropzone.classList.remove('border-primary-700')
      let files = e.dataTransfer.files
      if (files.length > 1) {
        this.$toast.global.myError({
          message: 'Vui lòng kéo thả tối đa 1 hình ảnh'
        })
        return
      }

      this.loadImage(e, true)

      // console.log(e.dataTransfer.files)
    },
    save() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas)
        this.$emit('save', { canvas: canvas, type: this.image.type }, () => {
          this.reset()
        });
      this.$emit('processingImage', false);

    },
    reset() {
      if (this.image.src) {
        URL.revokeObjectURL(this.image.src);
      }
      this.image = {
        src: null,
        type: null,
      };

      this.$emit('processingImage', false);

    },
    flip(x, y) {
      this.$refs.cropper.flip(x, y);
      // if (this.$refs.cropper.customImageTransforms.rotate % 180 !== 0) {
      //   this.$refs.cropper.flip(!x, !y);
      // } else {
      //   this.$refs.cropper.flip(x, y);
      // }
    },
    rotate(angle) {
      this.$refs.cropper.rotate(angle);
    },
    async loadImageFromUrl() {
      try {


        // let image = new Image();
        // let c = document.createElement("canvas");
        // image.crossOrigin = "Anonymous";
        // image.src = this.url;
        // image.onload(e) {
        //   c.toBlob(function (blob) {

        //   })
        // }

        const blob = await fetch(this.url).then(r => r.blob());

        console.log(blob)

        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }

        const src = URL.createObjectURL(blob);

        this.image = {
          src: src,
          type: blob.type
        };

        this.$emit('processingImage', true);
      }
      catch (e) {
        this.$toast.global.myError({
          message: "Đường dẫn (URL) không hợp lệ hoặc không được hỗ trợ"
        })
      }

    },
    loadImage(event, isDrop = false) {
      // Reference to the DOM input element

      const { files } = isDrop ? event.dataTransfer : event.target;
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);
        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }
        // Create a new FileReader to read this image binary data
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.image" refers to the image of Vue component
          this.image = {
            // Read image as base64 and set it as src:
            src: blob,
            // Determine the image type to preserve it during the extracting the image from canvas:
            type: getMimeType(e.target.result, files[0].type),
          };
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0]);

        this.$emit('processingImage', true);
      }
    },
  },
  destroyed() {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
};
</script>

<style>
.action-area {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.action-area input {
  display: none;
}

.upload-area {
  user-select: none;
}

.upload-area__cropper {
  min-height: 300px;
  max-height: 300px;
  width: 100%;
}

.upload-area__cropper-wrapper {
  position: relative;
}

.upload-area__file-type {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #0d0d0d;
  border-radius: 5px;
  padding: 0px 10px;
  padding-bottom: 2px;
  font-size: 12px;
  color: white;
}
</style>

