
# Public-API-Crawler

## Stack Used-> 
 - Javascript
 - Node Js
 - MongoDB


 
## Steps to run the code

- Clone the repository in your system.
- Change the path of URI in 3rd line of `db.js` file to your own MongoDB Atlas instance. 
- Make sure docker is installed in your system.
- Open Terminal in your cloned folder and run `docker build - t project .` , then run `docker run - d - it project`
- Now the api will be called at an interval of 6 seconds , as only 10 calls can be successfully completed in a minute(wait for data to display on the terminal).
- All the data will get stored to your MongoDB instance ( make sure you performed step 2 ) . 
- If docker showing any errors , then run 2 commands after cloning , `npm install` then `node start.js`


## Schema Details of Database
```
  {
      {
         Name:"Animals",
         ApiData:[
                  {
                    API:"",
                    Link:"",
                    Description:"",
                    Auth:"",
                    Cors:"",
                    Https:"",
                    Category:""
                  },
                 ]
      },
      
  }
```
## What is done from the "Points to be achieved" ?

- All tasks Completed.
- Number of entries : 45
- Number of rows : 640

## What is left from "Points to be achieved" ?

- All tasks Completed.

## What would you improve if given more days ?

- I would have developed it's frontend and implement caching.
