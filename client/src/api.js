import { config } from './config';
import { getFetchParams } from './util/fetchUtil';

const api = {

    test: () => {
        return fetch(`${config.APP_URL}api/status`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    },

    uploadFile: (file) => {
        let data = new FormData();
        data.append('file', file);
        console.log(file)
        // return fetch(`${config.APP_URL}api/files`, {
        //     method: 'POST',
        //     body: data
        // })
        return fetch(`${config.APP_URL}api/files`, getFetchParams('post', 'Bearer ' +localStorage.getItem('access_token'), data, true))
    },

    downloadDataset: (id, token) => {
        return fetch(`${config.DDS_API_URL}files/${id}/url`, getFetchParams('get', token))
    },

    getDDSApiToken: () => {
        return fetch(`${config.APP_URL}api/agent-token`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    },

    getProjects: (token) => {
        return fetch(`${config.DDS_API_URL}projects?per_page=1000`, getFetchParams('get', token))
    },

    getAllDataSets: (token) => {
        return fetch(`${config.DDS_API_URL}projects/${config.DDS_PROJECT_ID}/children`, getFetchParams('get', token))
    },

    getDatasetMetadata: (id, token) => {
        return fetch(`${config.DDS_API_URL}meta/dds-file/${id}`,getFetchParams('get', token))
    },

    postUserResponse: (profile, formData, file) => {
        const body = {
            "name": profile.name,
            "email": profile.email,
            "file": file,
            "answers": formData,
        };
        return fetch(`${config.APP_URL}api/user-response`, getFetchParams('post', 'Bearer ' +localStorage.getItem('access_token'), body))
    }
};

export default api;