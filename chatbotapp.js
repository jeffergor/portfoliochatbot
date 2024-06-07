class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();

document.addEventListener('DOMContentLoaded', function () {
    const chatboxButton = document.getElementById('chatboxButton');
    const chatbox = document.querySelector('.chatbox__support');
    const sendButton = document.querySelector('.send__button');
    const chatMessages = document.querySelector('.chatbox__messages div');
    const inputField = document.querySelector('.chatbox__footer input');

    chatboxButton.addEventListener('click', () => {
        chatbox.classList.toggle('chatbox--active');
    });

    sendButton.addEventListener('click', () => {
        const userMessage = inputField.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'messages__item--visitor');
            generateResponse(userMessage);
            inputField.value = '';
        }
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userMessage = inputField.value.trim();
            if (userMessage) {
                addMessage(userMessage, 'messages__item--visitor');
                generateResponse(userMessage);
                inputField.value = '';
            }
        }
    });

    function addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('messages__item', type);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateResponse(message) {
        let response = '';

        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('hi')) {
            response = '¡hi! ¿How can i help you today?';
        } else if (lowerCaseMessage.includes('proyectos') || lowerCaseMessage.includes('projects')) {
            response = 'You can  see my projects in the section "projects" of this portfolio but i can help you by telling you about some projects: 1 Vision: Detect level and advanced of the breast Cancer with azure platform vision 2. System planetary with different physics characteristics among others projects';
        } else if (lowerCaseMessage.includes('contacto') || lowerCaseMessage.includes('contact')) {
            response = 'You´re can contact me in my email : jefferson@example.com or my number telephone and whatsapp +573124043630.';
        } else if (lowerCaseMessage.includes('cv') || lowerCaseMessage.includes('resume')) {
            response = 'Sure , my resume is : .';
        } else if (lowerCaseMessage.includes('¿Como te llamas?') || lowerCaseMessage.includes('What´s your name?') | lowerCaseMessage.includes('como te llamas?')) {
            response = 'My name is Jeff and my creator Jefferson Parrasi Hernandez';
        } else if (lowerCaseMessage.includes('¿Cuantos años tienes?') || lowerCaseMessage.includes('How old are you?')) {
            response = 'I don´t know but my creation was 06/05/2024, the age of my creator is 23 years .';
        } else if (lowerCaseMessage.includes('cv') || lowerCaseMessage.includes('resume')) {
            response = 'Sure , my resume is : .';
        } else if (lowerCaseMessage.includes('¿Cuantas tecnologias manejas?') || lowerCaseMessage.includes('How techlogies you known?')) {
            response = 'My creator known 6 technologies and 2 platform ai and structure maths.';
        } else if (lowerCaseMessage.includes('¿Cuantos idiomas hablas?') || lowerCaseMessage.includes('How many languages speaks?')| lowerCaseMessage.includes('cuantos idiomas hablas?')) {
            response = 'I speak 2 languages english intermediate and spanish advanced but my creator speak 8 languages english intermediate, portuguese advanced, Spanish native, chinese beginner, korean beginner,hebrew intermediate, Russian beginner, german beginner-intermediate, Latin beginner-intermediate ';
        } else if (lowerCaseMessage.includes('Gracias') || lowerCaseMessage.includes('Thank you')| lowerCaseMessage.includes('Thanks')| lowerCaseMessage.includes('Muchas gracias')) {
            response = 'You´re welcome and thanks you for consider this portfolio, i hope to talk to you again';
        } else {
            response = 'I´m sorry i don´t understand you, please you can reform Question?';
        }

        setTimeout(() => {
            addMessage(response, 'messages__item--operator');
        }, 1000);
    }
});

let sliderInner=
document.querySelector(".slider--inner")

let images =
sliderInner.querySelectorAll("img");

let index = 1;

setInterval(function () {
  let percentage = index * -100;
  sliderInner.style.transform=
  "translateX(" + percentage + "%)";
   index++;
   if (index > (images.length -1)){
    index = 0;
   }
}, 3000);