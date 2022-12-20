<template>
  <header class="mb-8">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button @click="toggleSidebar" id="toggleSidebar" aria-expanded="true" aria-controls="sidebar"
            class="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <button @click="toggleSidebar" aria-expanded="true" aria-controls="sidebar"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <NuxtLink to="/" class="flex mr-4">
            <img src="~/assets/logo-transparent.png" class="mr-3 h-8" alt="FlowBite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MeoMeoShop</span>
          </NuxtLink>
          <!-- <form action="#" method="GET" class="hidden lg:block lg:pl-2">
            <label for="topbar-search" class="sr-only">Search</label>
            <div class="relative mt-1 lg:w-96">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <input type="text" name="email" id="topbar-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search">
            </div>
          </form> -->
        </div>
        <div class="flex items-center lg:order-2">

          <!-- <button id="toggleSidebarMobileSearch" type="button"
            class="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Search</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </button> -->
          <!-- Notifications -->

          <div class="relative">
            <button type="button" @click="toggleAvatar"
              class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
              <span class="sr-only">Open user menu</span>
              <img class="w-8 h-8 rounded-full" :src="`https://ui-avatars.com/api/?name=${$auth.user.name}&background=random&size=128&length=1`"
                alt="user photo">
            </button>
            <!-- Dropdown menu -->
            <transition enter-active-class="animate-zoomIn animate-duration-300" leave-active-class="animate-zoomOut animate-duration-300">
              <div v-if="avatarDropdown" v-click-outside="clickOutAvatarDropdown"
                class="absolute right-0 rounded-xl top-8 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown">
                <div class="py-3 px-4">
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ $auth.user.name }}</span>
                  <span
                    class="block text-sm font-light text-gray-500 truncate dark:text-gray-400">{{ $auth.user.email }}</span>
                </div>
                <!-- <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                  <li>
                    <a href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My
                      profile</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account
                      settings</a>
                  </li>
                </ul> -->

                <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                  <li>
                    <a @click="logout"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Đăng xuất</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>

        </div>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'Navbar',
  transitions: {
    name: 'avatar'
  },
  data() {
    return {
      avatarDropdown: false,
      user : this.$auth.user,
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('sidebar');
    },
    toggleAvatar() {
      this.avatarDropdown = !this.avatarDropdown
    },
    clickOutAvatarDropdown() {
      this.avatarDropdown = false;
    },
    async logout() {
      await this.$auth.logout()
      this.$toast.global.success({
          message: 'Đã đăng xuất'
        })
      this.$router.push('/login')
    }
  }
}
</script>


<style>
.avatar-enter-active {
  animation: zoomIn 0.3s;
}

.avatar-leave-active {
  animation: zoomOut 0.3s;
}
</style>
