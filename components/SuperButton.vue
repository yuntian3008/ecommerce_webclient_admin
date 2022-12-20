<!-- Please remove this file from your project -->
<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot></slot>
    {{ text }}
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="classes" target="_blank">
    <slot></slot>
    {{ text }}
  </a>
  <button v-else type="button" @click="$emit('click')" :disabled="loading" :class="classes">
    <svg v-if="loading" class="animate-twSpin animate-infinite h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
    <slot v-else>

    </slot>
    {{ text }}
  </button>

</template>

<script>
export default {
  name: 'SuperButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    text: String,
    to: String,
    href: String,
  },
  computed: {
    classes: function () {
      let theme = ''
      let size = ''
      switch (this.color) {
        case 'slate':
          theme = `bg-slate-700 hover:bg-slate-800 focus:ring-slate-500 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800`
          break;
        case 'gray':
          theme = `bg-gray-700 hover:bg-gray-800 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`
          break;
        case 'zinc':
          theme = `bg-zinc-700 hover:bg-zinc-800 focus:ring-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800`
          break;
        case 'neutral':
          theme = `bg-neutral-700 hover:bg-neutral-800 focus:ring-neutral-500 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800`
          break;
        case 'stone':
          theme = `bg-stone-700 hover:bg-stone-800 focus:ring-stone-500 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800`
          break;
        case 'red':
          theme = `bg-red-700 hover:bg-red-800 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`
          break;
        case 'orange':
          theme = `bg-orange-700 hover:bg-orange-800 focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800`
          break;
        case 'amber':
          theme = `bg-amber-700 hover:bg-amber-800 focus:ring-amber-500 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800`
          break;
        case 'yellow':
          theme = `bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800`
          break;
        case 'lime':
          theme = `bg-lime-700 hover:bg-lime-800 focus:ring-lime-500 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800`
          break;
        case 'green':
          theme = `bg-green-700 hover:bg-green-800 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`
          break;
        case 'emerald':
          theme = `bg-emerald-700 hover:bg-emerald-800 focus:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800`
          break;
        case 'teal':
          theme = `bg-teal-700 hover:bg-teal-800 focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800`
          break;
        case 'cyan':
          theme = `bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800`
          break;
        case 'sky':
          theme = `bg-sky-700 hover:bg-sky-800 focus:ring-sky-500 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`
          break;
        case 'blue':
          theme = `bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
          break;
        case 'indigo':
          theme = `bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`
          break;
        case 'violet':
          theme = `bg-violet-700 hover:bg-violet-800 focus:ring-violet-500 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800`
          break;
        case 'purple':
          theme = `bg-purple-700 hover:bg-purple-800 focus:ring-purple-500 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800`
          break;
        case 'fuchsia':
          theme = `bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-fuchsia-500 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800`
          break;
        case 'pink':
          theme = `bg-pink-700 hover:bg-pink-800 focus:ring-pink-500 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800`
          break;
        case 'rose':
          theme = `bg-rose-700 hover:bg-rose-800 focus:ring-rose-500 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800`
          break;
        default:
          theme = `bg-primary-700 hover:bg-primary-800 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`
          break;
      }
      switch (this.size) {
        case 'extra-small':
          size = `text-xs px-3 py-2`
          break;
        case 'small':
          size = `text-sm px-3 py-2`
          break;
        case 'extra-large':
          size = `text-base px-6 py-3.5`
          break;
        case 'large':
          size = `py-3 px-5 text-base`
          break;
        default:
          size = `text-sm px-5 py-2.5`
          break;
      }
      return `${theme} inline-flex item-centers text-white gap-x-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-center ${size}`;
    }
  },
}
</script>


