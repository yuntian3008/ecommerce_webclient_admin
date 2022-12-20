<template>
  <transition>
    <div class="container mx-auto px-4 lg:px-0">
      <Modal :show="state.success" :type="'success'" title="Thành công" @close="afterSuccess"
        @action="afterSuccess" />
      <h1 class="text-4xl font-extrabold dark:text-white mb-8">Sản phẩm</h1>
      <section class="bg-white dark:bg-gray-900">
        <div class="max-w-4xl px-4 mx-auto py-8">
          <FormTitle>Thêm sản phẩm mới</FormTitle>
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
                <FormInput v-if="$fetchState.pending" label="Danh mục" loading />
                <FormInput v-else label="Danh mục" :select="categories" v-model="product.category_id"
                  placeholder="Chọn danh mục" required />
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
              <SuperButton to="/content/product" text="Trở về" color="blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd"
                    d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                    clip-rule="evenodd" />
                </svg>
              </SuperButton>
              <div class="flex gap-x-3 items-center">
                <FormToggle v-model="stayHere">Thêm một sản phẩm khác</FormToggle>
                <SuperButton :loading="isRequestLoading.state && isRequestLoading.method == 'post'" @click="submit"
                  :disabled="$fetchState.pending" text="Thêm sản phẩm" />
              </div>

            </div>
          </form>
        </div>
      </section>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'ContentCategoryCreate',
  transition: {
    enterActiveClass: 'animate-fadeIn',
  },
  async fetch() {
    const categories = await this.$axios.get('/content/categories', {
      params: {
        all: 1
      }
    })
    this.categories = categories.data
  },
  data() {
    return {
      state: {
        success: false,
      },
      product: {
        specs: '[]',
      },
      specs: [],
      categories: [],
      stayHere: false,
    }
  },
  watch: {
    specs(val) {
      this.product.specs = JSON.stringify(val)
    }
  },
  methods: {
    afterSuccess() {
      if (this.stayHere) {
        this.product = {}
        this.specs = []
        this.state.success = false
      }
      else {
        this.$router.push('/content/product')
      }
    },
    async submit() {
      if (this.isInvalidSpecs) {
        this.$toast.global.myError({
          message: 'Vui lòng không để trống bất cứ thông số nào'
        })
        return
      }

      try {
        const result = await this.$axios.post('/content/products', this.product)
        this.state.success = true
      }
      catch (e) { }


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
