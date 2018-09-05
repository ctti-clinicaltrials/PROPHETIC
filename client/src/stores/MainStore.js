import { observable, action } from 'mobx';
import api from '../api';
import AuthStore from './AuthStore';
import { checkStatus } from '../util/fetchUtil';
import { generateUniqueKey } from '../util/baseUtils';

export class MainStore {
    @observable anchorElements;
    @observable datasets;
    @observable downloadQueue;
    @observable errors;
    @observable expandedPanels;
    @observable counter;
    @observable drawers;
    @observable loading;
    @observable openNav;
    @observable modals;
    @observable showSharingIcons;
    @observable validationErrors;

    constructor() {
        this.anchorElements = observable.map();
        this.counter = observable.map();
        this.datasets = [];
        this.downloadQueue = observable.map();
        this.errors = observable.map();
        this.expandedPanels = observable.map();
        this.drawers = observable.map();
        this.loading = false;
        this.openNav = false;
        this.modals = observable.map();
        this.showSharingIcons = false;
        this.validationErrors = observable.map();
    }

    @action uploadFile(file) {
        api.uploadFile(file)
            .then(checkStatus)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(er => this.handleErrors(er))
    }

    @action downloadDataset() {
        const id = this.downloadQueue.keys().next().value;
        api.downloadDataset(id, AuthStore.ddsAPIToken)
            .then(checkStatus)
            .then(response => response.json())
            .then((json) => {
                let host = json.host;
                let url = json.url;
                let win = window.open(host + url, '_blank');
                if (win) {
                    win.focus();
                } else { // if browser blocks popups use location.href instead
                    window.location.href = host + url;
                }
                this.queueDownload();
            }).catch(ex => this.handleErrors(ex))
    }

    @action downloadFile() {
        let id = "5b8457d0858e2a56ca844250";
        api.downloadFile(id)
            .then(checkStatus)
            .then(response => {
                console.log(response)
                response.headers.forEach(h => console.log(h))
                if (!response.ok) {
                    throw Error(response.status+' '+response.statusText)
                }

                if (!response.body) {
                    throw Error('ReadableStream not yet supported in this browser.')
                }

                const contentLength = response.headers.get('content-length');
                if (!contentLength) {
                    throw Error('Content-Length response header unavailable');
                }

                const total = parseInt(contentLength, 10);
                let loaded = 0;
                let complete = Math.round(loaded/total*100)+'%';
                function progress({loaded, total}) {
                    complete = Math.round(loaded/total*100)+'%';
                }

                return new Response(
                    new ReadableStream({
                        start(controller) {
                            const reader = response.body.getReader();

                            read();
                            function read() {
                                reader.read().then(({done, value}) => {
                                    if (done) {
                                        console.log('done')
                                        controller.close();
                                        return;
                                    }
                                    loaded += value.byteLength;
                                    progress({loaded, total})
                                    console.log(loaded)
                                    controller.enqueue(value);
                                    read();
                                }).catch(error => {
                                    console.error(error);
                                    controller.error(error)
                                })
                            }
                        }
                    })
                );
            }).catch(ex => this.handleErrors(ex))
    }

    @action getAllDataSets(cid) {
        mainStore.toggleLoading();
        const token = AuthStore.ddsAPIToken;
        if(token) {
            api.getAllDataSets(token)
                .then(checkStatus)
                .then(response => response.json())
                .then((json) => {
                    let datasets = json.results;
                    json.results.forEach((d) => {
                        api.getDatasetMetadata(d.id, token)
                            .then(checkStatus)
                            .then(response => response.json())
                            .then((json) => {
                                // If metadata is not defined just show the dataset without it
                                if(!json.results.length ) {
                                        mainStore.datasets.push({
                                            id: d.id,
                                            file: d
                                        })
                                }
                                datasets.map(d => {
                                    json.results.map(m => {
                                        if (m.object.id === d.id) {
                                            mainStore.datasets.push({
                                                metadata: m.properties.map(p => p),
                                                id: d.id,
                                                file: d
                                            })
                                        }
                                    });
                                });
                            })
                            .catch(ex => mainStore.handleErrors(ex))
                    });
                    mainStore.toggleLoading();
                })
                .catch(ex => mainStore.handleErrors(ex))
        } else {
            const counterId = cid !== undefined ? cid : generateUniqueKey();
            mainStore.toggleLoading();
            mainStore.waitForToken(mainStore.getAllDataSets, [counterId], 1000, counterId);
        }
    }

    @action handleErrors(er) {
        this.loading = false;
        if(er.response) {
            if (er.response.status === 401) {
                localStorage.setItem('redirectUrl', window.location.href);
                AuthStore.logout(er);
            } else {
                this.errors.set(er.response.status, er);
            }
        } else {
            console.log(er);
            throw new Error(er)
        }
    }

    @action postUserResponse(modalId, inputs) {
        let formData = [];
        const { userProfile } = AuthStore;
        let file = this.datasets.find(d => d.id ===this.downloadQueue.keys().next().value).file;
        formData = inputs.map(i => {
            let question = i.labels[0].textContent.replace(/[^\x00-\x7F]/g, ''); // Remove any unicode chars
            return {
                question: question, answer: i.value
            }
        });
        this.toggleModal(modalId);
        api.postUserResponse(userProfile, formData, file)
            .then(checkStatus)
            .then(response => response.json())
            .then(this.downloadDataset())
            .catch(er => this.handleErrors(er))
    }

    @action setAnchorElement(anchorEl, i) {
        let a = this.anchorElements;
        !a.has(i) ? a.set(i, anchorEl) : a.delete(i);
        this.anchorElements = a;
    }

    @action setValidationErrors(id) {
        if(id === 'clearAll') {
            this.validationErrors.clear();
        } else {
            if (!this.validationErrors.has(id)) {
                this.validationErrors.set(id)
            } else {
                this.validationErrors.delete(id)
            }
        }
    }

    @action toggleDrawer(key) {
        !this.drawers.has(key) ? this.drawers.set(key, true) : this.drawers.delete(key);
    }

    @action toggleExpandedPanel(id) {
        if(this.expandedPanels.has(id)) {
            this.expandedPanels.delete(id);
        } else {
            this.expandedPanels.clear();
            this.expandedPanels.set(id);
        }
    }

    @action toggleLoading() {
        this.loading = !this.loading;
    }

    @action toggleModal(id) {
        if(this.modals.has(id)) {
            this.modals.delete(id)
        } else {
            this.modals.set(id)
        }
    }

    @action toggleSharing() {
        this.showSharingIcons = !this.showSharingIcons;
    }

    @action queueDownload(id) {
        if(id) {
            this.downloadQueue.set(id)
        } else {
            this.downloadQueue.clear();
        }
    }

    @action waitForToken(func, args, delay, counterId) {
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        if(!this.counter.has(counterId)) {
            this.counter.set(counterId, 0);
        } else {
            let c = this.counter.get(counterId);
            c++;
            this.counter.set(counterId, c);
        }
        if(this.counter.get(counterId) < 10) {
            const tryAgain = async () => {
                await sleep(delay);
                func(...args);
            };
            tryAgain();
        } else {
            this.counter.delete(counterId);
            alert('failed to fetch')
        }
    }
}

const mainStore = new MainStore();

export default mainStore;