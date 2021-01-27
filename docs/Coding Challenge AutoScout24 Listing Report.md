# Coding Challenge: AutoScout24 Listing Report

### Goal of this task
This task was prepared to give you a "taste" of how our domain looks like and how you develop a solution for the proposed case. The code will be used as a base for discussion on future interview steps. Two CSV files will be provided as data source for this exercise. You will be asked to provide four different reports based on this data. Under "Requirements", "Objectives" and later under "Acceptance Criteria" you will find further information about what to do. We kindly ask you to invest a maximum of **four to five hours** into this task. If you have any questions, please contact us. 

### Technical Info & Expectations
- Language: Feel free to pick any language you're comfortable with. We recommend (and prefer) Scala, JavaScript/TypeScript or Java.
- Test: Make sure your code is under Test.
- Documentation Please provide some documentation for:
-- How to run the code
-- How to run the tests
-- If any code generator was used
- You may send us you code per email packaged in a ZIP file but we would prefer to have just a link of your repository containing all the code, test and documentation on GITHUB.

### Requirements
Write an application that reads the supplied CSV lists and generates the following reports:
- Average Listing Selling Price per Seller Type
- Percentual Distribution of available cars by Make
- Average price of the 30% most contacted listings
- The Top 5 most contacted listings per Month

### Objectives
Depending on your experience area and level feel free to start with Objective 1 or jump straight to Objective 2 and build it up from there - but please stay within the given timebox. You are not expected to achieve all objectives.

1. write a console application that fulfills the above requirements
2. write an API (REST or GraphQL) that fulfills the above requirements
3. add an upload endpoint to the API that receives CSV files, validates their format and uses the data in the uploaded CSV to fulfill the above requirements
4. write a web application that consumes the API, uploads files and displays the reports
5. dockerize your application

### Terms & Taxonomy
- Listing: that's the representation of a car being sold. At AutoScout24, "Listings" are the items you find on our list pages, like for example: [https://www.autoscout24.de/lst].
- Make: "Producer" of cars, for instance BWM, Audi, VW, etc.
- Seller Type: What kind of seller is behind that listing. If it's "private", that means the car will be sold by a private person. If it's dealer, it's means that the car is sold on a dealer shop. "Other" means another types of sellers that ate not relevant in this context.


### Acceptance Criteria

##### Average Listing Selling Price per Seller Type
- There are three Seller Types: private, dealer and other.
- For each of these types, it should be provided an average selling price.
- The average price should be formatted as € #,- 
- Output format is free for you to choose, but an example could be:

| Seller Type | Average in Euro |
| ------ | ------ |
| private | € 2.500,- |
| dealer | € 3.529,- |
| other | € 1.200,- |
 
##### Percentual distribution of available cars by Make
- For each make, it should be reported the percentual amount of listings.
- The report should be sorted by distribution, where makes with biggest numbers stays on top.
- Output format is free for you to choose, but an example could be:

|Make| Distribution|
| ------ | ------ |
|Audi| 55%|
|BMW| 35%|
|VW| 10%|

##### Average price of the 30% most contacted listings
- Using the "Contacts CSV list", report the average price(format: € #,-) of the 30% most contacted listings.
- Output format is free for you to choose, but an example could be:
 
|Average price|
| ------ |
|€ 12.512,-|

##### The Top 5 most contacted listings per Month
- Using the "Contacts CSV list", report which listing had more contacts in each month.
- Reported fields: Ranking, Listing Id, Make, Selling Price (format: € #,-), Mileage(format: # KM), Total Amount of contacts
- Output format is free for you to choose, but an example could be:

Month: 01.2020

|Ranking| Listing Id| Make | Selling Price | Mileage | Total Amount of contacts |
| ------ | ------ | ------ | ------ | ------ | ------ |
|1| 1000| BWM | € 2.538,- | 50.000 KM | 15
|2| 1001| Audi | € 4.300,- | 20.000 KM | 12
|3| 1002| Toyota | € 18.250,- | 35.000 KM | 11
|4| 1003| VW | € 25.080,- | 45.678 KM | 10
|5| 1004| Porsche | € 102.000,- | 2.000 KM | 8

Month: 02.2020

|Ranking| Listing Id| Make | Selling Price | Mileage | Total Amount of contacts |
| ------ | ------ | ------ | ------ | ------ | ------ |
|1| 1004| Porsche | € 102.000,- | 2.000 KM | 18
|2| 1001| Audi | € 4.300,- | 20.000 KM | 17
|3| 1000| BWM | € 2.538,- | 50.000 KM | 15
|4| 1003| VW | € 25.080,- | 45.678 KM | 10
|5| 1002| Toyota | € 18.250,- | 35.000 KM | 3


##### Definition of the CSV files


- Listing.csv

|field| type| required |
| ------ | ------ | ------ |
|id| numeric | yes |
|make| alphanumeric | yes |
|price| numeric | yes |
|mileage| numeric | yes |
|seller_type| alphanumeric | yes |

- contacts.csv

|field| type| required |
| ------ | ------ | ------ |
|listing_id| numeric | yes |
|contact_date| UTC Timestamp(ms) | yes |
