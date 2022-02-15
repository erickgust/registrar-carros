const $form = getElement('cars-form');

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $tableCar = getElement('table-car');
  $tableCar.appendChild(createNewCar());
});

function createNewCar() {
  const $tr = document.createElement('tr');
  const $tdImage = document.createElement('td');
  const $tdModel = document.createElement('td');
  const $tdYear = document.createElement('td');
  const $tdPlate = document.createElement('td');
  const $tdColor = document.createElement('td');

  $tdImage.textContent = getElement('image').value;
  $tdModel.textContent = getElement('model').value;
  $tdYear.textContent = getElement('year').value;
  $tdPlate.textContent = getElement('plate').value;
  $tdColor.textContent = getElement('color').value;

  $tr.appendChild($tdImage);
  $tr.appendChild($tdModel);
  $tr.appendChild($tdYear);
  $tr.appendChild($tdPlate);
  $tr.appendChild($tdColor);

  return $tr;
}
