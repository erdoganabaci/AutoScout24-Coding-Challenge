exports.calculateAveragePriceOf30percentOfMostContactedListings = (listingArr, contactsArr) => {
    const totalAmountOfContacts = contactsArr.length

    //reduce listing_id and sum times of contact
    const reducedObject = contactsArr.reduce(contactTimeReducer, {})

    //map reduced obj to Array
    const arr = Object.keys(reducedObject).map(key => {
        const percentage = ((reducedObject[key].timesContacted / totalAmountOfContacts) * 100).toPrecision(2) * 1
        return { listing_id: key, timesContacted: reducedObject[key].timesContacted, percentage }
    })

    //sortByTimesOfContact
    arr.sort((a, b) => b.timesContacted - a.timesContacted)


    const top30Arr = get30PercentMostContacted(arr)


    //find total Price
    const totalPrice = top30Arr.reduce((result, item) => {
        const price = listingArr.find(listing => listing.id === item.listing_id).price * 1
        result += price
        return result
    }, 0)
    const avaragePrice = Number.parseInt(totalPrice / top30Arr.length)

    return { avaragePrice: '€ ' + avaragePrice.toLocaleString("en-US") + ',- ' }
}

const get30PercentMostContacted = (arr) => {
    let totalPercentage = 0
    const top30Arr = []

    for (let index = 0; index < arr.length; index++) {

        if (totalPercentage >= 30) {
            break
        }
        totalPercentage += arr[index].percentage

        top30Arr.push(arr[index])

    }

    return top30Arr

}



const contactTimeReducer = (result, item) => {
    const id = result[item.listing_id]
    if (!id) {
        result[item.listing_id] = { timesContacted: 1 }
        return result
    }
    result[item.listing_id].timesContacted += 1

    return result

}
