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

    const url = 'https://open-ai21.p.rapidapi.com/conversation';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'b50a05bcc2msh100ae93e7d7415bp1a0cadjsnf6f85114db8e',
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: userInput
                }
            ],
            max_token: 500,
            temperature: 1,
            web_access: false
        })
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

            chatgpt[chatgpt.length - 1].innerText = response.ChatGPT;
            window.scrollTo(0, window.length);

            btn.removeAttribute('disabled');
            // console.log()
        })
        .catch(err => console.error(err));
})