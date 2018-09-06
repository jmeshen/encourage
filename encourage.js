let NAME;
const nameInput = document.querySelector('form').name;
let intervalId;
let started = false;

function focusInput() {
  nameInput.focus();
}

function sendNotification(text) {
  const options = {
    body: text,
    icon: 'img/pikachu.png',
  };
  const n = new Notification('Encouragement', options);
  window.setTimeout(n.close.bind(n), 5000);
}
function generateMessage() {
  const messages = [
    `You can do it, ${NAME}! 💪`,
    'Breathe, you got this! 🤗',
    `Hey ${NAME}, you're awesome! 😊`,
    `KEEP CRUSHING IT ${NAME.toUpperCase()}! 👊`,
    `You da you da best ${NAME} 💯`,
    'YASSSS KEEP IT UP! 🙌',
    `You are excellence, ${NAME}! 👍`,
    'Keep calm and go go go 👑',
    'Do. Or do not. There is no try. 🤓',
    "Don't watch the clock; keep going. ⏰",
    "⭐ You're a star! ⭐",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
function startNotificationInterval() {
  let randomMsg = generateMessage(0);
  intervalId = window.setInterval(() => {
    sendNotification(randomMsg);
    randomMsg = generateMessage();
  }, 1800000);

  started = true;
}

function isBrowserCompatible() {
  if (!('Notification' in window)) {
    return false;
  }
  return true;
}

function greetingNotification() {
  // Let's check if the browser supports notifications
  if (!isBrowserCompatible()) {
    alert(
      "Sorry, it looks like your browser does not support notifications 😞, if you're on mobile try on your computer 👩‍💻👨‍💻",
    );
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        sendNotification(`Hi there ${NAME}! 👋`);
        startNotificationInterval();
        document.querySelector(
          '#successMessage',
        ).innerHTML = `awesome, you're all set ${NAME} 💯<br/><br/>keep this tab open in the background and you'll receive <br/>encouraging notifications every so often ⭐ <br/><br/><button id="triggerNotification">🚨 emergency notification</button><br/><br/><button id="stopLink">🛑 stop the madness</button>`;
      } else {
        document.querySelector('#successMessage').innerHTML =          'Sorry, you need to Allow notifications if you want to be encouraged!';
      }
    });
  }
}

function start(e) {
  e.preventDefault();
  if (started) {
    return;
  }
  NAME = nameInput.value;
  nameInput.blur();
  greetingNotification();
}

focusInput();

document.querySelector('body').addEventListener('click', (event) => {
  if (event.target.id === 'stopLink') {
    window.clearInterval(intervalId);
    document.querySelector('#successMessage').innerHTML = '';
    started = false;
  }
  if (event.target.id === 'triggerNotification') {
    sendNotification(generateMessage());
  }
});

document.querySelector('.form').addEventListener('submit', (event) => {
  start(event);
});

// TODO: cleanup stop logic and appending to DOM
// change Start to Stop button
