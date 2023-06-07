console.log('Расширение подключилось')

// https://avas.mfa.gov.cn/qzyyCoCommonController.do?yyappointment&locale=ru_RU&start=go

const params = (new URL(document.location)).searchParams
const start = params.get("start")
const dateTo = new Date('2023-06-30')

let isComplete = false

if (start == 'go') {
  setTimeout(startParse(), 5000)
}

function startParse() {
  console.log('Parse is started...')

  const openDates = document.querySelectorAll('.calendar-ul-li-enable')

  for (let i = 0; i < openDates.length; i++) {
    const date = new Date(openDates[i].attributes[0].nodeValue)
    if (date < dateTo) {
      console.dir(openDates[i])
      const available = Number(openDates[i].firstElementChild.textContent.replace(/\D/g, ''))
      console.log(available)
      if (available > 0) {
        alert('Есть открытые даты!!!')
        // Тут GET
        return
      }
    }
  }

  console.log('Parse is complete.')

  if (!isComplete) {
    setTimeout(() => location.reload(), 300000)
  }
} 