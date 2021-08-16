describe('helpers tests with setup & tear-down', () => {
  
  describe('sumPaymentTotal() tests', () => {

    beforeEach( () => {
      allPayments = {
        payment1 : {
          billAmt: '10.00',
          tipAmt: '5.00',
          tipPercent: 50,
        },
        payment2 : {
          billAmt: '5.25',
          tipAmt: '0',
          tipPercent: 0,
        },
      };
    })

    it('should return the sum of all bill amts for each payment on sumPaymentTotal(\'bill amt\')', () => {
      expect(sumPaymentTotal('billAmt')).toEqual(15.25);
    })

    it('should return the sum of all tip amts for each payment on sumPaymentTotal(\'bill amt\')', () => {
      expect(sumPaymentTotal('tipAmt')).toEqual(5.00);
    })

    it('should return the sum of all tip percentages for each payment on sumPaymentTotal(\'bill amt\')', () => {
      expect(sumPaymentTotal('tipPercent')).toEqual(50);
    })

    it('should return 0 if allPayments is empty for any argument on sumPaymentTotal()', () => {
      allPayments = {};
      expect(sumPaymentTotal('billAmt')).toEqual(0);
      expect(sumPaymentTotal('tipAmt')).toEqual(0);
      expect(sumPaymentTotal('tipPercent')).toEqual(0);
    })

    afterEach( () => {
      allPayments = {};
    })

  });

  describe('calculateTipPercent() tests', () => {
    beforeEach( () => {
      billAmt = '75.00';
      tipAmt = '25.00';
    })

    it('should return the tip percentage rounded to the nearest integer', () => {
      expect(calculateTipPercent(billAmt, tipAmt)).toEqual(33);
    })

    it('should return the tip percentage as 0 when the tipAmt is 0', () => {
      expect(calculateTipPercent(billAmt, 0)).toEqual(0);
    })
  });

  describe('appendTd() tests', () => {
    it('should create a td element and append it to the tr element', () => {
      const tr = document.createElement('tr');
      const value = 'new td';

      appendTd(tr, value);

      expect(tr.children.length).toEqual(1);
      expect(tr.innerHTML).toContain('td');
    })

    it('should insert the given value into the innerText of the new td element', () => {
      const tr = document.createElement('tr');
      const value = 'new td';

      appendTd(tr, value);

      expect(tr.children[0].innerText).toBe('new td');
    })
  })

  describe('appendDeleteBtn() tests', () => {
    it('should create a td element appended to the given tr element', () => {
      const tr = document.createElement('tr');
      appendDeleteBtn(tr);
      
      expect(tr.innerHTML).toContain('<td>');
    });

    it('should create a td element with the character X in its inner text', () => {
      const tr = document.createElement('tr');
      appendDeleteBtn(tr);
      const deleteBtn = tr.children[0];

      expect(deleteBtn.innerText).toBe('X');
    });

    it('should delete the parent tr element on click of the child td containing X', () => {
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');
      tbody.append(tr);
      appendDeleteBtn(tr);
      const deleteBtn = tr.children[0];

      // before deletion
      expect(tbody.innerHTML).toContain('<tr>');
      expect(tbody.innerHTML).toContain('<td>');

      // dispatch click event on delete button
      deleteBtn.dispatchEvent(new Event('click'));
      
      // after deletion
      expect(tbody.innerHTML).not.toContain('<tr>');
      expect(tbody.innerHTML).not.toContain('<td>');
    })


  })

  
});