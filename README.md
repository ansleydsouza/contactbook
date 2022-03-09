# Contact Book
 A MERN Stack Contact Book Web Application


## Tech Stack Used
> MongoDB Atlas
> 
> Mongoose
> 
> ExpressJS
> 
> NodeJS
> 
> React JS
> 
> Swagger UI Express
> 
> Swagger JS Doc
> 
> Python - For anomaly detection


## Usage
```
git clone https://github.com/ansleydsouza/contactbook.git
cd contactbook/server
npm install
npm run app     //Backend is served on http://localhost:8082
cd ../contactbook/client
npm install
npm start       //Frontend is served on http://localhost:3000
cd ../anomaly-detection
pip3 install pymongo[srv]
run main class in the main.py file
```
>Swagger Endpoint: http://localhost:8082/docs


## Known Issues to be fixed
I have not been able to get the following items to work completely:
> Swagger UI testing does not work for the Update call
> 
> Currently the anomaly detection module can only get the server information


## Guidance

I used the following resources to guide me along the way
### MERN Stack
>https://www.mongodb.com/languages/mern-stack-tutorial
>
>https://blog.logrocket.com/mern-stack-tutorial/

### Pagination
>https://javascript.plainenglish.io/simple-pagination-with-node-js-mongoose-and-express-4942af479ab2
>
>https://medium.com/@fenilshah23398/pagination-using-mongodb-and-react-8e1e54506330
> 
> https://javascript.plainenglish.io/simple-pagination-with-node-js-mongoose-and-express-4942af479ab2

### Partial Search
>https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose

### Swagger
>https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
> 
> https://dev.to/mikefmeyer/build-a-node-js-express-rest-api-with-mongodb-and-swagger-3de9

### Anomaly Detection
>https://medium.com/learningdatascience/anomaly-detection-techniques-in-python-50f650c75aaf
