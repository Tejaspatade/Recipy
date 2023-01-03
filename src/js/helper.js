import { TIMEOUT } from "./config";

// Pass in any URL to fetch JSON from it. Returns JSON data or error.
export async function getJson(url) {
    try {
        // Fetch Recipe for passed id
        const res = await Promise.race([fetch(url), timeout(TIMEOUT)]);
        // Get Data from Response
        const data = await res.json();

        // Error Handling
        if (!res.ok) throw new Error(data.message, res.status);

        // Return data as Promise Value
        return data;
    } catch (err) {
        // Propagate error down call chain
        throw err;
    }
}

//
export async function sendJson(url, uploadData) {
    try {
        const fetchR = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(uploadData),
        });
        // Fetch Recipe for passed id
        const res = await Promise.race([fetchR, timeout(TIMEOUT)]);
        // Get Data from Response
        const data = await res.json();

        // Error Handling
        if (!res.ok) throw new Error(data.message, res.status);

        // Return data as Promise Value
        return data;
    } catch (err) {
        // Propagate error down call chain
        throw err;
    }
}

// Slow Connection Time Out
function timeout(s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
}
