$(document).ready(function() {
    loadTodos();

    $("#newTodo").click(function() {
        let text = prompt("Enter a new TO-DO:");
        if (text) {
            createTodo(text);
            saveTodos();
        }
    });

    function createTodo(text) {
        let todo = $("<div></div>").addClass("todo").text(text);
        todo.click(function() {
            if (confirm("Do you want to delete this TO-DO?")) {
                $(this).remove();
                saveTodos();
            }
        });
        $("#ft_list").append(todo);
    }

    function saveTodos() {
        let todos = [];
        $(".todo").each(function() {
            todos.push($(this).text());
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
});
