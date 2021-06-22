<template>
  <div
    class="task"
    @click="goToTask(task)"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart="pickUpTask($event, taskIndex, columnIndex)"
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  >
    <div class="w-full flex flex-no-shrink justify-between items-center font-bold">
      <span>{{ task.name }}</span>
      <span class="trello-close p-2 cursor-pointer" @click.stop="deleteTask">X</span>
    </div>
    <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import moveTaskAndColumnMixin from "@/mixins/moveTaskAndColumnMixin.js";
export default {
  mixins: [moveTaskAndColumnMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    pickUpTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.setData("from-task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "task");
    },
    deleteTask() {
      this.$store.commit("DELETE_TASK", {
        tasks: this.column.tasks,
        taskIndex: this.taskIndex
      }); 
    }
  },
};
</script>
<style>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
