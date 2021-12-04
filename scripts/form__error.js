const inputs = [...document.getElementsByTagName("input")];
const errorTemplate = document.querySelector('#form__error').content;

inputs.forEach(input => {

	input.addEventListener('invalid', function (event) {
		event.preventDefault();
		if (!event.target.validity.valid) {
			input.style.borderColor = '#f40934';
			input.style.marginBottom = '0';
			const errorElement = errorTemplate.querySelector('.form__error-container').cloneNode(true);
			errorElement.querySelector('.form__error-img').src = '../../../images/form-error.svg';
			errorElement.querySelector('.form__error-text').textContent = 'пожалуйста, заполните это поле'
			input.after(errorElement);
		}
	})
});