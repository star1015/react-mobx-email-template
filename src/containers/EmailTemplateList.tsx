import React from 'react';
import { observer, inject } from 'mobx-react';

import EmailTemplateStore from '../stores/EmailTemplateStore';
import { Stores } from '../types';
import { IEmailTemplate, InputData } from '../models/EmailTemplateModel';

// Components
import CardComponent from '../components/CardComponent';
import SideBarComponent from '../components/SideBarComponent';
import NavigationStore from '../stores/NavigationStore';

interface SelectedStores {
    emailTemplateStore?: EmailTemplateStore;
    navigationStore?: NavigationStore;
}

interface IProps extends SelectedStores {
    history: any;
}

interface IState {
    isOpen: boolean;
}

// eslint-disable-next-line no-restricted-globals
@inject(({emailTemplateStore, navigationStore }: Stores) => ({ emailTemplateStore, navigationStore }))
@observer
export default class EmailTemplateList extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        const { emailTemplateStore } = this.props;
        emailTemplateStore?.getTemplates();
    }
    
    removeTemplate = (e: React.MouseEvent, id?: number) => {
        e.stopPropagation();

        const { emailTemplateStore } = this.props;
        emailTemplateStore?.removeTemplate(id);
    }

    // After clicking one of template, redirect to the detailed page with template ID.
    goToEditTemplate = (id?: number) => {
        const { navigationStore } = this.props;
        navigationStore?.push(`/template/${id}`);
    }

    handleCloseSideBar = (e: React.MouseEvent) => {
        this.setState({ isOpen: false });
    }

    handleOpenSideBar = (e: React.MouseEvent) => {
        e.stopPropagation();

        this.setState({ isOpen: true });
    }

    // Create a new Email Template.
    handleSubmit = (item: InputData) => {
        const { emailTemplateStore } = this.props;

        emailTemplateStore?.addTemplate(item);
    }

    render() {
        const { emailTemplateStore } = this.props;
        const { isOpen } = this.state;
        
        return (
            <React.Fragment>
                <div className="email-section" onClick={this.handleCloseSideBar}>
                    <div className="header">
                        <div className="btns">
                            <button className="btn btn-primary btn-add" onClick={this.handleOpenSideBar}>Add Template</button>
                        </div>
                    </div>
                    <div className="row">
                        {emailTemplateStore?.eTemplateInfos.map((item: IEmailTemplate, index) => (
                            <div className="col-md-4" key={index}>
                                <CardComponent item={item} goToEditTemplate={this.goToEditTemplate} removeTemplate={this.removeTemplate}/>
                            </div>
                        ))}
                    </div>
                </div>
                {isOpen && <SideBarComponent handleSubmit={this.handleSubmit} />}
            </React.Fragment>
        )
    }
}
