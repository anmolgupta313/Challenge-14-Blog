async function editPost(event){
    try{
        event.preventDefault();

        const titleEditBlog= document.querySelector("#blog-title-edit").value;
        const textAreaEdit= document.querySelector("#text-area-edit").value;

        const response= await fetch(`/api/blog/${id}`,{
            method:'PUT',
            body: JSON.stringify({
                titleEditBlog,
                textAreaEdit
            }),
            headers:{'Content-type':'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
          } else {
            alert(response.statusText);
          }
    }catch(err){
        console.log(err);
    }
}

const submitBtnEdit= document.querySelector("#edit-poat-btn");

submitBtnEdit.addEventListener("click", editPost);