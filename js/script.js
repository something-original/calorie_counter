const male = document.querySelector('#gender-male');
const female = document.querySelector('#gender-female');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const inputText = document.querySelectorAll('input[type="text"]');
const activities = document.querySelector('.radios-group');
const calcButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');
const result = document.querySelector('.counter__result');
const caloriesNorm = result.querySelector('#calories-norm');
const caloriesMinimal = result.querySelector('#calories-minimal');
const caloriesMaximal = result.querySelector('#calories-maximal');

var activityCoeff = 1.2;

inputText.forEach(input => {
	input.addEventListener('change', () => {
		if (age.value != 0 || height.value != 0 || weight.value != 0) {
			resetButton.disabled = false;
		} else {
			resetButton.disabled = true;
		}

		if (age.value != 0 && height.value != 0 && weight.value != 0) {
			calcButton.disabled = false;
		} else {
			calcButton.disabled = true;
		}

	})
});

activities.addEventListener('change', (evt) => {
    switch (evt.target.id) {
        case 'activity-minimal':
            activityCoeff = 1.2;
            break;
        case 'activity-low':
            activityCoeff = 1.375;
            break;
        case 'activity-medium':
            activityCoeff = 1.55;
            break;
        case 'activity-high':
            activityCoeff = 1.725;
            break;
        case 'activity-maximal':
            activityCoeff = 1.9;
            break;
    }
});

const getCaloriesNorm = () => {
    const temp = male.checked ? 5 : -161;
    return Math.ceil(activityCoeff * (10 * weight.value + 6.25 * height.value - 5 * age.value + temp));
}

calcButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const norm = getCaloriesNorm();
    result.classList.remove('counter__result--hidden');
    caloriesNorm.textContent = norm;
    caloriesMinimal.textContent = Math.ceil(norm - norm * 0.15);
    caloriesMaximal.textContent = Math.ceil(norm + norm * 0.15);
});

resetButton.addEventListener('click', () => {
    male.checked = true;
    female.checked = false;
    age.value = '';
    height.value = '';
    weight.value = '';
    activities.querySelector('#activity-minimal').checked = true;
    activities.querySelector('#activity-low').checked = false;
    activities.querySelector('#activity-medium').checked = false;
    activities.querySelector('#activity-high').checked = false;
    activities.querySelector('#activity-maximal').checked = false;
    result.classList.add('counter__result--hidden');
    currentState();
});
