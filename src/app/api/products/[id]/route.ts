
import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';
import type { Product } from '@/types';

function checkAuth(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    return null;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const product = products.find(p => p.id === parseInt(params.id));
    if (!product) {
        return new NextResponse(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    }
    return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const authError = checkAuth(req);
    if (authError) return authError;

    const productIndex = products.findIndex(p => p.id === parseInt(params.id));
    if (productIndex === -1) {
        return new NextResponse(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    }

    try {
        const body = await req.json();
        const updatedProduct = { ...products[productIndex], ...body, id: parseInt(params.id) };
        products[productIndex] = updatedProduct;
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Invalid request body' }), { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const authError = checkAuth(req);
    if (authError) return authError;

    const productIndex = products.findIndex(p => p.id === parseInt(params.id));
    if (productIndex === -1) {
        return new NextResponse(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    }

    products.splice(productIndex, 1);
    
    return new NextResponse(null, { status: 204 });
}
