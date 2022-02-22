const $form = getElement('cars-form');
const $tableCar = getElement('table-car');
const elementTypes = {
  text: createText,
  image: createImage,
  color: createColor
};

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

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

function createNewCar(data) {
  const $tr = document.createElement('tr');
  const elements = [
    {type: 'image', value: {src: data.image, alt: data.model}},
    {type: 'text', value: data.model},
    {type: 'text', value: data.year},
    {type: 'text', value: data.plate},
    {type: 'color', value: data.color},
  ];
  const $button = createDeleteButton();

  elements.forEach(element => {
    const td = elementTypes[element.type](element.value);
    $tr.appendChild(td);
  });

  $tr.classList.add('table-row');
  $tr.dataset.plate = data.plate;

  $tr.appendChild($button);
  $button.addEventListener('click', handleDelete);

  return $tr;
}

function createText(value) {
  const $td = document.createElement('td');
  $td.textContent = value;

  return $td;
}

function createImage({ src, alt }) {
  const $td = document.createElement('td');
  const $img = document.createElement('img');

  $img.src = src;
  $img.alt = alt;
  $img.style.width = '100px';

  $td.appendChild($img)
  return $td;
}

function createColor(value) {
  const $td = document.createElement('td');
  const $color = document.createElement('div');

  $color.style.width = '50px';
  $color.style.height = '50px';
  $color.style.borderRadius = '5px';
  $color.style.margin = 'auto';
  $color.style.backgroundColor = value;

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
