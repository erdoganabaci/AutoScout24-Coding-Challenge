exports.calculateTop5MostContactedPerMonth = (listingArr, contactsArr, reportMonth) => {

    const withConvertedDate = contactsArr.map(item => {
        const date = new Date(item.contact_date * 1)
        item.contact_date = date
        item.contact_month = date.getMonth() + 1
        return item
    })

    //group contact data by month Number
    const groupedByMonth = withConvertedDate.reduce((r, a) => {
        r[a.contact_month] = r[a.contact_month] || [];
        r[a.contact_month].push(a);
        return r;
    }, {})


    //Reduce to find contactTime amount for each monthGroup
    Object.keys(groupedByMonth).forEach(monthGroup => {
        groupedByMonth[monthGroup] = groupedByMonth[monthGroup].reduce(contactTimeReducer, {})
    })

    if (!groupedByMonth[reportMonth]) {
        return { message: 'Data for giving Month does not exist' }
    }

    //Create array for wanted report Month
    const givenMonthsListingsArray = Object.keys(groupedByMonth[reportMonth])

    //find top5ContactedByGivenMonth and return array of it
    const top5ContactedByGivenMonth = givenMonthsListingsArray
        .map(item => groupedByMonth[reportMonth][item])
        .sort((a, b) => -a.timesContacted + b.timesContacted)
        .slice(0, 5)

    //from listings.cvs data hyrate the given listing_ids with wanted data
    const top5ContactedByGivenMonthHydrated = top5ContactedByGivenMonth.map(listing => {
        //not the best searching algo I could use somethin like binary seacrh since the listingArr is sorted
        //but due to time and effort I allocated to this assignment I just used linear search
        const listingData = listingArr.find(item => item.id === listing.listing_id)

        return { ...listing, make: listingData.make, price: listingData.price, seller_type: listingData.seller_type, mileage: listingData.mileage }
    })



    var newFormattedResult = top5ContactedByGivenMonthHydrated.map(obj => (

        { ...obj, price: formatAvarageInEuroString(obj.price), mileage: formatKilometer(obj.mileage) }
    ))
    return newFormattedResult


}

// convert to € 
const formatAvarageInEuroString = (avaragePrice) => {
    return '€ ' + avaragePrice.toLocaleString("en-US") + ',- '
}
// convert to KM
const formatKilometer = (kilometerItem) => {
    return kilometerItem + ' KM'
}

const contactTimeReducer = (result, item) => {
    const id = result[item.listing_id]
    if (!id) {
        result[item.listing_id] = { ...item, timesContacted: 1 }
        return result
    }
    result[item.listing_id].timesContacted += 1

    return result

}