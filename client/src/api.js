import { config } from './config';
import { getFetchParams } from './util/fetchUtil';

const api = {

    test: () => {
        return fetch(`${config.APP_URL}api/status`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    },

    downloadDataset: (id, token) => {
        // return fetch(`${config.DDS_API_URL}/files/${id}/url`, getFetchParams('get', token))
    },

    getDDSApiToken: () => {
        return fetch(`${config.APP_URL}api/agent-token`, getFetchParams('get', 'Bearer ' +localStorage.getItem('access_token')))
    },

    getProjects: (token) => {
        return fetch(`${config.DDS_API_URL}/projects?per_page=1000`, getFetchParams('get', token))
    },

    getAllDataSets: (token) => {
        // return fetch(`${config.DDS_API_URL}projects/${config.DDS_PROJECT_ID}/children`,getFetchParams('get', token))
    },

    getDatasetMetadata: (id, token) => {
        return fetch(`${config.DDS_API_URL}meta/dds-file/${id}`,getFetchParams('get', token))
    },

    postUserSession: (profile) => {
        // const body = {
        //     "name": profile.name,
        //     "email": profile.email,
        //     "login_time": new Date().getTime(),
        // };
        // return fetch(`https://morning-dusk-94993.herokuapp.com/api/usersessions`, getFetchParams('post', 'Bearer ' +localStorage.getItem('access_token'), body))
    }
};

export default api;