<template>
  <div class="task-view">
    <div class="flex flex-grow flex-col items justify-between px-4">
      <input
        type="text"
        :value="task.name"
        class="p-1 mr-2 flex-grow text-xl font-bold w-full"
        @change="updateTask($event.target.value, 'name')"
      />
      <textarea
        :value="task.description"
        class="leading-normal relative px-2 border bg-transparent mt-2 h-64 border-none"
        @change="updateTask($event.target.value, 'description')"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },
  methods: {
    updateTask(value, key) {
      this.$store.commit("UPDATE_TASK", { task: this.task, key, value });
    },
  },
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
