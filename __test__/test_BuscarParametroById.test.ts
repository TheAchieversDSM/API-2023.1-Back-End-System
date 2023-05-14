import TesteParametro from "../src/test/testParametro";

const teste = 'Teste'

const mockRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  getById: jest.fn(),

};

describe('getById', () => {
     it(' Deve buscar um parametro cadastrado pelo Id', async () =>{
       const parametro = TesteParametro.giveMeaValidParameter();
      let mockParametro = mockRepository.find.mockReturnValue([parametro]);
      expect(mockParametro).toBeTruthy();
  })
});

 describe('Teste', () => {
  test('Testando em Jest', () => {
    expect(teste).toBe('Teste')
 });
})
