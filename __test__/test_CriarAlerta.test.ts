import { NextFunction, Request, Response } from "express";
import { AlertaController } from "../src/controller/index";
import { DataBaseSource } from "../src/config/database";
import { Alerta } from "../src/models/index";

jest.mock("../src/config/database");

describe("AlertaController", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("postAlerta", () => {
    it("deve criar um novo alerta e retornar um status 201", async () => {
      const mockAlerta = new Alerta();
      mockAlerta.nome = "Teste";
      mockAlerta.valorMax = 10;
      mockAlerta.valorMinimo = 5;
      mockAlerta.ativo = 1;

      const mockAlertaRepository = {
        create: jest.fn().mockReturnValue(mockAlerta),
        save: jest.fn().mockResolvedValue(mockAlerta),
      };

      DataBaseSource.getRepository(Alerta);

      req.body = {
        nome: "Teste",
        valorMax: 10,
        valorMinimo: 5,
        nivel: "alto",
      };

      const jsonSpy = jest.spyOn(res, "json");
      const statusSpy = jest.spyOn(res, "status").mockReturnValue(res);

      await AlertaController.postAlerta(req, res, next);

      expect(mockAlertaRepository.create).toHaveBeenCalledWith({
        nome: "Teste",
        valorMax: 10,
        valorMinimo: 5,
        ativo: 1,
        nivel: "alto",
      });

      expect(mockAlertaRepository.save).toHaveBeenCalledWith(mockAlerta);

      expect(jsonSpy).toHaveBeenCalledWith({
        ok: `Cadastro do alerta 'Teste' feito com sucesso`,
      });

      expect(statusSpy).toHaveBeenCalledWith(201);
    });

    it("deve retornar um status 406 em caso de erro", async () => {
      const mockAlertaRepository = {
        create: jest.fn().mockRejectedValue(new Error("Erro")),
        save: jest.fn(),
      };

      DataBaseSource.getRepository(Alerta);

      req.body = {
        nome: "Teste",
        valorMax: 10,
        valorMinimo: 5,
        nivel: "alto",
      };

      const jsonSpy = jest.spyOn(res, "json");
      const statusSpy = jest.spyOn(res, "status").mockReturnValue(res);

      await AlertaController.postAlerta(req, res, next);

      expect(mockAlertaRepository.create).toHaveBeenCalledWith({
        nome: "Teste",
        valorMax: 10,
        valorMinimo: 5,
        ativo: 1,
        nivel: "alto",
      });

      expect(mockAlertaRepository.save).not.toHaveBeenCalled();

      expect(jsonSpy).toHaveBeenCalledWith({
        error: new Error("Erro"),
      });

      expect(statusSpy).toHaveBeenCalledWith(406);
    });
  });
});
