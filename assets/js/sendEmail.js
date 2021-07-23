//emal.js fucntionality on feedback modal
function sendMail(feedbackForm) {
    emailjs.send("service_pp24j2p","template_29yfchc", {
        "from_name": feedbackForm.name.value,
        "from_email": feedbackForm.emailaddress.value,
        "game_feedback": feedbackForm.gamefeedback.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}