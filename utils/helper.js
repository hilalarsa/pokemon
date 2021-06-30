const getTime = () => {
    var currentdate = new Date()
    var datetime =
        currentdate.getDate() +
        '/' +
        (currentdate.getMonth() + 1) +
        ' ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes()
    return datetime
}

const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const randomizer = () => {
    let randomNumber = Math.floor(Math.random() * 10) // 0-9
    //0-4 lose, 5-9 win
    // if (randomNumber >= 5) {
    if (randomNumber >= 0) {
        return true
    } else {
        return false
    }
}

export { getTime, capitalizeFirst, randomizer }
