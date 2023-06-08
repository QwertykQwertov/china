const test = [{date: '2023-06-07', available: 'Доступно:2'},{date: '2023-06-08', available: 'Доступно:4'},{date: '2023-06-09', available: 'Доступно:10'},{date: '2023-07-07', available: 'Доступно:22'},]

console.log('Расширение подключилось')

// https://avas.mfa.gov.cn/qzyyCoCommonController.do?yyappointment&locale=ru_RU&start=go

// const params = (new URL(document.location)).searchParams
const start = 'go'
const dateTo = new Date('2023-06-30')

let isComplete = false
let message = 'Найдены свободные записи:\n'
if (start == 'go') {
  setTimeout(startParse, 1000)
}

function startParse() {
  console.log('Parse is started...')

  // const openDates = document.querySelectorAll('.calendar-ul-li-enable')

  for (let i = 0; i < test.length; i++) {
    const date = new Date(test[i].date)
    if (date < dateTo) {
      // console.dir(openDates[i])
      const available = Number(test[i].available.replace(/\D/g, ''))
      console.log(available)
      if (available > 0) {
        message += `  ${getBeautyDate(date)}: ${available}, \n`
        isComplete = true
        // alert('Есть открытые даты!!!')
        // Тут GET
      }
    }
  }

  console.log('Parse is complete.')

  if (isComplete) {
    console.log('If')
    sendMessage(message)
    console.log('else')
  } else {
    console.log('Тут падает')
    // setTimeout(() => location.reload(), 300000)
  }
}

function sendMessage(text) {
  const body = {
    chat_id: '757903949',
    text
  };

  fetch('https://api.telegram.org/bot6192060744:AAGzrAyI1KddC2uozz8CwgSY4WY5GNb_pG0/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  });
}

function getBeautyDate(date){
  return  `${date.getDate()} июня 2023`
}