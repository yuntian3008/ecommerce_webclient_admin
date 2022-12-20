<template>
  <vue-final-modal v-slot="{ close }" v-bind="$attrs" classes="flex justify-center items-center"
    content-class="relative flex flex-col w-full max-w-2xl max-h-full p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
    v-on="$listeners">
    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Phân quyền
      </h3>
      <button
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div>
      <div class="flex justify-between mb-4 rounded-t sm:mb-5">
        <div class="text-lg text-gray-900 md:text-xl dark:text-white">
          <h3 class="font-semibold ">
            {{ administrator.name }}
          </h3>
          <div class="font-semibold text-base">
            {{ `Vai trò: ${administrator.role ?? 'không xác định'}` }}
            <svg v-if="(isRequestLoading.state && isRequestLoading.method === 'patch' && isRequestLoading.url === `/account/administrators/${administrator.id}`)" aria-hidden="true" class="inline-flex items-center mr-2 w-4 h-4 text-gray-200 animate-twSpin animate-infinite dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span v-else @click.prevent="setRole(administrator)"
              class="cursor-pointer bg-gray-100 text-gray-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-gray-200 dark:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path
                  d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </span>

          </div>
        </div>
      </div>
      <dl>
        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Cấp quyền</dt>
        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex items-center gap-x-2">
          <select v-model="newScope"
            class="flex-1 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled value="" selected>Chọn quyền</option>
            <option v-for="(scope, i) in availableScopes" :key="i" :value="scope.id">{{ scope.description }}</option>
          </select>
          <SuperButton size="small" color="blue" text="Thêm" @click="addScope"
            :loading="(isRequestLoading.state && isRequestLoading.method === 'post' && isRequestLoading.url === `/account/administrators/${administrator.id}/administrator-scopes`)" />
        </dd>
        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Các quyền</dt>
        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
          <span v-if="currentScopes.length == 0">Không có quyền nào</span>
          <div v-for="(scope, i) in currentScopes" :key="i"
            class="inline-flex items-center py-1 px-2 m-1 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-200 dark:text-blue-800">
            {{ scope.description }}
            <button type="button" @click="deleteScope(i, scope)"
              class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-300 dark:hover:text-blue-900">
              <svg
                v-if="(isRequestLoading.state && isRequestLoading.method === 'delete' && isRequestLoading.url === `/account/administrator-scopes/${scope.id}`)"
                aria-hidden="true" class="w-3.5 h-3.5 animate-twSpin animate-infinite" viewBox="0 0 100 101"
                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <svg v-else aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>

            </button>
          </div>
        </dd>
      </dl>
    </div>
    <div class="flex items-center gap-x-2 pt-4">
      <SuperButton v-if="hasConfirm" color="blue" size="small" @click="$emit('confirm', close)" text="Xác nhận">
      </SuperButton>
      <SuperButton v-if="hasCancel" color="gray" size="small" @click="$emit('cancel', close)" text="Đóng"></SuperButton>
    </div>

  </vue-final-modal>
</template>

<script>
export default {
  name: 'FinalModal',
  inheritAttrs: false,

  props: {
    hasCancel: {
      type: Boolean,
      default: true,
    },
    hasConfirm: {
      type: Boolean,
      default: true,
    },
    admin: Object,
    scopes: Array,
    adminScopes: Array,
  },
  data() {
    return {
      administrator: this.admin,
      currentScopes: [],
      availableScopes: this.scopes,
      newScope: '',
    }
  },
  methods: {
    async addScope() {
      try {

        const scope = await this.$axios.post(`/account/administrators/${this.administrator.id}/administrator-scopes`, {
          scope: this.newScope
        })
        this.$swal.fire({
          title: 'Thêm quyền thành công',
          text: `Đã thêm quyền ${scope.data.description} cho ${this.administrator.name}`,
          icon: 'success',
        })
        this.currentScopes.push(scope.data)

      }
      catch (e) { }
    },
    async deleteScope(i, scope) {
      try {

        const result = await this.$axios.delete(`/account/administrator-scopes/${scope.id}`)
        this.$swal.fire({
          title: `Xóa thành công`,
          icon: 'success',
        })
        // this.promote.scopes.splice(i,1)
        this.$delete(this.currentScopes, i);

      }
      catch (e) { }
    },
    async setRole() {
      let app = this;
      const { value: role, isConfirmed: confirmed } = await this.$swal.fire({
        title: `Đổi tên vai trò của ${this.administrator.name}`,
        text: `Nhập tên vai trò mới`,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Lưu',
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Vai trò không được để trống!'
          }
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      })
      if (confirmed) {
        try {
          const result = await app.$axios.patch('/account/administrators/' + this.administrator.id, {
            role: role,
          });
          await app.$swal.fire({
            title: `Thành công`,
            icon: 'success',
            text: `Đổi tên vai trò của ${this.administrator.name} thành công`
          })
          this.$emit('reload')
        }

        catch (e) {
          console.log(e.response)
          if (e.response && e.response.status == 422)
            app.$swal.showValidationMessage(`Lỗi: ${e.response.data.messages}`);
        }
      }
    },
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
  },
  watch: {
    admin(val) {
      this.administrator = val
    },
    scopes(val) {
      this.availableScopes = val
    },
    adminScopes(val) {
      this.currentScopes = val
    }
  }
}
</script>
