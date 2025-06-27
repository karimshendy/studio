
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

export async function GET(req: NextRequest) {
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    const authError = checkAuth(req);
    if (authError) return authError;

    try {
        const body = await req.json();
        if (!body.name || !body.category || !body.description) {
            return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
        }

        const newProduct: Product = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            slug: body.name.toLowerCase().replace(/\s+/g, '-'),
            images: [{ src: 'https://placehold.co/800x600.png', alt: body.name, aiHint: 'placeholder' }],
            ...body
        };

        products.push(newProduct);

        return new NextResponse(JSON.stringify(newProduct), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Invalid request body' }), { status: 400 });
    }
}
