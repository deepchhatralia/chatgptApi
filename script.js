window.scrollTo(0, document.body.scrollHeight);

const myForm = document.getElementById('myForm');
const btn = document.getElementById('search');
const msgContainer = document.getElementById('msgContainer');
const chatgpt = document.getElementsByClassName('chatgpt');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userInput = document.getElementById('msg').value;
    document.getElementById('msg').value = "";

    // display the question asked by the user on the screen
    let myLi = document.createElement('li');
    myLi.className = "user";
    myLi.innerText = userInput;
    msgContainer.appendChild(myLi)


    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '149f2630cbmsh18c06a33edfbeb9p15a4b5jsn30e3ecf21bac',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        },
        body: '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"' + userInput + '"}]}'
    };


    // disable button and add spinner while the data is being fetched through API
    btn.setAttribute('disabled', true);
    // btn.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';


    // add loader for showing that the answer is being generated
    let li = document.createElement('li');
    li.className = "chatgpt";
    li.innerHTML = '<div class="px-3"><div class="snippet" data-title="dot-pulse"><div class="stage"><div class="dot-pulse"></div></div></div></div>';
    msgContainer.appendChild(li)


    fetch('https://openai80.p.rapidapi.com/chat/completions', options)
        .then(response => response.json())
        .then(response => {
            // document.getElementById('data').innerText = response.choices[0].message.content;

            // btn.innerHTML = 'Search';

            chatgpt[chatgpt.length - 1].innerText = response.choices[0].message.content;
            window.scrollTo(0, window.length);

            btn.removeAttribute('disabled');
        })
        .catch(err => console.error(err));
})