describe('payments tests with setup & tear-down', () => {
  beforeEach( () => {
    billAmtInput.value = '10.00';
    tipAmtInput.value = '5.00';
  })

  describe('submitPaymentInfo() on valid curPayment object tests', () => {
    

    it('should increment paymentId on submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(paymentId).toEqual(1);
    }) 

    it('should add a curPayment object to allPayments on submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(Object.keys(allPayments).length).toEqual(1);
    })

    it('should clear the bill and tip amount inputs in the input payment info form on submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(billAmtInput.value).toBe('');
      expect(tipAmtInput.value).toBe('');
    })

    it('should update the payment table with the curPayment on submitPaymentInfo()', () => {
      submitPaymentInfo();

      const paymentRow = document.querySelector('#paymentTable tbody tr');
      const billAmtTd = paymentRow.children[0];
      const tipAmtTd = paymentRow.children[1];
      const tipPercent = paymentRow.children[2];
      expect(billAmtTd.innerText).toContain('10');
      expect(tipAmtTd.innerText).toContain('5');
      expect(tipPercent.innerText).toContain('50');
    })

    it('should update the server table with server earnings on submitPaymentInfo()', () => {
      // add a server
      serverNameInput.value = 'Alice';
      submitServerInfo();
      
      submitPaymentInfo();

      const serverTRow = serverTbody.firstElementChild;
      const earnings = serverTRow.lastElementChild;
      expect(earnings.innerText).toContain('5');
    })

    it('should update the shift summary on submitPaymentInfo()', () => {
      submitPaymentInfo();
      const billSummary = summaryTds[0].innerHTML;
      const tipSummary = summaryTds[1].innerHTML;
      const tipPercentSummary = summaryTds[2].innerHTML;
      expect(billSummary).toContain('10');
      expect(tipSummary).toContain('5');
      expect(tipPercentSummary).toContain('50');
    })
  });

  describe('submitPaymentInfo on invalid curPayment object tests', () => {
    
    beforeEach( () => {
      billAmtInput.value = -10;
      tipAmtInput.value = 5;
    })

    it('should not increment paymentId on invalid submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(paymentId).toEqual(0);
    });

    it('should not add a curPayment object to all Payments on  invalid submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(Object.keys(allPayments).length).toEqual(0);
    })

    it('should not update the payment table on invalid submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(paymentTbody.children.length).toEqual(0);
    })

    it('should not update the server table on invalid submitPaymentInfo()', () => {
      submitPaymentInfo();
      expect(serverTbody.children.length).toEqual(0);
    })

    it('should not update the summary on invalid submitPaymentInfo()', () => {
      submitPaymentInfo();
      for (const td of summaryTds) {
        expect(td.innerText).toBe('');
      }
    })

  })

  describe('createCurPayment() tests', () => {
    it('should return undefined with a negative bill input on createCurPayment()', () => {
      billAmtInput.value = '-10';
      const returnVal = createCurPayment();
      expect(returnVal).not.toBeDefined();
    })

    it('should return undefined with a negative tip input on createCurPayment()', () => {
      tipAmtInput.value = '-10';
      const returnVal = createCurPayment();
      expect(returnVal).not.toBeDefined();
    })

    it('should return undefined with an empty string bill input on createCurPayment()', () => {
      billAmtInput.value = '';
      const returnVal = createCurPayment();
      expect(returnVal).not.toBeDefined();
    })

    it('should return undefined with an empty string tip input on createCurPayment()', () => {
      tipAmtInput.value = '';
      const returnVal = createCurPayment();
      expect(returnVal).not.toBeDefined();
    })

    it('should return undefined with a bill input of 0 on createCurPayment()', () => {
      billAmtInput.value = '0';
      const returnVal = createCurPayment();
      expect(returnVal).not.toBeDefined();
    })

    it('should return a curPayment obj with the billAmt, tipAmt, and tipPercent on valid input to createCurPayment()', () => {
      curPaymentObj = createCurPayment();
      expect(curPaymentObj.billAmt).toEqual('10.00');
      expect(curPaymentObj.tipAmt).toEqual('5.00');
      expect(curPaymentObj.tipPercent).toEqual(50);
    })
  })

  describe('appendPaymentTable tests', () => {
    beforeEach( () => {
      curPayment = {billAmt: '10', tipAmt: '5', tipPercent: 50};
    })

    it('should create a new table row with 3 data cells on appendPaymentTable()', () => {
      appendPaymentTable(curPayment);
      expect(paymentTbody.children.length).toEqual(1);
      expect(document.querySelector('#paymentTable tbody tr').children.length).toEqual(3);
    })

    it('should display the correct bill amt formatted with a $ to the table row created on appendPaymentTable()', () => {
      appendPaymentTable(curPayment);
      const newTr = document.querySelector('#paymentTable tbody tr');
      const bill = newTr.children[0].innerText;
      expect(bill).toEqual('$10');
    })

    it('should display the correct tip amt formatted with a $ to the table row created on appendPaymentTable()', () => {
      appendPaymentTable(curPayment);
      const newTr = document.querySelector('#paymentTable tbody tr');
      const tip = newTr.children[1].innerText;
      expect(tip).toEqual('$5');
    })

    it('should display the correct tip percentage amt formatted with a % to the table row created on appendPaymentTable()', () => {
      appendPaymentTable(curPayment);
      const newTr = document.querySelector('#paymentTable tbody tr');
      const tipPercent = newTr.children[2].innerText;
      expect(tipPercent).toEqual('50%');
    })
  })

  describe('updateSummary() tests', () => {
    beforeEach( () => {
      allPayments = {
        payment1 : {
          billAmt: '10',
          tipAmt: '5',
          tipPercent: 50,
        },
      };
    })
    it('should update the bill total in the summary table', () => {
      updateSummary();
      expect(summaryTds[0].innerHTML).toEqual('$10');
    })

    it('should update the tip total in the summary table', () => {
      updateSummary();
      expect(summaryTds[1].innerHTML).toEqual('$5');
    })

    it('should update the tip percent avg in the summary table', () => {
      updateSummary();
      expect(summaryTds[2].innerHTML).toEqual('50%');
    })

    it('should display a tip percent avg of 0 if the tip percent total is 0', () => {
      allPayments = {
        payment1 : {
          billAmt: '10',
          tipAmt: '5',
          tipPercent: 0,
        },
      }
      updateSummary();
      expect(summaryTds[2].innerHTML).toEqual('0%');
    })

    it('should display a tip percent avg of 0 if the number of payments is 0', () => {
      allPayments = {
      }
      updateSummary();
      expect(summaryTds[2].innerHTML).toEqual('0%');
    })
  })


  describe('removePaymentFromPaymentTable() tests', () => {
    
    beforeEach( () => {
      allServers = {
        server1 : {
          serverName: 'Alice',
        },
      }

      // submit a payment
      billAmtInput.value = '10.00';
      tipAmtInput.value = '5.00';
      submitPaymentInfo();
      paymentToRemove = 'payment1';

      // submit another payment
      billAmtInput.value = '100.00';
      tipAmtInput.value = '20.00';
      submitPaymentInfo();

    })
    
    
    it('should remove the given payment from the payment table', () => {
      // before removing payment
      expect(paymentTbody.innerHTML).toContain('payment1');

      removePaymentFromPaymentTable(paymentToRemove);

      // after removing payment
      expect(paymentTbody.innerHTML).not.toContain('payment1');
    });
    
    it('should remove given payment from the allPayments object', () => {
      // before removing payment
      expect(allPayments[paymentToRemove]).toBeDefined();

      removePaymentFromPaymentTable(paymentToRemove);

      // after removing payment
      expect(allPayments[paymentToRemove]).not.toBeDefined();
    })

    
    it('should update the server table', () => { 
      removePaymentFromPaymentTable(paymentToRemove);

      expect(serverTbody.innerHTML).toContain('$20.00');
    })

    it('should update the summary table', () => {
      removePaymentFromPaymentTable(paymentToRemove);

      const billAmt = summaryTds[0].innerHTML; 
      const tipAmt = summaryTds[1].innerHTML;
      const avgTipPercent = summaryTds[2].innerHTML; 

      expect(billAmt).toBe('$100');
      expect(tipAmt).toBe('$20');
      expect(avgTipPercent).toBe('20%');
    })

  })

  afterEach( () => {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    serverNameInput.value = '';
    allPayments = {};
    allServers = {};
    paymentId = 0;
    paymentTbody.innerHTML = '';
    serverTbody.innerHTML = '';

    for (const td of summaryTds) {
      td.innerText = '';
    }
  });
  
});