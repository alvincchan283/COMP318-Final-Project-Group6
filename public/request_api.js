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

async function connectToOpenAI(event) {
    const textarea = document.querySelector('textarea');
    if (textarea.value.length === 0) {
        displayAlert("Please type your writing in the text box before spell checking.");
        return;
    }

    const resultContainer = document.querySelector('#result');
    resultContainer.innerHTML = "";
    let endpoint = "";

    switch (event.target.getAttribute('id')) {
        case "spell-btn":
            endpoint = "/spell-check";
            break;
        case "grammar-btn":
            endpoint = "/grammar-check";
            break;
        case "paraphrase-btn":
            endpoint = "/paraphrase";
            break;
        case "summarize-btn":
            endpoint = "/summarize";
            break;
        default:
            endpoint = "/";
            break;
    }

    displayAlert("Request submitted, waiting for responses ......", "success");

    try {
        const response = await fetch(endpoint, {
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
}

document.querySelectorAll('button.btn-primary').forEach(btn => btn.addEventListener('click', connectToOpenAI));