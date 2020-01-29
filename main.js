const todos = document.getElementById("todo_list");
const todo_name = document.getElementById("todo_name");
const todo_field = document.getElementById("todo_field");
const todo_add = document.getElementById("todo_btn");
const todo_error = document.getElementById("todo_error");
const search_field = document.getElementById("search_field");
const del_btn = document.getElementById("del_btn");

class Todo {
  constructor(name = "none", task = "none") {
    this.name = name;
    this.task = task;
    this.date = new Date(Date.now());
  }

  short_date() {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return this.date.toLocaleDateString("en-US", options);
  }

  generate_li() {
    let name = document.createElement("div");
    name.className += "name";
    name.appendChild(document.createTextNode(this.name));
    let task = document.createElement("div");
    task.className += "task";
    task.appendChild(document.createTextNode(this.task));
    let date = document.createElement("div");
    date.className += "date";
    date.appendChild(document.createTextNode(this.short_date()));
    let li = document.createElement("li");
    li.appendChild(name);
    li.appendChild(task);
    li.appendChild(date);
    return li;
  }
}

todo_add.addEventListener("click", e => {
  todo_error.innerHTML = "<p></p>";
  const name = todo_name.value;
  const task = todo_field.value;
  if (name == "" || task == "") {
    todo_error.innerHTML = "<p>Enter a Name and a Task to add a Todo.</p>";
  } else {
    todo_field.value = "";
    todo_name.value = "";
    const todo = new Todo(name, task);
    todos.appendChild(todo.generate_li());
  }
});

del_btn.addEventListener("click", e => {
  const name = search_field.value;
  if (name == "") {
    if (todos.childNodes[0] != undefined) todos.childNodes[0].remove();
  }
  todos.childNodes.forEach(node => {
    if (node.childNodes[0].textContent == name) node.remove();
  });
  search_field.value = "";
});
