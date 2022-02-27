const $form = getElement('cars-form');
const $tableCar = getElement('table-car');
const url = 'http://localhost:3000/car';
const elementTypes = {
  text: createText,
  image: createImage,
  color: createColor
};

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    image: getElement('image').value,
    brandModel: getElement('model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value,
  };

  sendCarData(data);
  createNewCar(data);

  event.target.reset();
  event.target.elements[0].focus();
});

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

function sendCarData(data) {
  const post = new XMLHttpRequest();
  post.open('POST', url);
  post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  post.send(`image=${data.image}&brandModel=${data.brandModel}&year=${data.year}&plate=${data.plate}&color=${data.color}`);

  post.addEventListener('readystatechange', () => {
    if(isRequestOk(post))
      return JSON.parse(post.responseText);
  });
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
  const $button = createDeleteButton(data.plate);
  const elements = [
    {type: 'image', value: {src: data.image, alt: data.brandModel}},
    {type: 'text', value: data.brandModel},
    {type: 'text', value: data.year},
    {type: 'text', value: data.plate},
    {type: 'color', value: data.color},
  ];

  elements.forEach(element => {
    const td = elementTypes[element.type](element.value);
    $tr.appendChild(td);
  });

  $tr.classList.add('table-row');
  $tr.appendChild($button);
  $button.addEventListener('click', handleDelete);
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
  const $button = document.createElement('button');
  $button.dataset.plate = plate;
  $button.textContent = 'Delete';
  return $button;
}

function handleDelete({ target }) {
  const $tr = target.parentElement;
  const plate = target.dataset.plate;
  sendDeleteRequest(plate);
  $tableCar.removeChild($tr);
  target.removeEventListener('click', handleDelete);
}

function sendDeleteRequest(plate) {
  const del = new XMLHttpRequest();
  del.open('DELETE', url);
  del.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  del.send(`plate=${plate}`);

  del.addEventListener('readystatechange', () => {
    if (isRequestOk(del)) {
      return del.responseText;
    }
  });
}

getCarData();
