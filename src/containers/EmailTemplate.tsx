import React from 'react';
import {  RouteComponentProps } from 'react-router-dom';
import EmailEditor, { Design } from 'react-email-editor';
import { observer, inject } from 'mobx-react';

import EmailTemplateStore from '../stores/EmailTemplateStore';
import { Stores } from '../types';
import { IEmailTemplate } from '../models/EmailTemplateModel';

// Component

// Predefined Tokens
import { tokens } from '../constants/tokens';

interface SelectedStores {
    store?: EmailTemplateStore;
}

interface MatchParams {
    id: string | undefined;
}

interface IProps extends SelectedStores, RouteComponentProps<MatchParams> {}

interface IState {
    selectedTemplate?: IEmailTemplate;
    isEditorLoading: Boolean;
}

@inject((stores: Stores) => ({ store: stores.emailTemplateStore }))
@observer
export default class EmailTemplate extends React.Component<IProps, IState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    emailEditorRef?: any;

    constructor(props: IProps) {
        super(props);
        this.emailEditorRef = React.createRef();

        this.state = {
            selectedTemplate: {},
            isEditorLoading: true
        }
    }

    componentDidMount() {
        const { store } = this.props;
        
        store?.getTemplateByID(parseInt(this.props.match.params.id!));
    }

    // To prevent errors such like emailEditorRef is null, 
    // Use this componentDidUpdate() lifecycle method to get real DOM of object of Email Editor by emailEditorRef object.
    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.isEditorLoading !== this.state.isEditorLoading) {
            setTimeout(() => {
                const { store } = this.props;

                // Load Design
                this.emailEditorRef.current.editor && this.emailEditorRef.current.editor.addEventListener(
                    'onDesignLoad',
                    this.onDesignLoad
                );
    
                this.emailEditorRef.current.editor.loadDesign(store?.eSelectedTemplate.body);

                this.emailEditorRef.current.setMergeTags(tokens);
            }, 500);
        }
    }

    saveDesign = () => {
        const { store } = this.props;

        this.emailEditorRef.current.editor.saveDesign((design: Design) => {
            store?.updateTemplate({...store?.eSelectedTemplate, body: design });
        })
    }

    onDesignLoad = (data: Design) => {
        console.log("onDesignLoad", data);
    }

    onLoad = () => {
        // When Email Editor Component is loaded.
        this.setState({ isEditorLoading: false });
    };

    render() {
        return(
            <React.Fragment>
                <div className="email-section">
                    <div className="header">
                        <div className="btns">
                            <button className="btn btn-secondary btn-update" onClick={this.saveDesign}>Save Design</button>
                        </div>
                    </div>
                    <EmailEditor
                        ref={this.emailEditorRef}
                        onLoad={this.onLoad}
                    />
                </div>
            </React.Fragment>
        )
    }
}
