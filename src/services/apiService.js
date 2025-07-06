const BASE_URL = 'http://localhost:8080';



export const loadHistory = async (idFile) => {
    return sendGet('file/getHistory/' + idFile);
}

export const newFile = async (name) => {
    return sendPost({
        name: name,
        type: 'table'
    }, 'file/new');
}

export const normalize = async (columns, functionName, idFile) => {
    const response = sendPost({
        columns: columns.join(','),
        functionName: functionName,
        idFile: idFile
    }, 'data/normalize');
}

export const validate = async (columns, functionName, idFile) => {
    return sendPost({
        columns: columns.join(','),
        functionName: functionName,
        idFile: idFile
    }, 'data/validate');
}

export const addColumn = async (position, idFile) => {
    let name = prompt('Column name?');

    if(name !== null && name.trim() !== '') {
        return sendPost({
            name: name,
            position: position,
            idFile: idFile
        }, 'structure/addColumn');
    }
    return null;
}


export const fillFixedValue = async (columns, idFile, newValue) => {
    return sendPost({
        columns: columns.join(','),
        idFile: idFile,
        newValue: newValue
    }, 'data/fillFixedValue');
}

export const fillAutoIncremental = async (columns, idFile) => {
    return sendPost({
        columns: columns.join(','),
        idFile: idFile
    }, 'data/fillAutoIncremental');
}

export const sendGet = async (url) => {
    const response = await fetch(`${BASE_URL}/${url}`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
    return await response.json();
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
