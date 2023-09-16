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

    const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': "9747eca9bemshc591106fa47be23p10a21bjsn8df06d88fd4e",
            'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
        },
        body: JSON.stringify({ query: userInput })
    };


    // disable button and add spinner while the data is being fetched through API
    btn.setAttribute('disabled', true);
    // btn.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';


    // add loader for showing that the answer is being generated
    let li = document.createElement('li');
    li.className = "chatgpt";
    li.innerHTML = '<div class="px-3"><div class="snippet" data-title="dot-pulse"><div class="stage"><div class="dot-pulse"></div></div></div></div>';
    msgContainer.appendChild(li)


    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            // document.getElementById('data').innerText = response.ChatGPT;

            btn.innerHTML = 'Search';

            chatgpt[chatgpt.length - 1].innerText = response.response;
            window.scrollTo(0, window.length);

            btn.removeAttribute('disabled');
            // console.log(response)
        })
        .catch(err => console.error(err));
})