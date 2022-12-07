async function signUp(event){
    try{
        event.preventDefault();
        const userNameSignup= document.querySelector("#username-signup");
        const paswordSignUp= document.querySelector("#password-signup");

        const response= await fetch('/api/user',{
            method:'POST',
            body: JSON.stringify({
                userNameSignup,
                paswordSignUp
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }else{
            alert(response.statusText);
        }
    }catch(err){
        console.log(err);
    }
}

const signupBtn = document.querySelector("#signup-btn");

signupBtn.addEventListener("submit", signUp);