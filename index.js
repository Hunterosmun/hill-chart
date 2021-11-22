// ---- Helper Functions -------------------------------------------------------

function bind (selector, fn, container = document) {
  container.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('click', fn)
  })
}

function createElement (tag, classes, text = '') {
  const el = document.createElement(tag)
  if (classes) classes.split(' ').forEach(one => el.classList.add(one))
  el.innerText = text
  return el
}

function createInput (value = '', placeholder = 'Your Text Here', theclass) {
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = placeholder
  input.value = value
  input.classList.add(theclass)
  return input
}

// ---- Business Logic Functions -----------------------------------------------

function minusFn (e) {
  const num = e.target.parentElement.querySelector('.num')
  const number = parseInt(num.innerText, 10)
  if (number === 0) return
  num.innerText = number - 1
}

function plusFn (e) {
  const num = e.target.parentElement.querySelector('.num')
  const number = parseInt(num.innerText, 10)
  if (number === 100) return
  num.innerText = number + 1
}

function saveFn (e) {
  const parent = e.target.closest('.chart')
  parent.classList.add('saved')
  parent.querySelectorAll('.btn').forEach(btn => {
    btn.remove()
  })

  parent.querySelector('.bottom-options').remove()

  parent.querySelectorAll('input').forEach(input => {
    input.before(createElement('div', '', input.value))
    input.remove()
  })

  parent
    .querySelector('.chart-data')
    .appendChild(createElement('button', 'btn edit', 'Edit'))
  bind('.edit', editFn, parent)
}

function newAspectFn (e) {
  // make the thing to insert
  const container = createElement('div', 'single-element')
  container.appendChild(createInput())
  container.appendChild(createElement('button', 'btn minus', '-'))
  container.appendChild(createElement('span', 'num', '0'))
  container.appendChild(createElement('button', 'btn plus', '+'))
  container.appendChild(createElement('button', 'btn delete-row', 'Delete'))

  // find the spot, insert the thing
  e.target.parentElement.before(container)

  bind('.plus', plusFn, container)
  bind('.minus', minusFn, container)
  bind('.delete-row', deleteRowFn, container)
}

function newChartFn (e) {
  const container = createElement('div', 'chart')

  container.appendChild(createInput('', 'Title', 'title'))
  const chartData = createElement('div', 'chart-data')
  const singleRow = createElement('div', 'single-element')
  singleRow.appendChild(createInput())
  singleRow.appendChild(createElement('button', 'btn minus', '-'))
  singleRow.appendChild(createElement('span', 'num', '0'))
  singleRow.appendChild(createElement('button', 'btn plus', '+'))
  singleRow.appendChild(createElement('button', 'btn delete-row', 'Delete'))
  chartData.appendChild(singleRow)
  container.appendChild(chartData)
  const bottomOptions = createElement('div', 'bottom-options')
  bottomOptions.appendChild(
    createElement('button', 'btn new-aspect', 'New Aspect')
  )
  bottomOptions.appendChild(
    createElement('button', 'btn delete-chart', 'Delete Chart')
  )
  bottomOptions.appendChild(createElement('button', 'btn save', 'Save'))
  chartData.appendChild(bottomOptions)

  e.target.before(container)
  // add event listeners
  bind('.minus', minusFn, container)
  bind('.plus', plusFn, container)
  bind('.new-aspect', newAspectFn, container)
  bind('.save', saveFn, container)
  bind('.delete-chart', deleteChartFn)
  bind('.delete-row', deleteRowFn)
}

function editFn (e) {
  const parent = e.target.closest('.chart')
  parent.classList.remove('saved')

  const first = parent.querySelector('div')
  const titleText = parent.querySelector('div').innerText
  if (titleText) {
    first.firstChild.remove()
    first.appendChild(createInput(titleText, '', 'title'))
  } else {
    first.appendChild(createInput('', 'Title', 'title'))
  }

  parent.querySelectorAll('.single-element').forEach(container => {
    const value = container.querySelector('div').innerText
    const num = container.querySelector('span').innerText
    container.innerHTML = ''
    container.appendChild(createInput(value))
    container.appendChild(createElement('button', 'btn minus', '-'))
    container.appendChild(createElement('span', 'num', num))
    container.appendChild(createElement('button', 'btn plus', '+'))
    container.appendChild(createElement('button', 'btn delete-row', 'Delete'))
  })

  const bottom = createElement('div', 'bottom-options')
  bottom.appendChild(createElement('button', 'btn new-aspect', 'New Aspect'))
  bottom.appendChild(
    createElement('button', 'btn delete-chart', 'Delete Chart')
  )
  bottom.appendChild(createElement('button', 'btn save', 'Save'))

  parent.querySelector('.chart-data').appendChild(bottom)
  parent.querySelector('.edit').remove()
  bind('.minus', minusFn, parent)
  bind('.plus', plusFn, parent)
  bind('.new-aspect', newAspectFn, parent)
  bind('.save', saveFn, parent)
  bind('.delete-row', deleteRowFn, parent)
  bind('.delete-chart', deleteChartFn, parent)
}

function deleteRowFn (e) {
  const btn = e.target.parentElement.remove()
}

function deleteChartFn (e) {
  const btn = e.target.parentElement.parentElement.parentElement.remove()
}

// ---- initial event listeners ------------------------------------------------

bind('.minus', minusFn)
bind('.plus', plusFn)
bind('.new-aspect', newAspectFn)
bind('.save', saveFn)
bind('.new-chart', newChartFn)
bind('.edit', editFn)
bind('.delete-row', deleteRowFn)
bind('.delete-chart', deleteChartFn)
