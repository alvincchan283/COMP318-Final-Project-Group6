function displayAlert(alert, style = 'danger') {
    const alertContainer = document.querySelector('.alert-row');
    if (!alert) {
        alertContainer.innerHTML = '';
    } else {
        alertContainer.innerHTML = `
        <div class="alert alert-${style} w-50 mx-auto text-center" role="alert">
            ${alert}
        </div>
    `;
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', async e => {
        const textarea = document.querySelector('textarea');
        if (textarea.value.length === 0) {
            displayAlert("Please type your writing in the text box before selecting a function.");
            return;
        }

        const resultContainer = document.querySelector('#result');
        resultContainer.innerHTML = "";
        displayAlert("Request submitted, waiting for ChatGPT responses ......", "success");

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: textarea.value
                })
            });
            
            const reply = await response.json();
            resultContainer.innerHTML = reply.replyText;
            displayAlert(null);

          } catch (error) {
            displayAlert(error);
          }
    });
})