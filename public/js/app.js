console.log('Client side javascript is added');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    
    const url = '/weather?address=' + location + '';
    
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';
    fetch(url).then((response) => {
        response.json().then((data) => {
            msgOne.textContent = '';

            if(data.error) {
                msgTwo.textContent = data.error;
            } else {
                msgTwo.textContent = data.weather;
            }
        })
    })
});