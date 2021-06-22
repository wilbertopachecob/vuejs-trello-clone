import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "./default-board";
import { saveStatePlugin } from "./utils";
import { uuid } from "./utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  getters: {
    getTask({ board }) {
      return (id) => {
        for (const column of board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
  mutations: {
    CREATE_TASK(store, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
      });
    },
    CREATE_COLUMN(store, { name }) {
      store.board.columns.push({
        name,
        tasks: []
      });
    },
    DELETE_COLUMN(store, { columnIndex }) {
      store.board.columns.splice(columnIndex, 1)
    },
    DELETE_TASK(store, { tasks, taskIndex }) {
      tasks.splice(taskIndex, 1)
    },
    UPDATE_TASK(store, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(store, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const task = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, task)//push(task);
    },
    MOVE_COLUMN(store, { fromColumnIndex, toColumnIndex}) {
      const columns = store.board.columns
      const column = columns.splice(fromColumnIndex, 1)[0]
      columns.splice(toColumnIndex, 0, column)
    },
  },
});
