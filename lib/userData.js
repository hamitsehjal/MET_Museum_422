// import { getToken } from "./authenticate";
import { getToken } from "./authenticate";

//-  PUT request to /favourites/id
export async function addToFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            "Authorization": `JWT ${getToken()}`,
        },
    })

    const data = await res.json();
    if (res.status == 200) {
        return data;
    }
    else {
        return []
    }
}

//– DELETE request to /favourites/id
export async function removeFromFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `JWT ${getToken()}`
        }
    })

    const responseData = await res.json();
    if (res.status == 200) {
        return responseData;
    }
    else {
        return []
    }
}

// – GET request to /favourites
export async function getFavourites() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: {
            "Authorization": `JWT ${getToken()}`,
        }
    })

    const data = await res.json();
    if (res.status == 200) {
        return data;
    }
    else {
        return []
    }
}

//– PUT request to /history/id
export async function addToHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            "Authorization": `JWT ${getToken()}`,
            "content-type": "application/json"

        }
    })

    const responseData = await res.json();
    if (res.status == 200) {
        return responseData;
    }
    else {
        return []
    }
}

//– DELETE request to /history/id
export async function removeFromHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `JWT ${getToken()}`,
        }
    })

    const data = await res.json();
    if (res.status == 200) {
        return data;
    }
    else {
        return []
    }
}

//– GET request to /history
export async function getHistory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            "Authorization": `JWT ${getToken()}`,
        }
    })

    const data = await res.json();
    if (res.status == 200) {
        return data;
    }
    else {
        return []
    }
}
