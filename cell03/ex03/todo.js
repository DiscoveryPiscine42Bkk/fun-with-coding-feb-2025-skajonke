document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo() {
    let text = prompt("Enter a new TO-DO:");
    if (text) {
        createTodo(text);
        saveTodos();
    }
}

function createTodo(text) {
    let todo = document.createElement("div");
    todo.className = "todo";
    todo.textContent = text;
    todo.onclick = function () {
        if (confirm("Do you want to delete this TO-DO?")) {
            todo.remove();
            saveTodos();
        }
    };
    document.getElementById("ft_list").appendChild(todo);
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ").find(row => row.startsWith("todos="));
    if (cookies) {
        let todos = JSON.parse(cookies.split("=")[1]);
        todos.forEach(text => createTodo(text));
    }
}
