import generateArticleContent from "./modules/generateArticleContent";
import generateTodoId from "./modules/generateTodoId";
import pieChart from "./modules/pieChart";

const toggleFormButton = document.getElementById('toggleNewTaskForm');
const newTaskForm = document.querySelector('.new-task-form');
const cancelTask = document.getElementById('cancelTask');
const saveButton = document.getElementById('saveTask');
let dataStructure = [];
const completeRatio = pieChart(dataStructure.filter(item => !item.isDone).length, dataStructure.filter(item => item.isDone).length);

const updateChart = () => {
    completeRatio.data.datasets[0].data = [dataStructure.filter(item => !item.isDone).length, dataStructure.filter(item => item.isDone).length];
    completeRatio.update();
}

const initialListRender = () => {
    if(localStorage.getItem('tasks')) {
        let articleWrap = document.querySelector('#tasks-wrap');
        dataStructure = JSON.parse(localStorage.getItem('tasks'))
        updateChart();

        // render tasks
        dataStructure.map((todoObject) => {
            let newArticle = document.createElement('article')
            newArticle.className = `task ${todoObject.priority}`
            newArticle.dataset.id = todoObject.id
            newArticle.innerHTML = generateArticleContent(todoObject);
            articleWrap.prepend(newArticle)
        })

    }
}

// TOGGLE FORM
toggleFormButton.onclick = () => {
    newTaskForm.classList.toggle('d-none');
    toggleFormButton.classList.toggle('d-none');
}

cancelTask.onclick = () => {
    newTaskForm.classList.toggle('d-none')
    toggleFormButton.classList.toggle('d-none')
}

saveButton.onclick = () => {
    const date = new Date()
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.querySelector('input[name="priority"]:checked')?.value || 'low';

    const todoObject = {
        title,
        description,
        priority,
        date: date.toLocaleDateString('hr-HR'),
        isDone: false,
        id: generateTodoId(dataStructure)
    };

    if((todoObject.title.trim()).length > 2) {
        appendTaskToHtml(todoObject)
        appendTaskToDataStructure(todoObject)
        handleLocalStorage('add');
        updateChart();
    }
    else {
        // error message to be logged
        console.log('Title too short');
    }
}

const appendTaskToDataStructure = (todoObject) => {
    dataStructure = [...dataStructure, todoObject]
}

const removeTaskFromDataStructure = (todoObject) => {
    dataStructure = dataStructure.filter(todoItem => todoItem.id !== todoObject.id)
}

const appendTaskToHtml = (todoObject) => {
    let newArticle = document.createElement('article');
    let articleWrap = document.querySelector('#tasks-wrap');

    newArticle.className = `task ${todoObject.priority}${todoObject.isDone ? ' todo-done' : ''}`
    newArticle.dataset.id = todoObject.id
    newArticle.innerHTML = generateArticleContent(todoObject);
    articleWrap.prepend(newArticle)
}

const handleLocalStorage = (action) => {
    localStorage.setItem('tasks', JSON.stringify(dataStructure));

    if(action === 'remove' && !dataStructure.length) {
        localStorage.removeItem('tasks');
    }
}

document.addEventListener('click', (e) => {
    if(e.target.type === 'checkbox') {
        const referentTodoId = e.target.closest('article.task').dataset.id;
        const referentTodoElement = document.querySelector(`[data-id='${referentTodoId}']`);

        // stylize done todo
        if(e.target.checked === true) {
            referentTodoElement.classList.add('todo-done');
        }
        else {
            referentTodoElement.classList.remove('todo-done');
        }

        // change property value in todo array
        dataStructure = dataStructure.map((todoItem) => {
            if(todoItem.id == referentTodoId) {
                return {...todoItem, isDone: e.target.checked}
            }

            return todoItem;
        })

        handleLocalStorage('change');
        updateChart();
    } else if (e.target.dataset.action === "js-delete-todo") {
        const referentTodoId = e.target.closest('article.task').dataset.id;
        const referentTodoObject = dataStructure.find(todoItem => todoItem.id == referentTodoId);
        const referentTodoElement = document.querySelector(`[data-id='${referentTodoId}']`);

        referentTodoElement.remove();
        removeTaskFromDataStructure(referentTodoObject);
        handleLocalStorage('remove');
        updateChart();
    }
})

// initial todos render
initialListRender();
