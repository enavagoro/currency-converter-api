
import fetch from 'node-fetch'
import * as dotenv from 'dotenv';
import { destructureDate } from '../utils/utils';

dotenv.config();
const API_CMF_KEY = process.env.API_CMF_KEY || '';

export const getCurrencyByDate = async (date: Date): Promise<number> => {
    const API_CMF_URL: String = process.env.API_CMF_URL || '';
    const {year, month, day} = destructureDate(date)
    const finalUrl = `${API_CMF_URL}/uf/${year}/${month}/dias/${day}?apikey=${API_CMF_KEY}&formato=JSON`;
    const response = await fetch(finalUrl, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const currency = await response.json()

    const value: number = parseFloat(currency.UFs[0].Valor.replace('.', '').replace(',','.'))
    return value
};
