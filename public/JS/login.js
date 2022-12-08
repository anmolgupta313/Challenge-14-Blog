
async function login(event){ try{
    event.prevenrDefault();
    const userName= document.querySelector("#user-name").value;
    const password= document.querySelector("#password-login").value;

    const response=  await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            userName,
            password
        }),
        headers:{'Content-type': 'application/json'}
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }else{
        alert(response.statusText);
    }
} catch(err){
    console.log(err);
}
   
}

const loginBtn= document.querySelector("#btn-submit");

loginBtn.addEventListener("submit",login);