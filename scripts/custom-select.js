const csSelector = document.querySelector('#form__select') // the input, svg and ul as a group
const csInput = csSelector.querySelector('.form__input_type_select')
const csList = csSelector.querySelector('.form__select-list')
const csOptions = csList.querySelectorAll('.form__select-item')
const csStatus = document.querySelector('#form__select-status')
const aOptions = Array.from(csOptions)

// когда JS загружен, устанавливаем нашу отправную точку
// если JS не загружается, пользовательский выбор остается вводом обычного текста
// создаем и устанавливаем начальную точку для отслеживания состояния
let csState = "initial"
// сообщаем вспомогательным технологиям (программам чтения с экрана) названия и роли элементов в нашей группе
csSelector.setAttribute('role', 'combobox')
csSelector.setAttribute('aria-haspopup', 'listbox')
csSelector.setAttribute('aria-owns', 'custom-select-list')
csInput.setAttribute('aria-autocomplete', 'both')
csInput.setAttribute('aria-controls', 'custom-select-list')
csList.setAttribute('role', 'listbox')
csOptions.forEach(function(option) {
	option.setAttribute('role', 'option')
	option.setAttribute('tabindex', "-1")  // делаем li-элементы доступными для клавиатуры только с помощью скрипта
})


// СОБЫТИЯ
// /////////////////////////////////
csSelector.addEventListener('click', function(e) {
	const currentFocus = findFocus()
	switch(csState) {
		case 'initial' : // если состояние = начальное, toggleOpen и установка состояния на открытое
			toggleList('Open')
			setState('opened')
			break
		case 'opened':
			// если состояние = открыто и фокус на вводе, toggleShut и установка состояния на начальное
			if (currentFocus === csInput) {
				toggleList('Shut')
				setState('initial')
			} else if (currentFocus.tagName === 'LI') {
				// если состояние = открыто и сфокусироваться на списке, makeChoice, toggleShut и установить состояние закрыто
				makeChoice(currentFocus)
				toggleList('Shut')
				setState('closed')
			}
			break
		case 'filtered':
			// если состояние = отфильтровано и сфокусироваться на списке, makeChoice и установит закрытое состояние
			if (currentFocus.tagName === 'LI') {
				makeChoice(currentFocus)
				toggleList('Shut')
				setState('closed')
			} // если состояние = отфильтровано и фокус на вводе, ничего не делать (ждать следующего ввода пользователя)

			break
		case 'closed': // если состояние = закрыто, переключитьОткрыть и установить состояние как отфильтрованное? или открылся?
			toggleList('Open')
			setState('filtered')
			break
	}
})

csSelector.addEventListener('keyup', function(e) {
	doKeyAction(e.key)
})

document.addEventListener('click', function(e) {
	if (!e.target.closest('#form__select')) {
		// клик за пределами кастомного селекта, закрываем кастомный селект
		toggleList('Shut')
		setState('initial')
	}
})



///При клике на кастомный option убираем класс у других и добавляем на тот, на который был клик
Array.from(csOptions).forEach((item, index, array) => {
  item.addEventListener('click', function() {
    Array.from(csOptions).forEach(function(item) {
      item.classList.remove('form__select-item_type_selected')
    })
    item.classList.add('form__select-item_type_selected')
  })
})

Array.from(csOptions).forEach((item, index, array) => {
  item.addEventListener('keyup', function(event) {

    if(event.code === 'Enter') {
      Array.from(csOptions).forEach(function(item) {
        item.classList.remove('form__select-item_type_selected')
      })
      item.classList.add('form__select-item_type_selected');
    }
  })
})


// Функии
// /////////////////////////////////

function toggleList(whichWay) {
	if (whichWay === 'Open') {
		csList.classList.remove('form__select-list_hidden')
		csSelector.setAttribute('aria-expanded', 'true')
	} else { // === 'Закрываем'
		csList.classList.add('form__select-list_hidden')
		csSelector.setAttribute('aria-expanded', 'false')
	}
}

function findFocus() {
	const focusPoint = document.activeElement
	return focusPoint
}

function moveFocus(fromHere, toThere) {
	// берем отображаемые в данный момент параметры, которые могли быть отфильтрованы
	const aCurrentOptions = aOptions.filter(function(option) {
		if (option.style.display === '') {
			return true
		}
	})
	// не двигаться, если все параметры были отфильтрованы
	if (aCurrentOptions.length === 0) {
		return
	}
	if (toThere === 'input') {
		csInput.focus()
	}
	// возможные начальные точки
	switch(fromHere) {
		case csInput:
			if (toThere === 'forward') {
				aCurrentOptions[0].focus()
			} else if (toThere === 'back') {
				aCurrentOptions[aCurrentOptions.length - 1].focus()
			}
			break
		case csOptions[0]:
			if (toThere === 'forward') {
				aCurrentOptions[1].focus()
			} else if (toThere === 'back') {
				csInput.focus()
			}
			break
		case csOptions[csOptions.length - 1]:
			if (toThere === 'forward') {
				aCurrentOptions[0].focus()
			} else if (toThere === 'back') {
				aCurrentOptions[aCurrentOptions.length - 2].focus()
			}
			break
		default: // средний список или отфильтрованные элементы
			const currentItem = findFocus()
			const whichOne = aCurrentOptions.indexOf(currentItem)
			if (toThere === 'forward') {
				const nextOne = aCurrentOptions[whichOne + 1]
				nextOne.focus()
			} else if (toThere === 'back' && whichOne > 0) {
				const previousOne = aCurrentOptions[whichOne - 1]
				previousOne.focus()
			} else { // if whichOne = 0
				csInput.focus()
			}
			break
	}
}

function doFilter() {
	const terms = csInput.value
	const aFilteredOptions = aOptions.filter(function(option) {
		if (option.innerText.toUpperCase().startsWith(terms.toUpperCase())) {
			return true
		}
	})
	csOptions.forEach(option => option.style.display = "none")
	aFilteredOptions.forEach(function(option) {
		option.style.display = ""
	})
	setState('filtered')
	updateStatus(aFilteredOptions.length)
}

function updateStatus(howMany) {
	csStatus.textContent = howMany + " options available."
}

function makeChoice(whichOption) {
	csInput.value = whichOption.textContent;
}

function setState(newState) {
	switch (newState) {
		case 'initial':
			csState = 'initial'
			break
		case 'opened':
			csState = 'opened'
			break
		case 'filtered':
			csState = 'filtered'
			break
		case 'closed':
			csState = 'closed'
	}
}

function doKeyAction(whichKey) {
	const currentFocus = findFocus()
	switch(whichKey) {
		case 'Enter':
			if (csState === 'initial') {
				// если состояние = начальное, toggleOpen и установка состояния на открытое
				toggleList('Open')
				setState('opened')
			} else if (csState === 'opened' && currentFocus.tagName === 'LI') {
				// если состояние = открыто и фокус на списке, makeChoice и установите состояние закрыто
				makeChoice(currentFocus)
				toggleList('Shut')
				setState('closed')
			} else if (csState === 'opened' && currentFocus === csInput) {
				// если состояние = открыто и фокус на вводе, закрыть его
				toggleList('Shut')
				setState('closed')
			} else if (csState === 'filtered' && currentFocus.tagName === 'LI') {
				// если состояние = отфильтровано и сфокусироваться на списке, makeChoice и установит закрытое состояние
				makeChoice(currentFocus)
				toggleList('Shut')
				setState('closed')
			} else if (csState === 'filtered' && currentFocus === csInput) {
				// если состояние = отфильтровано и фокус на вводе, установить состояние на открытое
				toggleList('Open')
				setState('opened')
			} else {
				// если состояние = закрыто, установить состояние как отфильтрованное? т.е. открыть, но сохранить существующий ввод
				toggleList('Open')
				setState('filtered')
			}
			break

		case 'Escape':
			// если состояние = начальное, ничего не делать
      // если состояние = открыто или отфильтровано, установить состояние начальное
      // если состояние = закрыто, ничего не делать
			if (csState === 'opened' || csState === 'filtered') {
				toggleList('Shut')
				setState('initial')
			}
			break

		case 'ArrowDown':
			if (csState === 'initial' || csState === 'closed') {
				// если состояние = начальное или закрытое, устанавливаем состояние на открытое и перемещаем фокус на первое
				toggleList('Open')
				moveFocus(csInput, 'forward')
				setState('opened')
			} else {
				// если состояние = открыто и фокус на вводе, перемещаем фокус на первое
        // если состояние = открыто и фокус на списке, переместить фокус на следующий / первый
        // если состояние = отфильтровано и фокус на вводе, перемещаем фокус на первое
        // если состояние = отфильтровано и фокус на списке, переместить фокус на следующий / первый
				toggleList('Open')
				moveFocus(currentFocus, 'forward')
			}
			break
		case 'ArrowUp':
			if (csState === 'initial' || csState === 'closed') {
        // если состояние = начальное, устанавливаем состояние на открытое и перемещаем фокус на последнее
        // если state = closed, устанавливаем состояние открытое и перемещаем фокус на последнее
				toggleList('Open')
				moveFocus(csInput, 'back')
				setState('opened')
			} else {
        // если состояние = открыто и фокус на вводе, перемещаем фокус на последнее
        // если состояние = открыто и фокус на списке, переместить фокус на предыдущий / последний
        // если состояние = отфильтровано и фокус на вводе, перемещаем фокус на последнее
        // если состояние = отфильтровано и фокус на списке, переместить фокус на предыдущий / последний
				moveFocus(currentFocus, 'back')
			}
			break
		default:
			if (csState === 'initial') {
				// если state = initial, переключить open, doFilter и установить состояние на отфильтрованный
				toggleList('Open')
				doFilter()
				setState('filtered')
			} else if (csState === 'opened') {
				// если состояние = открыто, doFilter и установите состояние как отфильтрованное
				doFilter()
				setState('filtered')
			} else if (csState === 'closed') {
				// если state = closed, doFilter и установим состояние отфильтровано
				doFilter()
				setState('filtered')
			} else { // уже отфильтровано
				doFilter()
			}
			break
	}
}
