<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Modal :show="state.success" :type="'success'" title="Thành công" @close="$router.push('/content/product')"
      @action="$router.push('/content/product')" />
    <ConfirmModal :loadingState="true" :show="state.confirm" question="Bạn có chắc muốn xóa sản phẩm này?"
      @close="state.confirm = false" @action="del" />

    <h1 class="text-4xl font-extrabold dark:text-white  mb-8">Sản phẩm</h1>
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-4xl px-4 mx-auto py-8">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Cập nhật sản phẩm</h2>
        <form action="#">
          <div class="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 sm:mb-5">
            <div class="sm:col-span-2">
              <FormInput label="Tên sản phẩm" v-model="product.name" required />
            </div>
            <div>
              <FormInput label="Đơn giá" v-model="product.unit_price" required inputType="number" />
            </div>
            <div class="sm:col-span-3">
              <FormInput label="Mô tả" :textarea="true" v-model="product.desc" required />
            </div>
            <div class="sm:col-span-2">

              <FormInput v-if="categories.length" label="Danh mục" :select="categories" v-model="product.category_id"
                placeholder="Chọn danh mục" required />
              <div v-else class="flex flex-col gap-y-2">
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-300">Danh mục <span class="text-red-700 font-bold">*</span></label>
                <div class="flex items-center gap-x-2">
                  <span class="bg-primary-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{{ `${product.category.name}` }}</span>
                  <button @click.prevent="fetchCategories" :disabled="(isRequestLoading.state && isRequestLoading.url == '/content/categories')" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                      <svg v-if="(isRequestLoading.state && isRequestLoading.url == '/content/categories')" aria-hidden="true" role="status" class="inline mr-2 w-3 h-3 text-white animate-twSpin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg>
                      Thay đổi
                  </button>
                </div>

              </div>
            </div>
            <div
              class="overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 max-h-60">
              <div class="flex flex-col gap-y-2">
                <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-300">Thông số</label>
                <div class="flex gap-2 sm-gap-6 pr-3" v-for="(spec, index) in specs" :key="index">
                  <input type="text" v-model="spec.key"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tên thông số">
                  <input type="text" v-model="spec.value"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Giá trị">
                  <button type="button" @click="specs.splice(index, 1)"
                    class="text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">remove specs</span>
                  </button>
                </div>
                <div class="flex gap-2 sm-gap-6 pr-3">
                  <button type="button" @click="specs.push({ key: '', value: '' })"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 font-bold rounded-lg text-sm p-2 text-center inline-flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path
                        d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <span class="sr-only">add specs</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
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

          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContentProductUpdate',
  transition: {
    enterActiveClass: 'animate-fadeIn',
  },
  data() {
    return {
      state: {
        success: false,
        confirm: false,
      },
      categories: [],
      specs: [],
    }
  },
  watch: {
    specs(val) {
      this.product.specs = JSON.stringify(val)
    }
  },
  async asyncData({ params, $axios }) {
    const product = await $axios.get('/content/products/' + params.id)
    return { product: product.data, specs: JSON.parse(product.data.specs) }
  },
  methods: {
    async fetchCategories() {
      const categories = await this.$axios.get('/content/categories', {
        params: {
          all: 1
        }
      })
      this.categories = categories.data
    },
    async submit() {
      if (this.isInvalidSpecs) {
        this.$toast.global.myError({
          message: 'Vui lòng không để trống bất cứ thông số nào'
        })
        return
      }
      let app = this;
      try {
        const result = await this.$axios.patch('/content/products/' + this.product.id, this.product)
        this.state.success = true
      } catch (e) { }

    },
    async del(callback) {
      try {
        const result = await this.$axios.delete('/content/products/' + this.product.id)
        callback()
        this.state.success = true
      } catch (e) { }
    }
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
    isInvalidSpecs() {
      const isNotEmpty = (obj) => {
        return obj.key !== '' && obj.value !== '' && obj.key !== null && obj.value !== null;
      }
      return this.specs.length == 0 ? false : !this.specs.every(isNotEmpty)
    },
  }

}
</script>
