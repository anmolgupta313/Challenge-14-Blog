async function signUp(event){
    console.log('entering the sign up')
    event.preventDefault();
    try{
        
        const userNameSignup= document.querySelector("#username-signup").value;
        const paswordSignUp= document.querySelector("#password-signup").value;

        const response= await fetch('http://localhost:3001/api/user/',{
            method:'POST',
            body: JSON.stringify({
                userName:userNameSignup,
                password:paswordSignUp
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
alert(response)
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

signupBtn.addEventListener("click", signUp);