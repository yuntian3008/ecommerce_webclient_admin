<template>
  <transition>
    <div class="container mx-auto px-4 lg:px-0">
      <Modal :show="state.success" :type="'success'" title="Thành công" @close="$router.push('/account/administrator')"
        @action="$router.push('/account/administrator')" />
      <h1 class="text-4xl font-extrabold dark:text-white mb-8">Quản trị viên</h1>
      <section class="bg-white dark:bg-gray-900">
        <div class="max-w-2xl px-4 mx-auto py-8">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Thêm quản trị viên mới</h2>
          <form action="#">
            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div class="sm:col-span-2">
                <FormInput label="Tên quản trị viên" v-model="administrator.name" required />
              </div>
              <div class="sm:col-span-2">
                <FormInput label="Địa chỉ email" v-model="administrator.email" required />
              </div>
              <div>
                <FormInput label="Tên đăng nhập" v-model="administrator.username" required/>
              </div>
              <div>
                <FormInput label="Vai trò" v-model="administrator.role" />
              </div>
            </div>
            <div class="flex justify-between items-center">
              <SuperButton to="/account/administrator" text="Trở về" color="blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd"
                    d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                    clip-rule="evenodd" />
                </svg>
              </SuperButton>
              <SuperButton :loading="isRequestLoading.state && isRequestLoading.method == 'post'" @click="submit" text="Thêm quản trị viên" />
            </div>
          </form>
        </div>
      </section>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'ContentAdministratorCreate',
  transition: {
    enterActiveClass: 'animate-fadeIn',
  },
  data() {
    return {
      state: {
        success: false,
      },
      administrator: {},
    }
  },
  methods: {
    async submit() {
      try {
        const result = await this.$axios.post('/account/administrators', this.administrator)
        this.state.success = true
      }
      catch(e) {}


    }
  },
  computed: {
    isRequestLoading() {
      return this.$store.state.loading.isRequestLoading
    },
  }

}
</script>
