exports.calculateAvaragePerSellerType = (listingArr) => {

    //reducing the data array by sellerType, calculating totalPrice and totalAmountCarsSold
    const reducedObj = listingArr.reduce(reducer, {})

    const sellerTypesArray = Object.keys(reducedObj)

    //Calculating avarage for every seller and mapping results to an array
    const resultArray = sellerTypesArray.map(key => {

        const totalPrice = reducedObj[key].totalPriceAmount
        const numberOfCars = reducedObj[key].amountOfCars
        const avaragePrice = calculatePriceAvarage(totalPrice, numberOfCars)
        const avaragePriceFormatted = formatAvarageInEuroString(avaragePrice)

        return { sellerType: key, avarageInEuro: avaragePriceFormatted }

    })

    return resultArray

}
// convert to € 
const formatAvarageInEuroString = (avaragePrice) => {
    return '€ ' + avaragePrice.toLocaleString("en-US") + ',- '
}

const calculatePriceAvarage = (totalPrice, numberOfCars) => {
    return Math.ceil(totalPrice / numberOfCars)
}

const reducer = (accumulator, item) => {

    const seller = accumulator[item.seller_type]
    if (!seller) {
        accumulator[item.seller_type] = { totalPriceAmount: Number(item.price), amountOfCars: 1 }
        return accumulator
    }

    let itemToUpdate = accumulator[item.seller_type]
    itemToUpdate.totalPriceAmount += Number(item.price)
    itemToUpdate.amountOfCars += 1
    accumulator[item.seller_type] = itemToUpdate


    return accumulator
}