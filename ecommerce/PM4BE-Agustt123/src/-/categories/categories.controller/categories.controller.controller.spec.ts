import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesControllerController } from './categories.controller.controller';

describe('CategoriesControllerController', () => {
  let controller: CategoriesControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesControllerController],
    }).compile();

    controller = module.get<CategoriesControllerController>(CategoriesControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
