import msgFn from './messages.js';

const form = document.querySelector('form');
const msgArea = document.querySelector('#message-area');
const nameInput = form.elements.name;

let NAME;
let intervalId;
let started = false;

function focusInput() {
  nameInput.focus();
}

function toggleButtons() {
  const triggerBtn = document.querySelector('#trigger-notification');
  const startBtn = form.elements.start;
  const stopBtn = form.elements.stop;
  const buttons = [triggerBtn, startBtn, stopBtn];
  buttons.map(btn => btn.classList.toggle('hidden'));
}

function sendNotification(text) {
  const options = {
    body: text,
    icon: 'img/pikachu.png'
  };
  const n = new Notification('Encouragement', options);
  window.setTimeout(n.close.bind(n), 5000);
}

function generateMessage() {
  const messages = msgFn(NAME);
  return messages[Math.floor(Math.random() * messages.length)];
}

function startNotificationInterval() {
  intervalId = window.setInterval(() => {
    const randomMsg = generateMessage();
    sendNotification(randomMsg);
  }, 1800000);
  started = true;
}

function isBrowserCompatible() {
  if (!('Notification' in window)) {
    return false;
  }
  return true;
}

function initNotifications() {
  if (!isBrowserCompatible()) {
    alert(
      "Sorry, it looks like your browser does not support notifications 😞, if you're on mobile try on your computer 👩‍💻👨‍💻"
    );
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        sendNotification(`Hi there ${NAME}! 👋`);
        startNotificationInterval();
        msgArea.innerHTML = `awesome, you're all set ${NAME} 💯<br/><br/>keep this tab open in the background and you'll receive <br/>encouraging notifications every so often ⭐`;
      } else {
        msgArea.innerHTML =
          'Sorry, you need to Allow notifications if you want to be encouraged!';
      }
      toggleButtons();
    });
  }
}

function startNotifications() {
  NAME = nameInput.value;
  nameInput.blur();
  initNotifications();
}

function stopNotifications() {
  window.clearInterval(intervalId);
  msgArea.innerHTML = '';
  started = false;
  toggleButtons();
}

document.querySelector('body').addEventListener('click', event => {
  if (event.target.id === 'stop-notifications') {
    stopNotifications();
  }
  if (event.target.id === 'trigger-notification') {
    sendNotification(generateMessage());
  }
});

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  if (started) {
    return;
  }
  startNotifications(event);
});

focusInput();
