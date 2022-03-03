const $form = getElement('cars-form');
const $tableCar = getElement('table-car');
const url = 'http://localhost:3000/car';
const elementTypes = {
  text: createText,
  image: createImage,
  color: createColor,
  button: createDeleteButton
};

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const post = sendRequest('POST');
  const data = {
    image: getElement('image').value,
    brandModel: getElement('model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value,
  };

  post(url, data);
  createNewCar(data);

  event.target.reset();
  event.target.elements[0].focus();
});

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

function getCarData() {
  const get = new XMLHttpRequest();
  get.open('GET', url);
  get.send();
  get.addEventListener('readystatechange', () => {
    if(isRequestOk(get))
      JSON.parse(get.responseText).forEach(createNewCar);
  });
}

function isRequestOk(request) {
  return request.readyState === 4 && request.status === 200;
}

function createNewCar(data) {
  const $tr = document.createElement('tr');
  const elements = [
    {type: 'image', value: {src: data.image, alt: data.brandModel}},
    {type: 'text', value: data.brandModel},
    {type: 'text', value: data.year},
    {type: 'text', value: data.plate},
    {type: 'color', value: data.color},
    {type: 'button', value: data.plate},
  ];

  removeNoCarRow();
  elements.forEach(element => {
    const td = elementTypes[element.type](element.value);
    $tr.appendChild(td);
  });

  $tr.classList.add('table-row');
  $tableCar.appendChild($tr);
  return $tableCar;
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

function createDeleteButton(plate) {
  const $td = document.createElement('td');
  const $button = document.createElement('button');

  $button.classList.add('main-button');
  $button.dataset.plate = plate;
  $button.textContent = 'Delete';
  $button.addEventListener('click', handleDelete);

  $td.appendChild($button);
  return $td;
}

function handleDelete({ target }) {
  const $tr = target.closest('tr');
  const plate = target.dataset.plate;
  const del = sendRequest('DELETE');

  del(url, { plate });
  $tableCar.removeChild($tr);

  const hasTr = $tableCar.querySelector('tr');
  if(!hasTr) createNoCarRow();

  target.removeEventListener('click', handleDelete);
}

function sendRequest(method) {
  return (url, data) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));

    request.addEventListener('load', () => {
      if (isRequestOk(request))
        return request.responseText;
    });
  };
}

function createNoCarRow() {
  const $td = document.createElement('td');
  const $tr = document.createElement('tr');
  const thsLength = document.querySelectorAll('table th').length;
  $td.setAttribute('colspan', thsLength);
  $td.style.textAlign = 'center';
  $td.textContent = 'Sem conteúdo';
  $tr.dataset.js = 'no-car';
  $tr.appendChild($td);
  $tableCar.appendChild($tr);
}

function removeNoCarRow() {
  const $noCarRow = getElement('no-car');
  if($noCarRow)
    $tableCar.removeChild($noCarRow);
}

createNoCarRow();
getCarData();
