const service = {
    async postData(url = '', data = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            return { error: null, data: json };
        } catch (e) {
            return { error: e, data: null };
        }
    },
    async deleteData(url = '') {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            const json = await response.json();
            return { error: null, data: json };
        } catch (e) {
            return { error: e, data: null };
        }
    }
};

export default service;
