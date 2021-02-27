const splash = document.querySelector('header');
const timeDisplay = document.querySelector('.time-display');
const times = [
  { city: 'Los Angeles', country: 'USA', difference: -8 },
  { city: 'New York', country: 'USA', difference: -5 },
  { city: 'Rio De Janeiro', country: 'BRA', difference: -1 },
  { city: 'Paris', country: 'FRA', difference: 1 },
  { city: 'Istanbul', country: 'TUR', difference: 3 },
  { city: 'Dubai', country: 'ARE', difference: 4 },
  { city: 'Bangkok', country: 'THA', difference: 7 },
  { city: 'Tokyo', country: 'JPN', difference: 9 },
  { city: 'Sydney', country: 'AUS', difference: 11 },
  { city: 'Honolulu', country: 'USA', difference: -10 },
];
let localTime = document.querySelector('.local-time');
let localDate = document.querySelector('.local-date');

function getLocalTime(hours) {
  let meridian = 'am';
  let sunshine = '<i class="fas fa-sun"></i>';

  if (hours < 0) {
    hours += 24;
  } else if (hours > 23) {
    hours -= 24;
  }

  if (hours === 12) {
    meridian = 'pm';
  }

  if (hours === 0) {
    hours = 12;
  }

  if (hours > 12) {
    hours -= 12;
    meridian = 'pm';
  }

  if((hours <= 6 && meridian === 'am') || (hours >= 6 && hours <= 11 && meridian === 'pm') || (hours === 12 && meridian === 'am')) {
    sunshine = '<i class="far fa-moon"></i>';
  }

  return [hours, meridian, sunshine];
}

function changeHourHand(hour) {
  const hourHands = document.querySelectorAll('.hours');
  hourHands.forEach(hand => {
    times.forEach(time => {
      if (hand.dataset['city'] === time.dataset) {
        const adjustedHour = getLocalTime(hour + time.difference);
        const hoursDegrees = ((adjustedHour[0] / 12) * 360) + 90;
        hand.style.transform = `rotate(${hoursDegrees}deg)`;
      };
    });
  });
}

function getTime() {
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = `${now.getUTCMinutes() < 10 ? '0' : ''}${now.getUTCMinutes()}`;
  const seconds = `${now.getUTCSeconds() < 10 ? '0' : ''}${now.getUTCSeconds()}`;

  localDate.textContent = now.toLocaleDateString();
  localTime.textContent = now.toLocaleTimeString();

  return [hours, minutes, seconds];
}

function moveHands(minutes, seconds) {
  const minuteHand = document.querySelectorAll('.minutes');
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  minuteHand.forEach(hand => {
    hand.style.transform = `rotate(${minutesDegrees}deg)`;
  });

  const secondHand = document.querySelectorAll('.seconds');
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.forEach(hand => {
    hand.style.transform = `rotate(${secondsDegrees}deg)`;
  });
}

function addDataSet() {
  times.forEach(time => {
    time.dataset = time.city.replace(/\s+/g, '-').toLowerCase();
  });
}

function startClocks() {
  addDataSet();

  let clockBuilder = '';
  const [hours, minutes, seconds] = getTime();

  const clocks = times.map(time => {
    const [adjustedHours, meridian, sunshine] = getLocalTime(hours + time.difference);
    const html = `
      <div class="city">
        <h2>${time.city}, ${time.country}</h2>
        <span class="digital">${adjustedHours}:${minutes}:${seconds} ${meridian}</span>            
        <div class="clock">
          <div class="face"></div><div class="sunshine">${sunshine}</div>
          <div class="center"></div>
          <div class="hours" data-city="${time.dataset}"></div>
          <div class="minutes"></div>
          <div class="seconds"></div>
        </div>
      </div>`;
    clockBuilder += html;
  });

  timeDisplay.innerHTML = clockBuilder;
  moveHands(minutes, seconds);
  changeHourHand(hours);
}

setTimeout(() => { splash.style.height = '125px'; }, 2000);
startClocks();
setInterval(startClocks, 1000);