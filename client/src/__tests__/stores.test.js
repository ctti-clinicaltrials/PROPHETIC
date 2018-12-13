import {observable} from 'mobx-react';
import * as fake from "../util/testData";
import { sleep, respondOK }  from "../util/testUtil";
import {action} from "mobx";

describe('Main Store', () => {

    let api = null;
    let MainStore = null;

    beforeEach(() => {
        MainStore = require('../stores/MainStore').default;
        api = {};
        MainStore.api = api;
    });

    it('@action setExclusions - should set an exclusion to Map()', () => {
        MainStore.data = [{'HIV': true},{'HIV': false}];
        expect(MainStore.data.some(d => d['HIV'] === false)).toBe(true);
        expect(MainStore.exclusions.has('HIV')).toBe(false);
        MainStore.setExclusions('HIV', true);
        expect(MainStore.exclusions.has('HIV')).toBe(true);
        MainStore.deleteExclusions('HIV', false);
    });

    it('@action deleteExclusions - should remove an exclusion from Map()', () => {
        expect(MainStore.exclusions.has('HIV')).toBe(false);
        MainStore.exclusions.set('HIV', true);
        expect(MainStore.exclusions.has('HIV')).toBe(true);
        MainStore.deleteExclusions('HIV', false);
        expect(MainStore.exclusions.has('HIV')).toBe(false);
    });

    it('@action toggleExclusion - should add/remove an exclusion from Map()', () => {
        expect(MainStore.exclusions.has('HIV')).toBe(false);
        MainStore.toggleExclusion('HIV', true);
        expect(MainStore.exclusions.has('HIV')).toBe(true);
        MainStore.toggleExclusion('HIV', false);
        expect(MainStore.exclusions.has('HIV')).toBe(false);
    });

    it('@action setInputValue - should set/remove an input value to Map()', () => {
        expect(MainStore.inputValues.has('HIV')).toBe(false);
        MainStore.setInputValue('HIV', 'test');
        expect(MainStore.inputValues.has('HIV')).toBe(true);
        expect(MainStore.inputValues.get('HIV')).toBe('test');
        MainStore.setInputValue('HIV', 'test', true);
        expect(MainStore.inputValues.has('HIV')).toBe(false);
    });

    it('@action setGraphData - should add an object to graphData. The object should have an action property', () => {
        MainStore.graphData = [{
            action: 'All Patients',
            pv: 200,
            range: false
        }];
        expect(MainStore.graphData.some(d => d['action'] === 'HIV')).toBe(false);
        expect(MainStore.graphData.some(d => d['action'] === 'All Patients')).toBe(true);
        MainStore.exclusions.set('HIV', { action: 'HIV', pv: 200, range: false });
        MainStore.setGraphData();
        expect(MainStore.graphData.some(d => d['action'] === 'HIV')).toBe(true);
    });

    it('@action filterData - should filter out value that is false', () => {
        MainStore.data = [{'HIV': true},{'HIV': false}];
        expect(MainStore.data.some(d => d['HIV'] === false)).toBe(true);
        MainStore.data = MainStore.filterData('HIV', false);
        expect(MainStore.data.some(d => d['HIV'] === false)).toBe(false);
    });

    it('@action setCookieConsent - should set an item in localStorage', () => {
        MainStore.data = [{'HIV': true},{'HIV': false}];
        expect(MainStore.data.some(d => d['HIV'] === false)).toBe(true);
        MainStore.data = MainStore.filterData('HIV', false);
        expect(MainStore.data.some(d => d['HIV'] === false)).toBe(false);
    });

    it('@action handleErrors - should throw an error', () => {
        expect(MainStore.errors.has(404)).toBe(false);
        MainStore.handleErrors({response: {
                status: 404
            }});
        expect(MainStore.errors.has(404)).toBe(true);
    });

    it('@action queueDownload - should set/delete download ID to Map if an ID is provided', () => {
        expect(MainStore.downloadQueue.has('test')).toBe(false);
        MainStore.queueDownload('test');
        expect(MainStore.downloadQueue.has('test')).toBe(true);
        MainStore.queueDownload();
        expect(MainStore.downloadQueue.has('test')).toBe(false);
    });

    it('@action setAnchorElement - should set an anchor element to Map', () => {
        expect(MainStore.anchorElements.has('test')).toBe(false);
        MainStore.setAnchorElement('t', 'test');
        expect(MainStore.anchorElements.has('test')).toBe(true);
        MainStore.setAnchorElement('t', 'test');
        expect(MainStore.anchorElements.has('test')).toBe(false);
    });

    it('@action setValidationErrors - should set a validation error to Map', () => {
        expect(MainStore.validationErrors.has('test')).toBe(false);
        MainStore.setValidationErrors('test');
        expect(MainStore.validationErrors.has('test')).toBe(true);
        MainStore.setValidationErrors('clearAll');
        expect(MainStore.validationErrors.has('test')).toBe(false);
    });

    it('@action toggleExpandedPanel - should set/delete panel ID to Map', () => {
        expect(MainStore.expandedPanels.has('test')).toBe(false);
        MainStore.toggleExpandedPanel('test');
        expect(MainStore.expandedPanels.has('test')).toBe(true);
        MainStore.toggleExpandedPanel('test');
        expect(MainStore.expandedPanels.has('test')).toBe(false);
    });

    it('@action toggleModal - should set/delete modal ID to Map', () => {
        expect(MainStore.modals.has('test')).toBe(false);
        MainStore.toggleModal('test');
        expect(MainStore.modals.has('test')).toBe(true);
        MainStore.toggleModal('test');
        expect(MainStore.modals.has('test')).toBe(false);
    });

    it('@action toggleLoading - should toggle loading state from true to false', () => {
        expect(MainStore.loading).toBe(false);
        MainStore.toggleLoading();
        expect(MainStore.loading).toBe(true);
        MainStore.toggleLoading();
        expect(MainStore.loading).toBe(false);
    });

    it('@action toggleDrawer - should add or remove id from Map', () => {
        expect(MainStore.drawers.has('test')).toBe(false);
        MainStore.toggleDrawer('test');
        expect(MainStore.drawers.size).toBe(1);
        expect(MainStore.drawers.has('test')).toBe(true);
        MainStore.toggleDrawer('test');
        expect(MainStore.drawers.has('test')).toBe(false);
        expect(MainStore.drawers.size).toBe(0);
    });

    it('@action toggleSharing - should toggle sharing icon visible state from true to false', () => {
        expect(MainStore.showSharingIcons).toBe(false);
        MainStore.toggleSharing();
        expect(MainStore.showSharingIcons).toBe(true);
        MainStore.toggleSharing();
        expect(MainStore.showSharingIcons).toBe(false);
    });

    it('@action waitForToken - should set a counter and try function again', () => {
        expect(MainStore.modals.has(2)).toBe(false);
        MainStore.waitForToken(() => console.log(1), [], 3000, 2);
        expect(MainStore.counter.has(2)).toBe(true);
    });

});
