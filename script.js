const chatBox = document.getElementById("chat-box");

// Send Message
async function sendMessage() {

    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (!message) return;

    let model = document.getElementById("model").value;

    // Show user message
    chatBox.innerHTML += `
        <div class="user">
            ${message}
        </div>
    `;

    input.value = "";

    // Loading message
    chatBox.innerHTML += `
        <div class="bot-message" id="typing">
            ⚡ Generating response...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        let response = await fetch('/chat', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                message: message,
                model: model
            })
        });

        let data = await response.json();

        document.getElementById("typing").remove();

        // Show AI response
        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.response}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

        // Refresh sidebar history
        loadHistory();

    } catch (error) {

        let typing = document.getElementById("typing");

        if (typing) {
            typing.remove();
        }

        chatBox.innerHTML += `
            <div class="bot-message">
                ❌ Error connecting to AI model.
            </div>
        `;

        console.error(error);
    }
}


// Load Previous Chat
function loadChat(userMessage, botResponse) {

    chatBox.innerHTML = `
        <div class="user">
            ${userMessage}
        </div>

        <div class="bot-message">
            ${botResponse}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Load Sidebar History
async function loadHistory() {

    try {

        let response = await fetch('/history');
        let chats = await response.json();

        let history = document.getElementById("history");

        if (!history) return;

        history.innerHTML = "";

        chats.forEach(chat => {

            let item = document.createElement("div");

            item.className = "history-item";

            item.innerText =
                "💬 " +
                chat[1].substring(0, 25) +
                "...";

            item.onclick = () => {
                loadChat(chat[1], chat[2]);
            };

            history.appendChild(item);

        });

    } catch (error) {

        console.error(error);

    }
}


// New Chat Button
function clearChat() {

    chatBox.innerHTML = "";

}


// Enter Key Support
document.getElementById("user-input")
.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Load History on Startup
loadHistory();