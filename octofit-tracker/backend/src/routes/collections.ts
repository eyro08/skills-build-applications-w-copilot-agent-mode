import { Router } from 'express';

type CollectionReader = {
  find: () => {
    lean: () => {
      exec: () => Promise<unknown>;
    };
  };
};

export function createCollectionRouter(model: CollectionReader) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean().exec());
    } catch (error) {
      next(error);
    }
  });

  return router;
}