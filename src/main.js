import {createMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {createBoardTemplate} from "./view/board";
import {createSortingTemplate} from "./view/sort";
import {createTaskTemplate} from "./view/task";
import {createTaskEditorTemplate} from "./view/task-edit";
import {createLoadMoreButtonTemplate} from "./view/button-load";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const tasksElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(tasksElement, createTaskEditorTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(tasksElement, createTaskTemplate(), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
