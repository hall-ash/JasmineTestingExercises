
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// expects a a table row element, appends a newly created td element with the value 'X'
// that when clicked will delete the table row it belongs to
const appendDeleteBtn = (tr) => {
  // create td element
  const deleteBtnTd = document.createElement('td');
  deleteBtnTd.innerText = 'X';

  // append to table row
  tr.append(deleteBtnTd);

  deleteBtnTd.addEventListener('click', (evt) => {
    if (evt.target.innerText === 'X') {
      evt.target.parentElement.remove();
    }
  })
}

