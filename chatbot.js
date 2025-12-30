
async function query(data) {
    const response = await fetch(
        "https://cloud.flowiseai.com/api/v1/prediction/1973e0f8-92d5-4160-91c9-e78f01b8777e",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    return await response.json();
}

function toggleChat() {
    const chat = document.getElementById("chatbox");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const messages = document.getElementById("chat-messages");
    const userText = input.value.trim();
    if (!userText) return;

    // Exibe a mensagem do usuário
    messages.innerHTML += `<div><strong>Você:</strong> ${userText}</div>`;
    input.value = "";

    // Mostra o "digitando..." ou loading
    const loadingId = `loading-${Date.now()}`;
    messages.innerHTML += `<div id="${loadingId}"><em>café está digitando...</em></div>`;
    messages.scrollTop = messages.scrollHeight;

    // Chama a API
    query({ question: userText }).then(response => {
        const answer = response.text || "Desculpe, não entendi.";

        // Substitui a mensagem de "digitando..." pela resposta
        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) {
            loadingElem.outerHTML = `<div><strong>café:</strong> ${answer}</div>`;
        }

        messages.scrollTop = messages.scrollHeight;
    }).catch(error => {
        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) {
            loadingElem.outerHTML = `<div><strong>café:</strong> Ocorreu um erro ao buscar a resposta.</div>`;
        }
        console.error("Erro ao consultar a API:", error);
    });
}