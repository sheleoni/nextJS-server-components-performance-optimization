import {NextResponse} from "next/server";

export async function POST() {
    const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'FDSFDS',
            /* other product data */
        })
    })

    const data = await res.json();

    console.log(data, 'RESPONSE FROM SERVER')

    return NextResponse.json({ data })

    // return new Response("YO")
}
