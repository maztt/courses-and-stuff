fetch('src/data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })

const optDaily = document.getElementById('daily')
const optWeekly = document.getElementById('weekly')
const optMonthly = document.getElementById('monthly')
const spans = document.getElementsByTagName('span')

const dailyData = data.map(item => {
  const { title, timeframes } = item;
  const { daily } = timeframes;
  return {
    title,
    daily
  };
});

const weeklyData = data.map(item => {
  const { title, timeframes } = item;
  const { weekly } = timeframes;
  return {
    title,
    weekly
  };
});

const monthlyData = data.map(item => {
  const { title, timeframes } = item;
  const { monthly } = timeframes;
  return {
    title,
    monthly
  };
  });


const allCurrentData = []

for (let i = 0; i < spans.length; i++) {
  if (spans[i].classList.contains('current')) {
    allCurrentData.push(spans[i])
  }
}




optDaily.addEventListener('click', () => {
  
  dailyDataApply()
})

optWeekly.addEventListener('click', () => {
  console.log('click')
})

optMonthly.addEventListener('click', () => {
  console.log('click')
})

function dailyDataApply() {
  allCurrentData.forEach((data) => {
    data.innerHTML = data
  })
}