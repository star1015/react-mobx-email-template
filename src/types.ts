import EmailTemplateStore from './stores/EmailTemplateStore';
import NavigationStore from './stores/NavigationStore';

export interface Stores {
    navigationStore: NavigationStore,
    emailTemplateStore: EmailTemplateStore;
}

