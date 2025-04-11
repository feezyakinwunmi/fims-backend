import { Test, TestingModule } from '@nestjs/testing';
import { ItemsActivityController } from './itemsActivity.controller';

describe('ItemsActivityController', () => {
  let controller: ItemsActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsActivityController],
    }).compile();

    controller = module.get<ItemsActivityController>(ItemsActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
