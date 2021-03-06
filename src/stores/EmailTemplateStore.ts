import { observable, action, computed, makeObservable, runInAction } from 'mobx';
import axios from 'axios';

import NavigationStore from './NavigationStore';
import { IEmailTemplate, InputData } from '../models/EmailTemplateModel';
import logger from '../utils/logger';

export default class EmailTemplateStore {

    @observable.ref eTemplates: IEmailTemplate[] = [];
    @observable.ref selectedTemplate: IEmailTemplate = {};
    @observable message: string = '';

    _navigationStore: NavigationStore;

    constructor(navigationStore: NavigationStore) {
        makeObservable(this);
        this._navigationStore = navigationStore;
    }

    @action addTemplate = async (eTemplateInfo: InputData) => {
        axios.post(`${process.env.REACT_APP_API_URL}/create`, eTemplateInfo).then((res) => {
            runInAction(() => {
                this.eTemplates = [res.data, ...this.eTemplates];
            });

            this._navigationStore.push(`template/${res.data.id}`);
        }).catch((err) => logger.error(err));
    }

    @action getTemplates = (): void => {
        axios.get(`${process.env.REACT_APP_API_URL}/get-all`).then((res) => {
            runInAction(() => {
                this.eTemplates = res.data;
            });
        }).catch((err) => logger.error(err));
    }

    @action getTemplateByID = (id?: number): void => {
        this.selectedTemplate = {};
        axios.get(`${process.env.REACT_APP_API_URL}/get/${id}`).then((res) => {
            runInAction(() => {
                this.selectedTemplate = res.data[0];
            });
        }).catch((err) => logger.error(err));
    }

    @action removeTemplate = (id?: number): void => {
        axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`).then((res) => {
            if (res.status) {
                runInAction(() => {
                    const updateTemplates = this.eTemplates.filter((item: IEmailTemplate) => item.id !== id)
                    this.eTemplates = updateTemplates;
                });
            }
        }).catch((err) => logger.error(err));
    }

    @action updateTemplate = (eTemplateInfo: IEmailTemplate): void => {
        axios.post(`${process.env.REACT_APP_API_URL}/update`, eTemplateInfo).then((res) => {
            // eslint-disable-next-line array-callback-return
            runInAction(() => {
                this.message = "Design saved successfully!";
                setTimeout(() => {
                    this.message = '';    
                }, 1000);
            });
        }).catch((err) => logger.error(err));
    }

    //Trigger eTemplates Array.
    @computed get eTemplateInfos() {
        return this.eTemplates;
    }

    @computed get eSelectedTemplate() {
        return this.selectedTemplate;
    }

    @computed get eMessageInfo() {
        return this.message;
    }
}