<template>
  <a v-if="href" :href="href" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ text }}
  </a>
  <NuxtLink v-else :to="to" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ text }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'Link',
  props: {
    href: String,
    to: String,
    text: String,
    color: String,
  },
  computed: {
    classes: function () {
      let theme = ''
      switch (this.color) {
        case 'slate':
          theme = `text-slate-600 dark:text-slate-500`
          break;
        case 'gray':
          theme = `text-gray-600 dark:text-gray-500`
          break;
        case 'zinc':
          theme = `text-zinc-600 dark:text-zinc-500`
          break;
        case 'neutral':
          theme = `text-neutral-600 dark:text-neutral-500`
          break;
        case 'stone':
          theme = `text-stone-600 dark:text-stone-500`
          break;
        case 'red':
          theme = `text-red-600 dark:text-red-500`
          break;
        case 'orange':
          theme = `text-orange-600 dark:text-orange-500`
          break;
        case 'amber':
          theme = `text-amber-600 dark:text-amber-500`
          break;
        case 'yellow':
          theme = `text-yellow-600 dark:text-yellow-500`
          break;
        case 'lime':
          theme = `text-lime-600 dark:text-lime-500`
          break;
        case 'green':
          theme = `text-green-600 dark:text-green-500`
          break;
        case 'emerald':
          theme = `text-emerald-600 dark:text-emerald-500`
          break;
        case 'teal':
          theme = `text-teal-600 dark:text-teal-500`
          break;
        case 'cyan':
          theme = `text-cyan-600 dark:text-cyan-500`
          break;
        case 'sky':
          theme = `text-sky-600 dark:text-sky-500`
          break;
        case 'blue':
          theme = `text-blue-600 dark:text-blue-500`
          break;
        case 'indigo':
          theme = `text-indigo-600 dark:text-indigo-500`
          break;
        case 'violet':
          theme = `text-violet-600 dark:text-violet-500`
          break;
        case 'purple':
          theme = `text-purple-600 dark:text-purple-500`
          break;
        case 'fuchsia':
          theme = `text-fuchsia-600 dark:text-fuchsia-500`
          break;
        case 'pink':
          theme = `text-pink-600 dark:text-pink-500`
          break;
        case 'rose':
          theme = `text-rose-600 dark:text-rose-500`
          break;
        default:
          theme = `text-primary-600 dark:text-primary-500`
          break;
      }
      return `${theme} font-medium hover:underline`;
    }
  },
}
</script>
