

async function addPost(event){ try{
    event.preventDefault();
    const titleInputValue= document.querySelector("#post-title").value;
    const postContentValue= document.querySelector("#post-text-area").value;
    

    const response= await fetch('/api/blog',{
        method: "POST",
        body: JSON.stringify({
            titleInputValue,
            postContentValue
        }),
        headers:{
            "Content-type":"application/json",
        },
    });

    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert(response.statusText);
    }
} catch(err){
    console.log(err);
}

}

const postSubmitBtn= document.querySelector("#post-add-btn");

postSubmitBtn.addEventListener('click', addPost);