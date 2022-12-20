<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Modal :show="state.success" :type="'success'" title="Thành công" @close="state.success = false"
      @action="state.success = false" />
    <ConfirmModal :loadingState="true" :show="confirmation.state" :list="confirmation.messages"
      question="Bạn có chắc muốn thực hiện thao tác này?" @close="confirmation.state = false" @action="confirmed" />

    <h1 class="text-4xl font-extrabold dark:text-white mb-8">Khách hàng</h1>
    <div class="flex gap-x-4 items-center pb-4">
      <!-- <SuperButton to="/account/user/create" text="Thêm khách hàng">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </SuperButton> -->

    </div>
    <!-- Fetch Error -->
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
    <!--  -->
    <!-- Search Form -->
    <div class="flex gap-x-4 items-center justify-between pb-4">
      <div class="flex gap-x-2 items-center">
        <FormInput placeholder="Tìm kiếm" v-model="search" class="max-w-sm">
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
          </template>
        </FormInput>
      </div>
    </div>
    <!--  -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 justify-items-center"
      v-if="$fetchState.pending || (isRequestLoading.state && isRequestLoading.url == fetchUrl)">
      <!-- Item skeleton -->
      <div v-for="(n) in 8" :key="n"
        class="w-full max-w-sm bg-gray-200 animate-twPulse animate-infinite border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          <button id="dropdownButton" data-dropdown-toggle="dropdown"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
              </path>
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center pb-10">
          <div class="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-300 animate-twPulse animate-infinite"></div>
          <h5 class="mb-1 text-xl font-medium bg-gray-300 animate-twPulse animate-infinite w-24 h-7 rounded-lg"></h5>
          <span class="text-sm bg-gray-300 animate-twPulse animate-infinite w-20 h-5 rounded-lg"></span>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 justify-items-center" v-else>
      <div v-if="!users.length"
        class="col-span-full inline-flex w-full items-center justify-center shadow-xl rounded-xl border border-gray-100">
        <span colspan="1000" class="p-4 text-center text-sm text-gray-500">
          Không có dữ liệu
        </span>
      </div>
      <!-- Items -->
      <div v-for="(user) in users" :key="user.id"
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          <VDropdown :distance="6" :popperTriggers="['click']">

            <button id="dropdownButton" data-dropdown-toggle="dropdown"
              class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button">
              <span class="sr-only">Open dropdown</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                </path>
              </svg>
            </button>

            <template #popper>
              <div id="dropdown"
                class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                <ul class="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <span
                      class="cursor-not-allowed block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Khóa
                      tài khoản</span>
                  </li>
                </ul>
              </div>
            </template>
          </VDropdown>

        </div>
        <div class="flex flex-col items-center pb-10">
          <div class="relative">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg"
              :src="`https://ui-avatars.com/api/?name=${user.name}&background=random&size=128&length=1`"
              alt="Bonnie image" />
            <span v-if="user.block"
              class=" absolute top-0 right-0 bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-blue-200 dark:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </div>

          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ user.name }} <span
              @click.prevent="rename(user)" v-if="user.username !== 'sa'"
              class="cursor-pointer bg-gray-100 text-gray-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-gray-200 dark:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path
                  d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </span></h5>

          <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.email ?? '~' }}</span>

        </div>
      </div>
      <!--  -->
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
  name: 'AccountUser',
  transition: {
    enterActiveClass: 'animate-fadeIn',
  },
  data: function () {
    return {
      pagination: {},
      users: [],
      baseUrlShop: '',
      state: {
        confirm: false,
        success: false,
      },
      fetchUrl: '',
      search: '',
      confirmation: {
        user_id: null,
        type: null,
        value: null,
        state: null,
        messages: [],
      },
    }
  },
  watch: {
    fetchUrl: function (val) {
      if (val.length > 0) {
        this.fetching(val)
      }
    },
    search: function (val) {
      this.debounceSearching()
    }
  },
  created() {
    this.debounceSearching = this.$_.debounce(function () {
      this.searching();
    }, 500)
  },
  async fetch() {
    this.fetchUrl = '/account/users'
    this.baseUrlShop = process.env.baseUrlShop

  },
  methods: {
    searching() {
      if (this.search.length)
        this.$toast.global.info({
          message: `Đang tìm "${this.search}" ...`
        })
      this.fetching(this.fetchUrl, {
        s: this.search
      })
    },
    async fetching(url, params = {}) {
      try {
        const users = await this.$axios.get(url, { params })
        this.pagination = users.data
        this.users = this.pagination.data;
      }
      catch (e) { }
    },
    async confirmed(callback) {
      try {
        switch (this.confirmation.type) {
          case 'block':
            await this.$axios.patch('/account/users/' + this.confirmation.user_id, {
              block: this.confirmation.value,
            })
            this.$toast.global.success({
              message: `${this.confirmation.messages[0]} thành công`
            })
            this.fetching(this.fetchUrl)
            break;

          default:
            break;
        }
      } catch (e) {
        console.log(e)
      }
      finally {
        this.confirmation = {
          user_id: null,
          type: null,
          value: null,
          state: null,
          messages: [],
        }
        callback()
      }
    }
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
  }

}
</script>
