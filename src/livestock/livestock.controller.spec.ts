import { Test, TestingModule } from '@nestjs/testing';
import { LivestockController } from './livestock.controller';

describe('LivestockController', () => {
  let controller: LivestockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivestockController],
    }).compile();

    controller = module.get<LivestockController>(LivestockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
