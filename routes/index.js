const noteTitle = document.getElementsByClassName('note-title');
const noteText = document.getElementsByClassName('note-textarea');
const saveButton = document.getElementsByClassName('fa-save');

// Accepts a note object, sends post request, returns result 
const postReview = (note) =>
    // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
    fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Successful POST request:", data);
            return data;
        })
        .catch((error) => {
            console.error("Error in POST request:", error);
        });