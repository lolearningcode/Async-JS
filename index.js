/*jshint esversion: 6 */
const fs = require('fs');
const superagent = require('superagent');
//String interpolation `${}`
//add npm steps: npm init, npm i (npm package)
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    //only handles fulfilled promises and doesn't handle errors
    .then(res => {
        console.log(res.body.message);

        fs.writeFile('dog-image.txt', res.body.message, err => {
            console.log('Picture saved...!');
        });
        //error handling in catch
    }).catch(err => {
        console.log(`Error: ${err.message}`);
    });
});

