import React from 'react';
import { IEmailTemplate } from '../models/EmailTemplateModel';

interface IProps {
    item: IEmailTemplate;
    removeTemplate: (e: React.MouseEvent, id?: number) => void;
    goToEditTemplate: (id?: number) => void;
}

export default class CardComponent extends React.Component<IProps, {}> {
    
    render() {
        const { item, removeTemplate, goToEditTemplate } = this.props;
        
        return(
            <React.Fragment>
                <div className="card" onClick={() => goToEditTemplate(item.id)}>
                    <div className="card-body">
                        <span><b>{item.title}</b></span>
                        <button className="btn btn-secondary btn-remove" onClick={(e) => removeTemplate(e, item.id)}>Remove</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
