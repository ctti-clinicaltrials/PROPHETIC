import { config } from './config';
import { getFetchParams } from './util/fetchUtil';

const api = {

    test: () => {
        return fetch(`${config.APP_URL}api/status`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    },

    downloadDataset: (id, token) => {
        return fetch(`${config.DDS_API_URL}files/${id}/url`, getFetchParams('get', token))
    },

    getDDSApiToken: () => {
        return fetch(`${config.APP_URL}api/agent-token`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    },

    getAllDataSets: (token) => {
        return fetch(`${config.DDS_API_URL}projects/${config.DDS_PROJECT_ID}/children`,getFetchParams('get', token))
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
    },

    getTrialData: () => {
        return fetch(`${config.APP_URL}api/trial-data`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    }
};

export default api;