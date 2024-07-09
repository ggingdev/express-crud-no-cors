import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = Router();

router.get('/', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (user) {
    console.log(user);
    
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(req.body);
  const result = await userRepository.save(user);
  console.log(result);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (user) {
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    console.log(result);
    res.json(result);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const result = await userRepository.delete(req.params.id);
  if (result.affected) {
    console.log(result);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
