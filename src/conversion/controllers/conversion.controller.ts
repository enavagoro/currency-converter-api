import { Request, Response } from 'express';
import { Conversion } from '../dto/conversion.dto';
import conversionModel from '../models/conversion.model';
import { getCurrencyByDate } from '../../shared/services/api-cmf-conversion.service';
import { calculateTotalAmount } from '../../shared/utils/utils';

export const convert = async (req: Request, res: Response) => {
    try {
        const { amount, userId }: Conversion = req.body;
        const operationDate: Date = new Date();
        const conversionDate: Date = new Date(req.body.conversionDate)
        const currencyValue: number = await getCurrencyByDate(conversionDate)
        const convertedAmount: number = calculateTotalAmount(amount, currencyValue)

        const conversion: Conversion = {
            operationDate,
            userId,
            amount,
            conversionDate,
            currencyValue,
            convertedAmount
        }
        
        await conversionModel.insert(conversion);

        res.status(201).send(conversion)
    } catch (error) {
        console.log('Error on currency convertion:', error)
        res.status(500).send('Internal Server Error')
    }
}

export const list = async (_: Request, res: Response) => {
    try {
        const response = await conversionModel.list();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on listing conversions');
    }
}

export const listByDate = async (req: Request, res: Response) => {
    try {
        const { from, to } = req.body
        const dateFrom = new Date(from)
        const dateTo = new Date(to)

        const response = await conversionModel.listByDate(dateFrom, dateTo);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on listing conversions');
    }
}


export const listByStatus = async (req: Request, res: Response) => {
    const status = req.body.status;
    try {
        const response = await conversionModel.listByStatus(status)
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on listing conversions');
    }
}

export const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const response = await conversionModel.getById(id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on getting conversion');
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const conversionId: string = req.params.id;
        const conversionDataToUpdate = req.body;

        const response = await conversionModel.update(conversionId, conversionDataToUpdate);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on update conversion');
    }
}

export const deleteConversion = async (req: Request, res: Response) => {
    try {
        const conversionId: string = req.params.id;
        const response = await conversionModel.deleteConversion(conversionId);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error on delete conversion');
    }
}