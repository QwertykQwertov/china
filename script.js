console.log('Расширение подключилось')

// https://avas.mfa.gov.cn/qzyyCoCommonController.do?yyappointment&locale=ru_RU&start=go

const params = (new URL(document.location)).searchParams
const start = params.get("start")
const dateTo = new Date('2023-06-30')
const chats = ['288193036','594659453','1125986668','757903949']

let isComplete = false
let message = 'Найдены свободные записи:\n'
if (start == 'go') {
  setTimeout(startParse, 5000)
}

function startParse() {
  console.log('Parse is started...')

  const openDates = document.querySelectorAll('.calendar-ul-li-enable')

  for (let i = 0; i < openDates.length; i++) {
    const date = new Date(openDates[i].attributes[0].nodeValue)
    if (date < dateTo) {
      const available = Number(openDates[i].firstElementChild.textContent.replace(/\D/g, ''))
      if (available > 0) {
        message += `  ${getBeautyDate(date)}: ${available}, \n`
        isComplete = true
      }
    }
  }

  console.log('Parse is complete.')

  if (isComplete) {
    for(chat_id of chats){
      sendMessage(message, chat_id)
    }
  } else {
    setTimeout(() => location.reload(), 300000)
  }
}

function sendMessage(text) {
  const body = {
    chat_id,
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

function getBeautyDate(date) {
  return `${date.getDate()} июня 2023`
}