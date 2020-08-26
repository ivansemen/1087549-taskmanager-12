import MenuView from "./view/menu";
import FilterView from "./view/filter";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import BoardPresenter from "./presenter/board";
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
