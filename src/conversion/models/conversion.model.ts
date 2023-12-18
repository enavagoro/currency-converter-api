import { Schema, model } from 'mongoose';
import { Conversion } from '../dto/conversion.dto';

let conversionSchema: any;
let conversionModel: any;

const defineMongooseSchema = () => {
  conversionSchema = new Schema<Conversion>({
    operationDate: { type: Date },
    userId: { type: String },
    conversionDate: { type: Date },
    amount: { type: Number },
    currencyValue: { type: Number },
    convertedAmount: { type: Number },
  }, { timestamps: true })
}

const createMongooseModel = () => {
  conversionModel = model<Conversion>('Conversion', conversionSchema);
}

defineMongooseSchema();
createMongooseModel();

const insert = async (conversionData: Conversion) => {
  const newConversion = new conversionModel(conversionData)
  const savedConversion = await newConversion.save()
  return savedConversion
}

const list = async () => {
  const conversions = await conversionModel.find({});
  return conversions;
}

const listByDate = async (from: Date, to: Date) => {
  try {
    const conversions = await conversionModel.find({
      operationDate: {
        $gte: new Date(from),  // Greater than or equal to date1
        $lte: new Date(to)   // Less than or equal to date2
      }
    });

    return conversions;
  } catch (error) {
    console.error("Error retrieving conversions by date range:", error);
    throw error;  // You might want to handle the error in a more appropriate way in your application
  }
};

const listByStatus = async (status: boolean) => {
  const conversions = await conversionModel.find({ status });
  return conversions;
}

const getById = async (id: string) => {
  const conversions = await conversionModel.findById(id);
  return conversions;
}

const update = async (id: string, dataToUpdate: Conversion) => {
  const updatedConversion = await conversionModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
  return updatedConversion;
}

const deleteConversion = async (id: string) => {
  const deletedConversion = await conversionModel.findByIdAndDelete(id);
  return deletedConversion;
}

export default {
  insert,
  list,
  listByDate,
  listByStatus,
  update,
  getById,
  deleteConversion
}