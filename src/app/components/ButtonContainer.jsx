'use client'

export function ButtonContainer ({ children }) {

    const postSomeData = async () => {
        const res = await fetch('/api/sendData/', {method: 'POST'});
        window.alert("Data posted!")
    }

    return (
        <button onClick={postSomeData}>
            {children}
        </button>
    )

}
