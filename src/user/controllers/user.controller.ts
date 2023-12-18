import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../dto/user.dto'
import { encrypthPassword } from '../../shared/utils/encrypth/encrypth.utils'

export const insert = async (req: Request, res: Response) => {
    try {
        const userData: User = req.body
        //first set
        userData.password = encrypthPassword(userData.password)
        userData.status = true
        const response = await userModel.insert(userData)
        res.status(201).send(response)
    } catch (error) {
        console.log('Error on insert user:', error)
        res.status(500).send('Internal Server Error')
    }
}


export const list = async (_: Request, res: Response) => {
    try {
        const response = await userModel.list();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on listing users');
    }
}

export const listByStatus = async (req: Request, res: Response) => {
    const status = req.body.status;
    try {
        const response = await userModel.listByStatus(status)
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on listing users');
    }
}

export const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const response = await userModel.getById(id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on getting user');
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const userDataToUpdate = req.body;

        const response = await userModel.update(userId, userDataToUpdate);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on update user');
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const response = await userModel.deleteUser(userId);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on delete user');
    }
}