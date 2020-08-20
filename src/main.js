import MenuView from "./view/menu";
import LoadMoreButtonView from "./view/button-load";
import BoardView from "./view/board";
import SortView from "./view/sort";
import TaskListView from "./view/task-list.js";
import FilterView from "./view/filter";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderElement, RenderPosition} from "./utils";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderElement(siteHeaderElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
renderElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(taskListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderElement(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  const loadMoreButtonComponent = new LoadMoreButtonView();
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderElement(taskListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
