<template>
  <div class="container mx-auto px-4 lg:px-0">
    <!-- <Modal :show="state.success" :type="'success'" title="Thành công" @close="$router.push('/content/product')"
      @action="$router.push('/content/product')" />
    <ConfirmModal :loadingState="true" :show="state.confirm" question="Bạn có chắc muốn xóa sản phẩm này?"
      @close="state.confirm = false" @action="del" /> -->
    <CoolLightBox :items="clbItems" :index="clbIndex" @close="clbIndex = null">
    </CoolLightBox>
    <h1 class="text-4xl font-extrabold dark:text-white  mb-8">Sản phẩm</h1>
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-4xl px-4 mx-auto py-8">
        <div class="flex mb-4 justify-between items-canter">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Quản lí hình ảnh</h2>
          <SuperButton to="/content/product" text="Trở về" color="blue">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                clip-rule="evenodd" />
            </svg>
          </SuperButton>
        </div>

        <section v-if="!$fetchState.pending" class="flex bg-white dark:bg-gray-900">
          <div class="py-4">
            <h2 class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">Sản phẩm: {{
                product.name
            }}
            </h2>
            <p class="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">{{
                Intl.NumberFormat('vi-VN', {
                  style: 'currency', currency:
                    'VND'
                }).format(product.unit_price)
            }}</p>
            <dl class="flex items-center space-x-6">
              <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Danh mục</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{{ product.category.name }}</dd>
              </div>
              <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Số ảnh hiện tại</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{{ images.length }}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section v-else class="flex bg-white dark:bg-gray-900">
          <div class="py-4">
            <h2 class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">Sản phẩm: <div
                class="inline-flex animate-twPulse animate-infinite bg-gray-200 h-6 w-32  rounded-lg"></div>
            </h2>
            <p class="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">
            <div class="animate-twPulse animate-infinite bg-gray-200 h-6 w-32 rounded-lg"></div>
            </p>
            <dl class="flex items-center space-x-6">
              <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Danh mục</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                  <div class="animate-twPulse animate-infinite bg-gray-200 h-4 w-32 rounded-lg"></div>
                </dd>
              </div>
              <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Số ảnh hiện tại</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                  <div class="animate-twPulse animate-infinite bg-gray-200 h-4 w-32  rounded-lg"></div>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <div>
          <div class="flex flex-col gap-4 mb-4 sm:gap-6 sm:mb-5">
            <div class="flex flex-col gap-4 border border-primary-800 border-dashed rounded-lg p-3">
              <FormInput label="Độ ưu tiên" placeholder="(vd: 0,1,2,..) Mặc định là không có" inputType="number" v-model="priority">
                <template v-slot:helper>
                  Ảnh hưởng đến thứ tự các ảnh, giá trị càng nhỏ độ ưu tiên càng cao, nếu trùng giá trị thứ tự sẽ được
                  quyết định bởi thời gian ảnh được tạo, giá trị nhỏ nhất sẽ là hình ảnh chính của sản phẩm, tối thiểu là 0
                </template>
              </FormInput>
              <CropperUploadImage @save="upload" :progress="uploadProgress" />
            </div>


            <div class="overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 py-3">
              <div v-if="$fetchState.pending" class="flex gap-x-3 items-stretch flex-nowrap">
                <div class="relative" v-for="n in 5" :key="n">
                  <div class="bg-gray-200 rounded-lg h-32 w-32 animate-twPulse animate-infinite"></div>
                </div>
              </div>
              <div v-else class="flex gap-x-3 items-stretch flex-nowrap">
                <div class="relative" v-for="(img, i) in clbItems" :key="i">
                  <img class="max-w-lg rounded-lg h-32 w-32 cursor-pointer" :src="img.src" alt="image description"
                    @click.prevent="clbIndex = i" />
                  <button @click.prevent="del(img.id); $event.target.disabled = true"
                    class="z-10 absolute top-0 right-0 m-2 inline-flex items-center p-1 mr-2 text-sm font-semibold text-white bg-red-600 rounded-full dark:bg-black dark:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"
                      stroke="currentColor" stroke-width="1">
                      <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>

          </div>
          <!-- <div class="flex justify-between items-center">
            <SuperButton text="Trở về" to="/content/product" color="blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                  d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                  clip-rule="evenodd" />
              </svg>
            </SuperButton>
            <div class="flex items-center space-x-4">
              <SuperButton text="Cập nhật" :loading="isRequestLoading.state && isRequestLoading.method == 'patch'"
                @click="submit" />
              <SuperButton text="Xóa" @click="state.confirm = true" color="red">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"></path>
                </svg>
              </SuperButton>
            </div>

          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContentProductImage',
  data() {
    return {
      product: null,
      images: [],
      clbIndex: null,
      uploadProgress: null,
      priority: null,
    }
  },
  computed: {
    clbItems() {
      let clb = [];
      this.images.forEach(img => {
        clb.push({
          src: img.url,
          title: `Độ ưu tiên: ${img.priority ?? 'không có'}`,
          id: img.id,
        })
      });
      return clb;
    },
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
  },
  async fetch() {
    const product = this.$route.params.id
    const result = await this.$axios.get(`/content/products/${product}/product-images`)
    this.images = result.data.product_images;
    this.product = result.data;
  },
  methods: {
    refresh() {
      this.$fetch()
    },
    async del(id) {
      if (this.isRequestLoading.state && this.isRequestLoading.url.includes(`/content/product-images/`) && this.isRequestLoading.method == 'delete') {
        this.$toast.global.info({
          message: 'Đang xóa ảnh, vui lòng không thao tác ...'
        })
        return
      }
      this.$toast.global.info({
        message: 'Đang xóa...'
      })
      try {
        const result = await this.$axios.delete(`/content/product-images/${id}`)
        this.$toast.global.success({
          message: 'Đã xóa 1 ảnh'
        })
        this.refresh();
      }
      catch (e) {
        console.log(e)
      }
    },
    async upload(image, callback) {

      // console.log(image.canvas.toDataURL())
      // this.$axios.post(`/content/products/${this.product}/images`, {
      //   image: image.canvas.toDataURL()
      // });
      let app = this;
      const config = {
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          app.uploadProgress = percentCompleted
        },
        headers: {
          'Content-Type': "multipart/form-data"
        }
      }
      if (this.isRequestLoading.state && this.isRequestLoading.url == `/content/products/${this.product.id}/product-images` && this.isRequestLoading.method == 'post') {
        this.$toast.global.info({
          message: 'Ảnh đang được tải lên, vui lòng không thao tác ...'
        })
        return
      }

      this.$toast.global.info({
        message: 'Ảnh đang được tải lên...'
      })

      const form = new FormData();
      const blob = await new Promise(resolve => image.canvas.toBlob(resolve, image.type));
      form.append('image', blob);
      if(this.priority !== null && this.priority >= 0)
        form.append('priority', this.priority)
      try {
        const result = await this.$axios.post(`/content/products/${this.product.id}/product-images`, form, config);
        this.refresh();
        this.$toast.global.success({
          message: 'Thêm ảnh thành công'
        })
        callback()
      }
      catch (e) { }
      finally {
        this.priority = null
        this.uploadProgress = null
      }
    }
  }
}
</script>
