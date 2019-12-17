/*jshint esversion: 8 */
const fs = require('fs');
const superagent = require('superagent');
//created new file name to do our async work and returns a new Promise
const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file...💩💩💩💩💩💩');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file👎🏿👎🏿👎🏿👎🏿👎🏿👎🏿👎🏿');
      resolve('success');
    });
  });
};

//async await is more simpler than Promise chaining with .then and async await must be used together. Async runs in background and await waits for it then runs the next line of code. Try catch is similar to do catch in Swift
const getDogPic = async () => {
    try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePromise('dog-image.txt', res.body.message);
    console.log('Picture saved...!');
    } catch (err) {
        console.log(err);
    }
};

getDogPic();

//Promise instead of callback and using Promise chaining using return a superagent
/*
readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    writeFilePromise('dog-image.txt', res.body.message);

    // fs.writeFile('dog-image.txt', res.body.message, err => {
    //     console.log('Picture saved...!');
    // });
    //error handling in catch
  })
  .then(() => {
    console.log('Picture saved...!');
  })
  .catch(err => {
    console.log(err);
  });
*/
//String interpolation `${}`
//add npm steps: npm init, npm i (npm package)
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     //only handles fulfilled promises and doesn't handle errors
//     .then(res => {
//         console.log(res.body.message);

//         fs.writeFile('dog-image.txt', res.body.message, err => {
//             console.log('Picture saved...!');
//         });
//         //error handling in catch
//     }).catch(err => {
//         console.log(`Error: ${err.message}`);
//     });
// });
