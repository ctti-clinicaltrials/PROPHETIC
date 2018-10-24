import { observable, action } from 'mobx';
import api from '../api';
import AuthStore from './AuthStore';
import { checkStatus } from '../util/fetchUtil';
import { generateUniqueKey } from '../util/baseUtils';
import EmailValidator from 'email-validator';

export class MainStore {
    @observable anchorElements;
    @observable datasets;
    @observable downloadQueue;
    @observable errors;
    @observable exclusions;
    @observable expandedPanels;
    @observable counter;
    @observable drawers;
    @observable loading;
    @observable openNav;
    @observable modals;
    @observable showSharingIcons;
    @observable surveyAffiliations;
    @observable validationErrors;

    constructor() {
        this.anchorElements = observable.map();
        this.counter = observable.map();
        this.datasets = [];
        this.downloadQueue = observable.map();
        this.errors = observable.map();
        this.exclusions = observable.map();
        this.expandedPanels = observable.map();
        this.drawers = observable.map();
        this.loading = false;
        this.openNav = false;
        this.modals = observable.map();
        this.showSharingIcons = false;
        this.surveyAffiliations = observable.map();
        this.validationErrors = observable.map();

        this.organizationTypes = [
            "Academic Medical Center",
            "Non-academic Clinical Research Site",
            "Clinical Research Organization",
            "Institutional Review Board",
            "Industry - Pharmaceutical",
            "Industry - Device",
            "Industry - Other",
            "Government (FDA, NIH, VA)"
        ]
    }

    @action deleteExclusion(exclusion) {
        this.exclusions.delete(exclusion)
    }

    @action downloadDataset() {
        const id = this.downloadQueue.keys().next().value;
        api.downloadDataset(id, AuthStore.ddsAPIToken)
            .then(checkStatus)
            .then(response => response.json())
            .then((json) => {
                const host = json.host;
                const url = json.url;
                const win = window.open(host + url, '_blank');
                if (win) {
                    win.focus();
                } else { // if browser blocks popups use location.href instead
                    window.location.href = host + url;
                }
                this.queueDownload();
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

    @action formatFormData(inputs) {
        let formData = inputs.map(i => {
            let key = i.labels[0].textContent.replace(/[^\x00-\x7F]/g, '').slice(0, -1);
            return {[key]:i.value}
        });
        let affiliations = [...this.surveyAffiliations.keys()].filter((k) => k !== 'other');
        if(this.surveyAffiliations.has('other')) {
            affiliations.push(`other: ${inputs.filter((i) => i.id === 'other')[0].value}`)
        }
        return [...formData, {affiliations: [...affiliations]}];
    }

    @action postUserResponse(inputs) {
        const { userProfile } = AuthStore;
        const file = this.datasets.find(d => d.id ===this.downloadQueue.keys().next().value).file;
        const formData = this.formatFormData(inputs);
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

    @action setExclusions(exclusion, value) {
        this.exclusions.set(exclusion, value)
        console.log(this.exclusions)
    }

    @action setSurveyAffiliations(id) {
        if(id === 'clearAll') {
            this.surveyAffiliations.clear();
        } else {
            if (!this.surveyAffiliations.has(id)) {
                this.surveyAffiliations.set(id)
            } else {
                this.surveyAffiliations.delete(id);
                if (id === 'other') {
                    this.setValidationErrors(id)
                }
            }
        }
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

    @action toggleExclusion(input, value) {
        if(!this.exclusions.has(input)) {
            this.setExclusions(input, value);
        } else {
            this.deleteExclusion(input, value);
        }
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

    @action validateTextInputs(inputs) {
        inputs.forEach(t => {
            let text = t.value.trim();
            if(t.id === 'email' &&
                !EmailValidator.validate(text)
            ) {
                this.setValidationErrors(t.id);
            }
            if((t.id !== 'email' || t.id === 'email' &&
                EmailValidator.validate(t.value.trim())) &&
                ((text.length && (this.validationErrors.has(t.id))) ||
                (!text.length && !this.validationErrors.has(t.id)))
            ) {
                this.setValidationErrors(t.id);
            }
        });
        if(!this.surveyAffiliations.size > 0 && !this.validationErrors.has('checkboxes')) {
            this.setValidationErrors('checkboxes');
        }
        return !this.validationErrors.size &&
            !inputs.some(i => i.value.trim().length <= 0) &&
            !!this.surveyAffiliations.size > 0
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