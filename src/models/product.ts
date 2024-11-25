import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    brand: string;
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    description: string;
    quantity: number;
    inStock: boolean;
}

const productSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        type: {
            type: String,
            enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
            required: true,
        },
        description: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
