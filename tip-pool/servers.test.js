describe("Servers test (with setup and tear-down)", function() {

  describe('submitServerInfo() tests', () => {

    beforeEach(function () {
      // initialization logic
      serverNameInput.value = 'Alice';
    });

    it('should add a new server to allServers on submitServerInfo()', function () {
      submitServerInfo();
  
      expect(Object.keys(allServers).length).toEqual(1);
      expect(allServers['server' + serverId].serverName).toEqual('Alice');
    });
  
    it('should increment serverId when a new server is added on submitServerInfo()', () => {
      expect(serverId).toEqual(0);
  
      submitServerInfo();
  
      expect(serverId).toEqual(1);
    })
  
    it('should clear the serverName input form on submitServerInfo()', () => {
      submitServerInfo();
  
      expect(serverNameInput.value).toBe('');
    })
  
    it('should create a row in the server table for the new server on submitServerInfo()', () => {
      submitServerInfo();
  
      const serverTRow = document.querySelector('#server1');
      expect(serverTRow.innerText).toContain('Alice'); 
    })
  
    it('should add subsequent servers to allServers with the correct key on submitServerInfo()', () => {
      // add Alice
      submitServerInfo();
  
      // add a 2nd server
      serverNameInput.value = 'Tom';
      submitServerInfo();
  
      expect(Object.keys(allServers).length).toEqual(2);
      expect(allServers['server'+serverId].serverName).toEqual('Tom');
    })
  
    it('should append a row in server table for subsequent servers on submitServerInfo()', () => {
       // add Alice
       submitServerInfo();
  
      // add a 2nd server
      serverNameInput.value = 'Tom';
      submitServerInfo();
  
      expect(document.querySelector('#server1').innerText).toContain('Alice');
      expect(document.querySelector('#server2').innerText).toContain('Tom');
    })
  
    it('should not add a server to allServers or update the server table if the input is an empty string on submitServerInfo()', () => {
      serverNameInput.value = '';
      submitServerInfo();
  
      expect(Object.keys(allServers).length).toEqual(0);
      expect(serverId).toEqual(0);
      expect(serverNameInput.value).toBe('');
  
      const serverTRow = document.querySelector('#server1');
      expect(serverTRow).toBe(null);
  
    });

    afterEach(function() {
      // teardown logic
      allServers = {};
      serverId = 0;
      serverTbody.innerHTML = '';
    });

  });

  describe('updateServerTable() tests', () => {
    
    beforeEach( () => {
      allServers = {
        server1: {serverName: 'Alice'},
        server2: {serverName: 'Tom'},
        server3: {serverName: 'Jo'},
      }
    })

    it('should update the serverTbody so that the number of rows in the table is equal to the number of servers in allServers', () => {
      
      updateServerTable();
      
      expect(serverTbody.children.length).toEqual(3);

      for (const server in allServers) {
        const serverTRow = document.querySelector(`#${server}`);
        const earnings = serverTRow.lastElementChild;
        
        expect(earnings.innerText).toContain('$');
        expect(earnings.innerText).toContain('.');
      }
    });

    it('should create for each server a row containing 2 table data cell elements', () => {
      updateServerTable();
      for (const server in allServers) {
        const serverTRow = document.querySelector(`#${server}`);
        expect(serverTRow.children.length).toEqual(2);
        expect(serverTRow.innerHTML).toContain('<td>');
      }
    });

    it('should add the name of each server in allServers to the first data cell element for each row in the server table', () => {
      updateServerTable();

      for (const server in allServers) {
        const serverName = document.querySelector(`#${server}`).firstElementChild;
        expect(serverName.innerText).toEqual(allServers[server].serverName);
      }
    })

    it('should add the earnings (fixed to 2 decimal places with a $ prepended) for each server in allServers to the second data cell element fo reach row in the server table', () => {
      updateServerTable();

      for (const server in allServers) {
        const earnings = document.querySelector(`#${server}`).children[1];
        expect(earnings.innerText).toContain('$');
        expect(earnings.innerText).toContain('.');
        expect(earnings.innerText.slice(-2).length).toEqual(2);
      }
    })

    it('should not append rows to the server table if allServers is empty', () => {
      allServers = {};
      
      updateServerTable();

      expect(serverTbody.innerHTML).toBe('');
    });

    it('should overwrite new table rows upon each call to updateServerTable()', () => {
      updateServerTable();
      expect(serverTbody.children.length).toEqual(3);

      allServers = {
        server1: {serverName: 'Alice'},
      };
      updateServerTable();

      expect(serverTbody.children.length).toEqual(1);
    })

    afterEach( () => {
      allServers = {};
      serverTbody.innerHTML = '';
    })

  })

  
});

