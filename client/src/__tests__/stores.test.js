import {observable} from 'mobx-react';
import * as fake from "../util/testData";
import { sleep, respondOK }  from "../util/testUtil";

describe('Main Store', () => {

    let api = null;
    let MainStore = null;

    beforeEach(() => {
        MainStore = require('../stores/MainStore').default;
        api = {};
        MainStore.api = api;
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

    it('@action waitForToken - should set a counter and try function again', () => {
        expect(MainStore.modals.has(2)).toBe(false);
        MainStore.waitForToken(() => console.log(1), [], 3000, 2);
        expect(MainStore.counter.has(2)).toBe(true);
    });

});