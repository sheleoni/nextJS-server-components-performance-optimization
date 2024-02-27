import {NextResponse} from "next/server";

export async function POST() {
    const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Carrot Cake',
            /* other product data */
        })
    })
    const data = await res.json();
    console.log(data, 'Response from API')
    return NextResponse.json({ data })
}
