import { Request, Response } from 'express';
import { MongoConnection } from '../database/mongoConnection';
import { UserRepository } from '../repositories/userRepository';

class UserController {
  connection : MongoConnection = null;
  
  constructor() {
    this.connection = new MongoConnection();
  }

  GetAllUsers = async (req: Request, res: Response) : Promise<Response> => {
    try {
      await this.connection.connectDatabase();

      const allUsers = await UserRepository.find({}).lean().exec();

      await this.connection.disconnectDatabase();

      return res.json(allUsers);
    
    } catch (error) {
      return res.json(error);
    }
  }

  AddUser = async (req: Request, res: Response) : Promise<Response> => {
    const { username, email } = req.body;
    
    try {
      await this.connection.connectDatabase();

      const addedUser = {
        username,
        email,
      };

      const newUser = await UserRepository.create(addedUser);

      await this.connection.disconnectDatabase();

      return res.json(newUser);
    } catch(error) {
      return res.json(error);
    }
  }
}

export { UserController };