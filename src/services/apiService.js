const BASE_URL = 'http://localhost:8080';


export const normalize = async (columns, functionName, idFile) => {
    const response = sendPost({
        columns: columns.join(','),
        functionName: functionName,
        idFile: idFile
    }, 'data/normalize');
    
    console.log(response);
}

export const validate = async (columns, functionName, idFile) => {
    return sendPost({
        columns: columns.join(','),
        functionName: functionName,
        idFile: idFile
    }, 'data/validate');
}

export const sendPost = async (data, url) => {
    const formData = new URLSearchParams();

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }

    const response = await fetch(`${BASE_URL}/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
    });

    if (!response.ok) {
        throw new Error('Error sending data');
    }

    return response.json();
};
