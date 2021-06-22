<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn 
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board" 
      />
      <div class="column flex mx-2">
        <!-- <div class="flex-grow items-center mb-2 font-bold">
          Add new column
        </div> -->
        <input
          class="p-1 mr-2 flex-grow text-xl font-bold w-full"
          type="text"
          placeholder="+ Enter column name"
          @keyup.enter="addColumn($event)"
        />
      </div>

      <div class="task-bg" v-if="isTaskOpen" @click.self="close">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardColumn from "@/components/BoardColumn";
export default {
  components: {
    BoardColumn
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    close() {
      this.$router.push({ name: "board" });
    },
    addColumn(e) {
      this.$store.commit("CREATE_COLUMN", {
        name: e.target.value,
      });
    },
  },
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
