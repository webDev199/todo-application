const generateTodoId = (dataStructure) => {
    const idArray = dataStructure.map(todoObject => todoObject.id);
    let newId;
    if (idArray.length===0){
            newId=1;
    }else{
            newId=Math.max(...idArray)+1;
    }
    return newId;
}

export default generateTodoId;