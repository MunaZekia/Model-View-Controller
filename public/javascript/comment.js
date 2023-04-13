commentFormHandler = async (event) => {
event.preventDefault();
  const comment_text= document.querySelector('#comment_text').value.trim();
  const post_id=document.querySelector("#post_id").value
  console.log(comment_text,post_id);
try { 
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.reload();

    } else {
        alert(response.statusText);
    }

    
} catch (error) {
    alert(error.message)
}
};
document.querySelector("#commentform").addEventListener('submit', commentFormHandler);