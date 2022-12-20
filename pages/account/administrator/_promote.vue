<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Modal :show="state.success" :type="'success'" title="Thành công" @close="$router.push('/account/administrator')"
      @action="$router.push('/account/administrator')" />
    <ConfirmModal :loadingState="true" :show="state.confirm" question="Bạn có chắc muốn xóa quản trị viên này?"
      @close="state.confirm = false" @action="del" />

    <h1 class="text-4xl font-extrabold dark:text-white  mb-8">Quản trị viên</h1>
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-2xl px-4 mx-auto py-8">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Cập nhật quản trị viên</h2>
        <form action="#">
          <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div class="sm:col-span-2">
              <FormInput label="Tên quản trị viên" :placeholder="administrator.name" v-model="administrator.name" />
            </div>
            <div class="sm:col-span-2">
              <FormInput label="Mô tả" :placeholder="administrator.desc ?? '<trống>'" :textarea="true"
                v-model="administrator.desc" />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <SuperButton text="Trở về" to="/account/administrator" color="blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                  d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                  clip-rule="evenodd" />
              </svg>
            </SuperButton>
            <div class="flex items-center space-x-4">
              <SuperButton text="Cập nhật" :loading="isRequestLoading.state && isRequestLoading.method == 'patch'" @click="submit" />
              <SuperButton text="Xóa" @click="state.confirm = true" color="red">
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
  name: 'ContentCategoryUpdate',
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
    const administrator = await $axios.get('/account/administrators/' + params.update)
    return { administrator: administrator.data }
  },
  methods: {
    async submit() {
      let app = this;
      try {
        const result = await this.$axios.patch('/account/administrators/' + this.administrator.id, this.administrator)
        this.state.success = true
      } catch (e) { }

    },
    async del(callback) {
      try {
        const result = await this.$axios.delete('/account/administrators/' + this.administrator.id)
        callback()
        this.state.success = true
      } catch (e) { }
    }
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
  }

}
</script>
