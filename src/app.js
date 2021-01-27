const csv = require('csvtojson')
const fs = require('fs')
const multer = require('multer')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')

// import report functions
const { calculateAvaragePerSellerType } = require('./reports/averageListingSelling')
const { calculatePercentageByMake } = require('./reports/percentualDistribution')
const { calculateAveragePriceOf30percentOfMostContactedListings } = require('./reports/mostContactedListings')
const { calculateTop5MostContactedPerMonth } = require('./reports/mostContactedPerMonth')


const csvToArray = async (filename) => {
    const jsonArray = await csv().fromFile(filename)
    return jsonArray
}

const listingsFilePath = './public/uploads/listings.csv'
const contactFilePath = './public/uploads/contacts.csv'

var reportAvarage = []
var reportPercentual = []
var reportMostContactedListings = []
var reportMostContactedPerMonthFirst = []
var reportMostContactedPerMonthSecond = []


// only allow csv
const csvFilter = function (req, file, cb) {
    // Accept csv only
    if (!file.originalname.match(/\.(csv|CSV)$/)) {
        req.fileValidationError = 'Only csv files are allowed!'
        return cb(new Error('Only csv files are allowed!'), false)
    }
    cb(null, true);
};

// Create Express App
const app = express()

// // BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// static folder
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname)
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(morgan('dev'))


var storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {

            var folderPathWith = `./public/uploads`

            fs.mkdirSync(`${folderPathWith}`, { recursive: true }, (err) => {
                if (err) throw err;

            });
            cb(null, `./public/uploads/`)

        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }
);


// Get home route with html
app.get('/uploads', async (req, res) => {
    res.render('uploads');

})


app.get('/', async (req, res) => {
    const listingArr = await csvToArray(listingsFilePath)
    const contactsArr = await csvToArray(contactFilePath)
    reportAvarage = calculateAvaragePerSellerType(listingArr)
    reportPercentual = calculatePercentageByMake(listingArr)
    reportMostContactedListings = calculateAveragePriceOf30percentOfMostContactedListings(listingArr, contactsArr)
    reportMostContactedPerMonthFirst = calculateTop5MostContactedPerMonth(listingArr, contactsArr, 1)
    reportMostContactedPerMonthSecond = calculateTop5MostContactedPerMonth(listingArr, contactsArr, 2)

    res.render('allReports', {
        reportAvarage,
        reportPercentual,
        reportMostContactedListings,
        reportMostContactedPerMonthFirst,
        reportMostContactedPerMonthSecond
    });

})






//max data file 3
var upload = multer({ storage: storage, fileFilter: csvFilter }).array('data', 3)
app.post('/', (req, res, next) => {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        if (err) {
            return res.send('Error when uploading files')
        }
        res.redirect('/');

    })

})

// Server
app.listen(3696, () => console.log('Server started on port 3696'))
