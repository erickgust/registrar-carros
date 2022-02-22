const $form = getElement('cars-form');
const $tableCar = getElement('table-car');

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    image: getElement('image').value,
    model: getElement('model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value,
  };

  $tableCar.appendChild(createNewCar(data));

  event.target.reset();
  event.target.elements[0].focus();
});

function createNewCar(data) {
  const $tr = document.createElement('tr');
  const $tdModel = document.createElement('td');
  const $tdYear = document.createElement('td');
  const $tdPlate = document.createElement('td');
  const $tdColor = createColor(data.color);
  const $tdImage = createImage(data.image, data.plate);
  const $button = createDeleteButton();

  $tdModel.textContent = data.model;
  $tdYear.textContent = data.year;
  $tdPlate.textContent = data.plate;

  $tr.classList.add('table-row');
  $tr.dataset.plate = data.plate;

  $tr.appendChild($tdImage);
  $tr.appendChild($tdModel);
  $tr.appendChild($tdYear);
  $tr.appendChild($tdPlate);
  $tr.appendChild($tdColor);

  $tr.appendChild($button);
  $button.addEventListener('click', handleDelete);

  return $tr;
}

function createImage(src, alt) {
  const $td = document.createElement('td');
  const $img = document.createElement('img');

  $img.src = src;
  $img.alt = alt;
  $img.style.width = '100px';

  $td.appendChild($img)
  return $td;
}

function createColor(bgColor) {
  const $td = document.createElement('td');
  const $color = document.createElement('div');

  $color.style.width = '50px';
  $color.style.height = '50px';
  $color.style.borderRadius = '5px';
  $color.style.margin = 'auto';
  $color.style.backgroundColor = bgColor;

  $td.appendChild($color);
  return $td;
}

function createDeleteButton() {
  const $button = document.createElement('button');
  $button.dataset.plate = getElement('plate').value;
  $button.textContent = 'Delete';

  return $button;
}

function handleDelete({ target }) {
  const plate = target.dataset.plate;
  const $tr = document.querySelector(`tr[data-plate="${plate}"]`);

  $tableCar.removeChild($tr);
  target.removeEventListener('click', handleDelete);
}
