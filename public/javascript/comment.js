document.querySelector("#commentbtn").addEventListener('submit', commentFormHandler);
commentFormHandler = async (event) => {
event.preventDefault();
  const comment_text= document.querySelector('#comment_text').value.trim();
try { 
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment_text }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

    
} catch (error) {
    alert(error.message)
}
};