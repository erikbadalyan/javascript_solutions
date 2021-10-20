window.addEventListener('load', function(){
    const addTaskBtn = document.querySelector('.add_new_title_btn');
    const taskTitleInput = document.querySelector('.add_title');
    const tasksWrapper = document.querySelector('.todo_wrapper');

    let tasks;
    if(localStorage.tasks) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }

    function Task(title) {
        this.title = title;
        this.completed = false;
    }

    function deleteTask(event) {
        tasks.splice(event.target.dataset.index, 1);
        updateLocalStorage();
        fillHtmlList();
    }

    const createTemplate = function(task, index) {
        return `
            <div class="todo_item">
                <div class="todo_title">${task.title}</div>
                <div class="buttons">
                    <button class="complete"></button>
                    <button class="remove" data-index="${index}"></button>
                </div>
            </div>
        `;
    };

    const fillHtmlList = function() {
        tasksWrapper.innerHTML = '';
        if (tasks.length > 0) {
            tasks.forEach(function(item, index){
                tasksWrapper.innerHTML += createTemplate(item, index);
            });
        }
        let deleteButtons = document.querySelectorAll('.remove');
        if (deleteButtons) {
            for(let i = 0; i < deleteButtons.length; i++){
                deleteButtons[i].addEventListener('click', deleteTask);
            }
        }
    };

    fillHtmlList();

    const updateLocalStorage = function() {
        localStorage.setItem('tasks', JSON.stringify(tasks));

    };

    addTaskBtn.addEventListener('click', function(){
        tasks.push(new Task(taskTitleInput.value));
        updateLocalStorage();
        fillHtmlList();
        taskTitleInput.value = '';
    });
});