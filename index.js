const fs = require('fs');
const superagent = require('superagent');
//String interpolation `${}`
//add npm steps: npm init, npm i (npm package)
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if (err) return console.log(`Error: ${err.message}`);
        console.log(res.body.message);

        fs.writeFile('dog-image.txt', res.body.message, err => {
            console.log('Picture saved...!');
        })
    });
});

