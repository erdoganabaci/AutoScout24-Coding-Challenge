exports.calculatePercentageByMake = (listingArr) => {

    const totalAmountOfCars = listingArr.length

    //reducing by car brand and  amountOfCars
    const resultObject = listingArr.reduce(reducer, {})

    const resultArray = Object.keys(resultObject).map(key => {
        const percentage = calculatePercentage(resultObject[key].amountOfCars, totalAmountOfCars)

        return { make: key, percentage }
    })

    //sorting by percentage biggest numbers stays on top
    resultArray.sort((a, b) => b.percentage - a.percentage)
    var newFormattedResult = resultArray.map(obj => (

        { ...obj, percentage: formatPercentage(obj.percentage) }
    ))

    return newFormattedResult
}
// convert to %
const formatPercentage = (percentageItem) => {
    return percentageItem + '%'
}

const calculatePercentage = (a, b) => Math.round((a / b) * 100)


const reducer = (result, item) => {
    const seller = result[item.make]
    if (!seller) {
        result[item.make] = { amountOfCars: 1 }
        return result
    }

    result[item.make].amountOfCars += 1

    return result
}
