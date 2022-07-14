<template>
  <transition
    enter-active-class="tc-enter-active"
    leave-active-class="tc-leave-active"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TransitionCollapse",
  data() {
    return {};
  },
  methods: {
    /**
     * @param {HTMLElement} element
     */
    beforeEnter(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = "0px";
        }

        element.style.display = null;
      });
    },
    /**
     * @param {HTMLElement} element
     */
    enter(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = `${element.scrollHeight}px`;
        });
      });
    },
    /**
     * @param {HTMLElement} element
     */
    afterEnter(element) {
      element.style.height = null;
    },
    /**
     * @param {HTMLElement} element
     */
    beforeLeave(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = `${element.offsetHeight}px`;
        }
      });
    },
    /**
     * @param {HTMLElement} element
     */
    leave(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = "0px";
        });
      });
    },
    /**
     * @param {HTMLElement} element
     */
    afterLeave(element) {
      element.style.height = null;
    },
  },
};
</script>

<style scoped>
.tc-enter-active,
.tc-leave-active {
  overflow: hidden;
  transition: height 0.25s 0s ease;
}
</style>
