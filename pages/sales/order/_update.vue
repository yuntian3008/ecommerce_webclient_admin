<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Modal :show="state.success" :type="'success'" title="Thành công" @close="$router.push('/sales/order')"
      @action="$router.push('/sales/order')" />
    <ConfirmModal :loadingState="true" :show="state.confirm" question="Bạn có chắc muốn xóa đơn hàng này?"
      @close="state.confirm = false" @action="del" />

    <h1 class="text-4xl font-extrabold dark:text-white  mb-8">Danh mục</h1>
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-4xl px-4 mx-auto py-8">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Cập nhật đơn hàng</h2>
        <form action="#">
          <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div class="flex flex-col pb-3">
              <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Trạng thái đơn</dt>
              <dd class="text-lg font-semibold">{{ order.state_name }}</dd>
            </div>
            <div class="flex flex-col pt-3">
              <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Tổng giá trị đơn hàng</dt>
              <dd class="text-lg font-semibold">{{ Intl.NumberFormat('vi-VN', {
                  style: 'currency', currency:
                    'VND'
                }).format(order.total_amount)
              }}</dd>
            </div>
            <div class="flex flex-col py-3">
              <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Cập nhật lần cuối</dt>
              <dd class="text-lg font-semibold">{{ order.updated_at }}</dd>
            </div>

          </dl>
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg my-6 ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    <span class="sr-only">Image</span>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Sản phẩm
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Số lượng
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Đơn giá
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Danh mục
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, i) in order.order_items" :key="i"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="p-4 w-32 cursor-pointer" @click="redirect(order.product.url)">
                    <img :src="order.product.image.url" alt="Apple Watch">
                  </td>
                  <td class="py-4 px-6 font-semibold text-gray-900 dark:text-whit cursor-pointer"
                    @click="redirect(order.product.url)">
                    {{ order.product.name }}
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center space-x-3">
                      {{ order.quantity }}
                    </div>
                  </td>
                  <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {{ Intl.NumberFormat('vi-VN', {
                        style: 'currency', currency:
                          'VND'
                      }).format(order.final_unit_price)
                    }}
                  </td>
                  <td class="py-4 px-6">
                    {{ order.product.category.name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-between items-center">
            <SuperButton text="Trở về" to="/sales/order" color="blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                  d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                  clip-rule="evenodd" />
              </svg>
            </SuperButton>
            <div class="flex items-center space-x-4">
              <SuperButton v-if="order.state < 5 && order.state > 0" :text="nextStateName"
                :loading="isRequestLoading.state && isRequestLoading.method == 'patch'" @click="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </SuperButton>
              <SuperButton v-if="order.state == 1" text="Hủy đơn" @click="state.confirm = true" color="red">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
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
  name: 'SalesOrderUpdate',
  transition: {
    enterActiveClass: 'animate-fadeIn',
  },
  data() {
    return {
      state: {
        success: false,
        confirm: false,
      },
    }
  },
  async asyncData({ params, $axios }) {
    const order = await $axios.get('/sales/orders/' + params.update)
    return { order: order.data }
  },
  methods: {
    redirect(url) {
      window.open(url, '_blank')
    },
    async submit() {
      let app = this;
      try {
        const result = await this.$axios.patch('/sales/orders/' + this.order.id, {
          state: parseInt(this.order.state) + 1
        })
        this.state.success = true
      } catch (e) { }

    },
    async del(callback) {
      try {
        const result = await this.$axios.patch('/sales/orders/' + this.order.id, {
          state: 0
        })
        callback()
        this.state.success = true
      } catch (e) { }
    }
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },

    nextStateName() {
      switch (parseInt(this.order.state)) {
        case 1:
          return "Xác nhận đơn"
        case 2:
          return "Đóng gói đơn hàng"
        case 3:
          return "Giao hàng"
        case 4:
          return "Hoàn thành đơn hàng"


        default:
          break;
      }
      return
    }
  }

}
</script>
