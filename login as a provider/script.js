const form = {
    email : document.getElementById('email'),
    password: document.getElementById('pass'),
    submit: document.querySelector('.btn')
};
let button = form.submit.addEventListener('click', (e)=>{
    e.preventDefault();

    const login = 'URl'

    fetch(login,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: form.email.value
        }),
    })
    .then((response) => response.json())
    .then((err)=>{
        console.log(err);
        
    });
})