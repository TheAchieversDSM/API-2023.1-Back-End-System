import TesteEstacao from "../src/test/testEstacao";

const teste = 'Teste'

const mockRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  getById: jest.fn(),

};

describe('getById', () => {
     it(' Deve buscar uma estação cadastrada pelo Id', async () =>{
       const estacao = TesteEstacao.giveMeaValidStation();
      let mockEstacao = mockRepository.find.mockReturnValue([estacao]);
      expect(mockEstacao).toBeTruthy();
  })
});
 describe('Teste', () => {
  test('Testando em Jest', () => {
    expect(teste).toBe('Teste')
 });
})



