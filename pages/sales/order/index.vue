<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Modal :show="state.success" :type="'success'" title="Thành công" @close="state.success = false"
      @action="state.success = false" />
    <ConfirmModal :loadingState="true" :show="state.confirm" :list="selectedListConfirm"
      question="Bạn có chắc muốn xóa những đơn hàng này?" @close="state.confirm = false" @action="del" />
    <h1 class="text-4xl font-extrabold dark:text-white mb-8">Đơn hàng</h1>
    <div class="flex gap-x-4 items-center pb-4">
      <!-- <transition enter-active-class="animate-bounceIn animate-faster" leave-active-class="animate-bounceOut">
        <SuperButton v-if="selected.length" @click="state.confirm = true" color="red" text="Xóa mục đã chọn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              clip-rule="evenodd" />
          </svg>
        </SuperButton>
      </transition> -->

    </div>
    <div v-if="$fetchState.error" role="alert">
      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"></path>
      </svg>
      <span class="sr-only">Error</span>
      <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
        Lỗi khi tìm nạp dữ liệu
      </div>
      <button type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
        data-dismiss-target="#alert-2" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <div class="flex gap-x-4 items-center justify-between pb-4">
      <div class="flex gap-x-2 items-center grow">
        <select v-model="orderState"
          class=" max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option :value="null" selected>Tất cả trạng thái</option>
          <option :value="1">Chờ duyệt</option>
          <option :value="2">Chờ đóng gói</option>
          <option :value="3">Chờ giao hàng</option>
          <option :value="4">Chờ hoàn thành</option>
        </select>
        <!-- <FormInput placeholder="Tìm kiếm" v-model="search" class="max-w-sm">
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
          </template>
        </FormInput> -->
      </div>

    </div>
    <div class="overflow-x-auto relative rounded-xl shadow-xl mb-4">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" v-model="selectAll"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              Địa chị giao hàng
            </th>
            <th scope="col" class="py-3 px-6">
              Số điện thoại liên lạc
            </th>
            <th scope="col" class="py-3 px-6">
              Cập nhật lần cuối
            </th>
            <th scope="col" class="py-3 px-6">
              Khởi tạo
            </th>
            <th scope="col" class="py-3 px-6">
              <span class="inline-flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path
                    d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                  <path
                    d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                </svg>
                Trạng thái đơn
              </span>
            </th>
            <!-- <th scope="col" class="py-3 px-6">
              Action
            </th> -->
          </tr>
        </thead>
        <tbody v-if="$fetchState.pending || (isRequestLoading.state && isRequestLoading.url == fetchUrl)">
          <tr v-for="n in 5" :key="n"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-twPulse">
            <td class="p-4 w-4">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" disabled
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            </th>
            <td class="py-4 px-6">
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </td>
            <td class="py-4 px-6">
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </td>
            <td class="py-4 px-6">
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </td>
            <td class="py-4 px-6">
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </td>
          </tr>

        </tbody>
        <tbody v-else>
          <tr v-if="!orders.length">
            <td colspan="1000" class="p-4 text-center">
              Không có dữ liệu
            </td>
          </tr>
          <tr v-for="(order) in orders" :key="order.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="p-4 w-4">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" v-model="selected" :value="order"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
              @click="$router.push({ path: '/sales/order/' + order.id })">
              {{ order.address.address }} - {{ order.address.province }} - {{ order.address.country }}
            </th>
            <td class="py-4 px-6 cursor-pointer" @click="$router.push({ path: '/sales/order/' + order.id })">
              {{ order.address.phone_number }}
            </td>
            <td class="py-4 px-6 cursor-pointer" @click="$router.push({ path: '/sales/order/' + order.id })">
              {{ order.updated_at }}
            </td>
            <td class="py-4 px-6 cursor-pointer" @click="$router.push({ path: '/sales/order/' + order.id })">
              {{ order.created_at }}
            </td>
            <td class="py-4 px-6 cursor-pointer font-bold text-blue-500" @click="$router.push({ path: '/sales/order/' + order.id })">
              {{ order.state_name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="flex justify-between items-center pt-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Đang hiển thị <span
          class="font-semibold text-gray-900 dark:text-white">{{ pagination.from }} - {{ pagination.to }}</span> của
        <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span> kết quả</span>

      <ul class="inline-flex -space-x-px">
        <li v-for="(link, index) in pagination.links" :key="index">
          <button v-html="link.label" @click="fetchUrl = link.url" :disabled="link.url == null"
            :class="(link.url == null ? 'cursor-not-allowed bg-gray-200/50 ' : '') + (index == 0 ? 'rounded-l-lg ' : (index == (pagination.links.length - 1) ? 'rounded-r-lg ' : (link.active ? 'text-primary-50 bg-primary-600 ' : 'text-gray-500 bg-white '))) + 'py-2 px-3 ml-0 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"></button>
        </li>
      </ul>

    </nav>

  </div>

</template>

<script>
export default {
  name: 'ContentCategory',
  transition: {
    enterActiveClass: 'animate-fadeIn',
  },
  data: function () {
    return {
      pagination: {},
      orders: [],
      baseUrlShop: '',
      selected: [],
      state: {
        confirm: false,
        success: false,
      },
      fetchUrl: '',
      search: '',
      orderState: null,
    }
  },
  watch: {
    fetchUrl: function (val) {
      if (val.length > 0) {
        this.fetching(val)
      }
    },
    orderState: function (val) {
      this.debounceSearching()
    }
  },
  created() {
    this.debounceSearching = this.$_.debounce(function () {
      this.searching();
    }, 500)
  },
  async fetch() {
    this.fetchUrl = '/sales/orders'
    this.baseUrlShop = process.env.baseUrlShop
  },
  // async asyncData({ $axios, env }) {
  //   const orders = await $axios.get('/sales/orders')
  //   return {
  //     pagination = orders.data,
  //     orders: orders.data.data,
  //     baseUrlShop: env.baseUrlShop,
  //   }
  // },
  methods: {
    searching() {
      if (this.search.length)
        this.$toast.global.info({
          message: `Đang tìm "${this.search}" ...`
        })
      this.fetching(this.fetchUrl, {
        state: this.orderState
      })
    },
    async fetching(url, params = {}) {
      try {
        const orders = await this.$axios.get(url, { params })
        this.pagination = orders.data
        this.orders = this.pagination.data;
      }
      catch (e) { }
    },
    async del(callback) {
      let removed = [];
      try {
        for (const [i, order] of this.selected.entries()) {
          await this.$axios.delete('/sales/orders/' + order.id)
          this.$toast.global.success({
            message: `Đã xóa ${order.name}`
          })
          this.orders.splice(this.orders.findIndex(c => c.id === order.id), 1)
          removed.push(i)

          if (this.orders.length == 0 && this.pagination.prev_page_url != null) {
            this.paginate(this.pagination.prev_page_url)
          }
        }
        callback()
        this.state.success = true
      } catch (e) {
        callback()
      } finally {
        removed.forEach((i) => {
          this.selected.splice(i, 1)
        })

      }
    }
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
    selectedListConfirm() {
      let list = [];
      this.selected.forEach(function (order) {
        list.push(`${order.name} (${order.slug})`)
      })

      return list
    },
    selectAll: {
      get: function () {
        if (this.$fetchState.pending) return false;
        return this.orders ? this.selected.length == this.orders.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.orders.forEach(function (order) {
            selected.push(order);
          });
        }

        this.selected = selected;
      }
    }
  }

}
</script>
