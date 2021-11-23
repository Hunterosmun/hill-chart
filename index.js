import { nanoid } from 'nanoid'
import randomColor from 'random-color'
// ---- Helper Functions -------------------------------------------------------

function bind (selector, fn, container = document, event = 'click') {
  container.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener(event, fn)
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
  const number = parseInt(num.innerText, 10) - 1
  if (number < 0) return
  num.innerText = number

  //here down is moving the circle
  const element = e.target.closest('.single-element').dataset.id //maybe put this into the next lines querySelector?
  const circle = e.target
    .closest('.content')
    .querySelector(`circle[data-id="${element}"]`)
  let newX = parseInt(circle.getAttribute('cx'), 10)
  // newX = Math.round(((newX - 6) / 238) * 100)
  // newX = (newX / 100) * 238 - 6
  // newX = ((newX/100) * 238)+6
  newX = (number / 100) * 238 + 6
  console.log('minus' + newX)
  if (newX < MIN) newX = MIN

  const mid = (MAX - MIN) / 2
  let newY = Math.abs(((newX - MIN - mid) / mid) * 60)
  if (newY < MIN) newY = MIN
  if (newY > 54) newY = 54

  circle.setAttribute('cx', newX)
  circle.setAttribute('cy', newY)
  const text = e.target
    .closest('.content')
    .querySelector(`text[data-id="${element}"]`)
  text.setAttribute('x', newX)
  text.setAttribute('y', newY + 20)
}

function plusFn (e) {
  const num = e.target.parentElement.querySelector('.num')
  const number = parseInt(num.innerText, 10) + 1
  if (number > 100) return
  num.innerText = number

  //here down is moving the circle
  const element = e.target.closest('.single-element').dataset.id //maybe put this into the next lines querySelector?
  const circle = e.target
    .closest('.content')
    .querySelector(`circle[data-id="${element}"]`)
  let newX = parseInt(circle.getAttribute('cx'), 10)
  // newX = Math.round(((newX - 6) / 238) * 100)
  // newX = (newX / 100) * 238 - 6
  newX = (number / 100) * 238 + 6
  console.log('plus' + newX)
  if (newX > MAX) newX = MAX

  const mid = (MAX - MIN) / 2
  let newY = Math.abs(((newX - MIN - mid) / mid) * 60)
  if (newY < MIN) newY = MIN
  if (newY > 54) newY = 54

  circle.setAttribute('cx', newX)
  circle.setAttribute('cy', newY)
  const text = e.target
    .closest('.content')
    .querySelector(`text[data-id="${element}"]`)
  text.setAttribute('x', newX)
  text.setAttribute('y', newY + 20)
}

function saveFn (e) {
  const parent = e.target.closest('.chart')
  parent.classList.add('saved')
  parent.querySelectorAll('.btn').forEach(btn => {
    btn.remove()
  })

  parent.querySelector('.bottom-options').remove()

  parent.querySelectorAll('input').forEach(input => {
    if (input.classList.contains('input')) {
      const text = parent.querySelector(
        `text[data-id="${input.parentElement.dataset.id}"]`
      )
      text.textContent = `${input.value}`
    }
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
  const id = nanoid()
  const container = createElement('div', 'single-element')
  container.dataset.id = id
  const input = createInput('', 'Your Text Here', 'input')
  container.appendChild(input)
  container.appendChild(createElement('button', 'btn minus', '-'))
  container.appendChild(createElement('span', 'num', '0'))
  container.appendChild(createElement('button', 'btn plus', '+'))
  container.appendChild(createElement('button', 'btn delete-row', 'Delete'))

  // find the spot, insert the thing
  e.target.closest('.bottom-options').before(container)

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )
  circle.setAttribute('cx', '10')
  circle.setAttribute('cy', '30')
  circle.setAttribute('r', '6')
  circle.setAttribute('fill', randomColor().hexString())
  circle.dataset.id = id
  e.target
    .closest('.chart')
    .querySelector('svg')
    .appendChild(circle)

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  text.setAttribute('x', '10')
  text.setAttribute('y', '50')
  text.setAttribute('font-size', '15')
  text.dataset.id = id
  e.target
    .closest('.chart')
    .querySelector('svg')
    .appendChild(text)

  bind('.plus', plusFn, container)
  bind('.minus', minusFn, container)
  bind('.delete-row', deleteRowFn, container)
  bind('.input', updateText, container, 'input')
  setupCircle(circle)
}

function newChartFn (e) {
  const container = createElement('div', 'chart')
  const content = createElement('div', 'content')
  container.appendChild(createInput('', 'Title', 'title'))
  container.appendChild(content)

  const chartData = createElement('div', 'chart-data')
  content.appendChild(chartData)
  const bottomOptions = createElement('div', 'bottom-options')
  const newaspect = createElement('button', 'btn new-aspect', 'New Aspect')
  bottomOptions.appendChild(newaspect)
  bottomOptions.appendChild(
    createElement('button', 'btn delete-chart', 'Delete Chart')
  )
  bottomOptions.appendChild(createElement('button', 'btn save', 'Save'))
  chartData.appendChild(bottomOptions)

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '250')
  svg.setAttribute('height', '60')
  svg.setAttribute('viewBox', '0 0 250 59')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    `M 0 60
  C 75  30 90  0  125 0
  C 160 0  175 30 250 60`
  )
  path.setAttribute('stroke', '#777')
  path.setAttribute('fill', 'none')
  svg.appendChild(path)

  content.appendChild(svg)

  e.target.before(container)
  // add event listeners
  bind('.minus', minusFn, container)
  bind('.plus', plusFn, container)
  bind('.new-aspect', newAspectFn, container)
  bind('.save', saveFn, container)
  bind('.delete-chart', deleteChartFn)
  bind('.delete-row', deleteRowFn)

  newAspectFn({ target: newaspect })
}

function editFn (e) {
  const parent = e.target.closest('.chart')
  parent.classList.remove('saved')

  const first = parent.querySelector('div')
  const titleText = first.innerText
  first.before(createInput(titleText, 'Title', 'title'))
  first.remove()

  // parent.querySelectorAll('.input').forEach(input => {
  //   parent.querySelector(`text[data-set="${input.dataset.id}"]`).textContent =
  //     input.value
  // })

  parent.querySelectorAll('.single-element').forEach(container => {
    const value = container.querySelector('div').innerText
    const num = container.querySelector('span').innerText
    container.innerHTML = ''
    container.appendChild(createInput(value, 'Your Text Here', 'input'))
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
  bind('.input', updateText, parent, 'input')
}

function deleteRowFn (e) {
  const id = e.target.closest('.single-element').dataset.id
  e.target
    .closest('.chart')
    .querySelector(`circle[data-id="${id}"]`)
    .remove()
  e.target
    .closest('.chart')
    .querySelector(`text[data-id="${id}"]`)
    .remove()
  e.target.closest('.single-element').remove()
}

function deleteChartFn (e) {
  e.target.closest('.chart').remove()
}

function updateText (e) {
  const id = e.target.closest('.single-element').dataset.id
  e.target
    .closest('.chart')
    .querySelector(`text[data-id="${id}"]`).textContent = e.target.value
}

const MIN = 6
const MAX = 244
let dragDetails = null
function setupCircle (circle) {
  circle.addEventListener('mousedown', e => {
    if (e.target.closest('.chart').classList.contains('saved')) return
    e.preventDefault()
    dragDetails = {
      startX: e.clientX,
      cx: parseInt(circle.getAttribute('cx'), 10),
      circle: e.target,
      div: document.querySelector(
        `.single-element[data-id="${circle.dataset.id}"] .num`
      ),
      text: e.target
        .closest('svg')
        .querySelector(`text[data-id="${circle.dataset.id}"]`)
      // might need to set a textY and textX, but we'll see
    }
  })

  window.addEventListener('mousemove', e => {
    if (!dragDetails) return
    const { startX, cx, circle, div, text } = dragDetails

    let newX = e.clientX - startX + cx
    if (newX < MIN) newX = MIN
    if (newX > MAX) newX = MAX

    const mid = (MAX - MIN) / 2
    let newY = Math.abs(((newX - MIN - mid) / mid) * 60)
    if (newY < MIN) newY = MIN
    if (newY > 54) newY = 54

    div.innerText = Math.round(((newX - 6) / 238) * 100)

    circle.setAttribute('cx', newX)
    circle.setAttribute('cy', newY)
    text.setAttribute('x', newX)
    text.setAttribute('y', newY + 20)
  })

  window.addEventListener('mouseup', e => {
    dragDetails = null
  })
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
bind('.input', updateText, undefined, 'input')

document.querySelectorAll('circle').forEach(circle => {
  setupCircle(circle)
})
