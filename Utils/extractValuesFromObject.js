module.exports = function extractValuesFromObject (arr, obj){ 
    
    let newObj = {};
    arr.forEach(property => {
        newObj[property] = obj[property];
    })

    return newObj;
}