<!-- Please remove this file from your project -->
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="~/assets/logo-transparent.png" alt="logo">
        Meo Meo Shop
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng nhập
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng
                nhập</label>
              <input type="username" name="username" id="username" v-model="credentials.username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tên đăng nhập" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                khẩu</label>
              <input type="password" name="password" id="password" placeholder="••••••••" v-model="credentials.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <!-- <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required="">
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div> -->
              </div>
            </div>
            <button type="button" @click="login"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng
              nhập</button>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      let app = this;
      try {
        let response = await this.$auth.loginWith('local', { data: this.credentials })
        this.$toast.global.success({
          message: 'Đăng nhập thành công'
        })
        this.$axios.setToken(response.data.access_token, 'Bearer')
        this.$router.push('/')
      } catch (e) {
        if (!e.response) {
          console.log(e)
          app.$toast.global.myError()
        }
        else
          switch (e.response.status) {
            case 401:
              app.$toast.global.myError({
                message: e.response.data.message
              })
              break;
            case 422:
              Object.entries(e.response.data.errors).forEach(([key, value]) => {
                app.$toast.global.myError({
                  message: `${value}`
                })
              })
              break;


            default:
              break;
          }
      }

    }

  }
}
</script>
