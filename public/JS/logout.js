async function logout(){
    try{
        const response= await fetch('http://localhost:3001/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    } catch(err){
        console.log(err);
    }
}

const logoutBtn= document.querySelector("#btn-logout");

logoutBtn.addEventListener("click",logout);