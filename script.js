

const tasksContainer = document.getElementById("tasks");
const createTaskBlockForm = document.querySelector(".create-task-block");
const tasksList = document.querySelector(".tasks-list");
const createTaskBlockInput = document.querySelector(
  ".create-task-block__input"
);

// -

const formCreateQuestion = document.querySelector(".create-question-block");
const inputQuestionTitle = document.querySelector(".question-title-input");
const inputQuestionText = document.querySelector(".question-text-input");

const formCreateTask = document.querySelector(".create-task-block--task");
const inputCreateTask = document.querySelector(".create-task-block__input--task");
const inputCreateQuestion = document.querySelector(".create-task-block__input--question");

// -

const body = document.body;

const buttons = document.querySelectorAll("button");

const tasks = [
  {
    id: "1138465078061",
    completed: false,
    title: "Что такое класс в JavaScript?",
    text: " Это шаблон для создания объектов, у которых есть одинаковая структура (свойства) и поведение (методы). Он помогает писать код более организованно, понятно и удобно для повторного использования. Классы поддерживают наследование с помощью ключевого слова extends.",
  },
  {
    id: "1138465078062",
    completed: false,
    title: "Что такое ООП?",
    text: "Это подход к написанию кода, в котором программа строится вокруг объектов. ООП строится на четырёх ключевых принципах: Инкапсуляция, Наследование, Полиморфизм, Абстракция.",
  },
  {
    id: "1138465078063",
    completed: false,
    title: "Что такое Инкапсуляция?",
    text: "Инкапсуляция - Сокрытие внутренней логики объекта от внешнего мира. Объект сам управляет своими данными и предоставляет доступ к ним только через методы.",
  },
  {
    id: "1138465078064",
    completed: false,
    title: "Что такое Наследование?",
    text: "Наследование - Возможность создавать новый класс на основе уже существующего.",
  },
  {
    id: "1138465078065",
    completed: false,
    title: "Что такое Полиморфизм?",
    text: "Полиморфизм - Возможность вызывать один и тот же метод у разных объектов, и получать разное поведение.",
  },
  {
    id: "1138465078066",
    completed: false,
    title: "Что такое Абстракция?",
    text: "Абстракция - Сокрытие деталей реализации и предоставление только нужных методов.",
  },
  {
    id: "1138465078067",
    completed: false,
    title: "Что такое callback?",
    text: "Это функция, передаваемая в другую функцию. Обычно это используется в асинхронном программировании или в ситуациях, когда одна функция должна быть выполнена после завершения другой функции.",
  },
  {
    id: "1138465078068",
    completed: false,
    title: "Что такое Event Loop?",
    text: "Event Loop - это бесконечный цикл событий, который позволяет выполнять код асинхронно, не блокируя основной поток данных. Он управляет тем, когда и в каком порядке выполняются: промисы, таймеры, события, сетевые запросы.",
  },
];

// #1

function createTaskElement(task) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.dataset.taskId = task.id;

  const mainContainer = document.createElement("div");
  mainContainer.className = "task-item__main-container";

  const mainContent = document.createElement("div");
  mainContent.className = "task-item__main-content";

  const checkboxForm = document.createElement("form");
  checkboxForm.className = "checkbox-form";

  const inputCheckbox = document.createElement("input");
  inputCheckbox.className = "checkbox-form__checkbox";
  inputCheckbox.type = "checkbox";
  inputCheckbox.id = task.id;
  inputCheckbox.checked = task.completed;

  const labelCheckbox = document.createElement("label");
  labelCheckbox.setAttribute("for", task.id);

  const titleTaskItem = document.createElement("h3");
  titleTaskItem.className = "task-item__title";
  titleTaskItem.textContent = task.title

  const textTaskItem = document.createElement("span");
  textTaskItem.className = "task-item__text";
  textTaskItem.textContent = task.text;

  const deleteButton = document.createElement("button");
  deleteButton.className =
    "task-item__delete-button default-button delete-button";
  deleteButton.textContent = "Удалить";

  checkboxForm.append(inputCheckbox, labelCheckbox);
  mainContent.append(titleTaskItem, checkboxForm, textTaskItem);
  mainContainer.append(mainContent, deleteButton);
  taskItem.append(mainContainer);

  return taskItem;
}

const modalOverlay = document.querySelector(".modal-overlay");
const cancelButton = document.querySelector(".delete-modal__cancel-button");
const confirmButton = document.querySelector(".delete-modal__confirm-button");

let taskIdToDelete = null;

// Делегирование событий на tasksList
tasksList.addEventListener("click", (event) => {
  const { target } = event;
  const isTaskButtonDelete = target.closest(".task-item__delete-button");

  if (isTaskButtonDelete) {
    tasks.taskItem = target.closest(".task-item");
    taskIdToDelete = tasks.taskItem.dataset.taskId;
    modalOverlay.classList.remove("modal-overlay_hidden");
  }
});

// Кнопка "Отмена"
cancelButton.addEventListener("click", () => {
  modalOverlay.classList.add("modal-overlay_hidden");
  taskIdToDelete = null;
});

// Кнопка "Удалить"
confirmButton.addEventListener("click", () => {
  const isTaskId = tasks.findIndex(
    (task) => task.id.toString() === taskIdToDelete
  );

  if (isTaskId !== -1) {
    tasks.splice(isTaskId, 1); // удаляем из массива
    tasks.taskItem.remove(); // удаляем из DOM
  }

  modalOverlay.classList.add("modal-overlay_hidden");
  taskIdToDelete = null;
});

// =

tasks.forEach((task) => {
  const taskElement = createTaskElement(task);
  tasksList.append(taskElement);
});



let isDarkTheme = false; // по умолчанию светлая тема

document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    isDarkTheme = !isDarkTheme; // переключаем тему
    toggleTheme(isDarkTheme);
  }
});

function toggleTheme(isDark) {
  if (isDark) {
    // Тёмная тема
    body.style.background = "#24292E";
    body.style.color = "#ffffff ";

    buttons.forEach((btn) => {
      btn.style.border = "1px solid #ffffff";
    });
  } else {
    // Светлая тема
    body.style.background = "initial";
    body.style.color = "initial";

    buttons.forEach((btn) => {
      btn.style.border = "none";
    });
  }
}


// -----



formCreateQuestion.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = inputQuestionTitle.value.trim();
  const text = inputQuestionText.value.trim();

  // Валидация
  if (!title || !text) {
    alert("Поля не должны быть пустыми");
    return;
  }

  const newQuestion = {
    id: Date.now().toString(),
    completed: false,
    title: title,
    text: text
  };

  // Добавляем в массив
  tasks.push(newQuestion);

  // Добавляем на страницу
  const taskElement = createTaskElement(newQuestion);
  tasksList.append(taskElement);

  // Очищаем инпуты
  inputQuestionTitle.value = "";
  inputQuestionText.value = "";
});