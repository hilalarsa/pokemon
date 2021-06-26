const getTime = () => {
    var currentdate = new Date()
    var datetime =
        currentdate.getDate() +
        '/' +
        (currentdate.getMonth() + 1) +
        '/' +
        currentdate.getFullYear() +
        ' @ ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes() +
        ':' +
        currentdate.getSeconds()
    return datetime
}

const capitalizeFirst = (str) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export { getTime, capitalizeFirst }
