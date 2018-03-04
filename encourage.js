let nameInput;
let name;
let intervalId;
let started = false;
function focusInput() {
  nameInput = document.querySelector('form').name;
  nameInput.focus();
}
function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
// ready(focusInput);

function sendNotification(text) {
  const options = {
    body: text,
    icon: 'img/pikachu.png',
  };
  const n = new Notification('Encouragement', options);
  window.setTimeout(n.close.bind(n), 5000);
}
function generateMessage(n) {
  const messages = [
    `You can do it, ${name}! 💪`,
    'Breathe, you got this! 🤗',
    `Hey ${name}, you're awesome! 😊`,
    `KEEP CRUSHING IT ${name}! 👊`,
    `You da you da best ${name} 💯`,
    'YASSSS KEEP IT UP! 🙌',
    `You are excellence, ${name}! 👍`,
    'Keep calm and go go go 👑',
    'Do. Or do not. There is no try. 🤓',
    "Don't watch the clock; keep going. ⏰",
    "⭐ You're a star! ⭐",
  ];
  return n === 0
    ? messages[0]
    : messages[Math.floor(Math.random() * messages.length)];
}
function startNotificationInterval() {
  let randomMsg = generateMessage(0);
  intervalId = window.setInterval(() => {
    sendNotification(randomMsg);
    randomMsg = generateMessage();
  }, 1800000);

  started = true;
}

function greetingNotification() {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert("Sorry, it looks like your browser does not support notifications 😞, if you're on mobile try on your computer 👩‍💻👨‍💻",);
    return false;
  } else if (Notification.permission === 'granted') {
    sendNotification(`Hi there ${name}! 👋`);
    startNotificationInterval();
    return true;
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        sendNotification(`Hi there ${name}! 👋`);
        startNotificationInterval();
        return true;
      }
    });
  }
}

function start(e) {
  e.preventDefault();
  if (started) {
    return;
  }
  name = nameInput.value;
  nameInput.blur();
  const canSend = greetingNotification(name);
  if (!canSend) {
    return;
  }
  document.querySelector('#successMessage',).innerHTML = `awesome, you're all set ${name} 💯<br/><br/>keep this tab open in the background and you'll receive <br/>encouraging notifications every so often ⭐ <br/><br/><button id="triggerNotification">🚨 emergency notification</button><br/><br/><button id="stopLink">🛑 stop the madness</button>`;
}

window.onload = () => {
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
};
