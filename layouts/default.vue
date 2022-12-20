<template>
  <div class="flex flex-col h-screen">
    <Navbar @sidebar="toggleSideBar" class="flex-none" />
    <Sidebar :toggle="sideBar" @close="sideBar = false" />
    <div class="grow">
      <Nuxt />
    </div>



    <footer class="flex-none mt-4 p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#"
          class="hover:underline">Meo Meo Shop™</a>
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">Về chúng tôi</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Chính sách bảo mật</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Liên hệ</a>
        </li>
      </ul>
    </footer>


  </div>


</template>

<script>
export default {
  data() {
    return {
      sideBar: false,
    }
  },
  methods: {
    toggleSideBar() {
      this.sideBar = !this.sideBar;
    }
  }
}
</script>
