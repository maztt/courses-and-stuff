const numNotifications = document.getElementById('number-notifications');
const marker = document.getElementById('btn-read-all')
const divs = document.querySelector('div.messages.unread')
const dots = document.querySelectorAll('span.dot')

let counter = 0;

// 1. Count how many content-boxes are within "messages unread"
for (const _child of divs.children) {
  counter++;
}

// 2. Get that count and display in numNotifications
numNotifications.innerText = counter;


// 3. Clicking marker should change unread to read within the classes
// 4. All red dots elements inside divs should be also removed
marker.addEventListener('click', (e) => {

  for (const child of divs.children) {

    if (counter > 0) {
      counter--;
    } else {
      return;
    }

    child.parentElement.classList.remove('unread');
    child.parentElement.classList.add('read')
  }

  dots.forEach((dot) => {
    dot.innerText = '';
  })
  
  numNotifications.innerText = counter;
})