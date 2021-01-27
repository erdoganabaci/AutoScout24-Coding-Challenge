const expect = require('chai').expect
const csv = require('csvtojson')
const { calculateAvaragePerSellerType } = require('./../reports/averageListingSelling')

const csvToArray = async (fileName) => {
    const jsonArray = await csv().fromFile(fileName)
    return jsonArray
}

describe('Array', function () {
    let listingArr
    //Load the test data before tests
    before(async () => {
        listingArr = await csvToArray('src/tests/testData/testDataListings.csv')
    });


    describe('Test average price for seller type', () => {

        it('Should return € 10,- for seller_type = private', () => {
            expect(calculateAvaragePerSellerType(listingArr)[0].avarageInEuro).to.equal('€ 10,- ')
        })

        it('Should return € 20,- for seller_type = dealer', () => {
            expect(calculateAvaragePerSellerType(listingArr)[1].avarageInEuro).to.equal('€ 20,- ')
        })

        it('Should return € 30,- for seller_type = other', () => {
            expect(calculateAvaragePerSellerType(listingArr)[2].avarageInEuro).to.equal('€ 30,- ')
        })
    })
})