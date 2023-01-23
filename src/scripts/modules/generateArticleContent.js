const generateArticleContent = (todoObject) => {
    const articleContent = ` \
        <header> \
            <div class="date">Created: ${todoObject.date}</div> \
        </header> \
        <h2 class="title">${todoObject.title}</h2> \
        <p class="description"> \
            ${todoObject.description} \
        </p> \
        <button class="task-delete" data-action="js-delete-todo">x</button> \
        <div class="task-check"> \
            <input type="checkbox" ${todoObject.isDone ? 'checked' : ''}> \
        </div>`;

    return articleContent;
}

export default generateArticleContent;