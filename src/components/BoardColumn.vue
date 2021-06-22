<template>
  <div
    class="column"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="pickUpColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, taskIndex) of column.tasks"
        :key="taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
        :taskIndex="taskIndex"
        :task="task"
      />
      <input
        type="text"
        class="bg-transparent w-full p-2 block"
        @keypress.enter="addTask(column.tasks, $event)"
        placeholder="+ Enter new task"
      />
    </div>
  </div>
</template>

<script>
import ColumnTask from "./ColumnTask";
import moveTaskAndColumnMixin from "@/mixins/moveTaskAndColumnMixin.js";
export default {
  components: {
    ColumnTask,
  },
  mixins: [moveTaskAndColumnMixin],
  methods: {
    addTask(tasks, e) {
      const name = e.target.value;
      this.$store.commit("CREATE_TASK", {
        tasks,
        name,
      });
      e.target.value = "";
    },
    pickUpColumn(e, fromColumnIndex) {
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
  },
};
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
