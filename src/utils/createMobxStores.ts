import { Stores } from '../types';
import EmailTemplateStore from '../stores/EmailTemplateStore';
import NavigationStore from '../stores/NavigationStore';

/**
 * Create the Mobx stores
 */
const navigationStore = new NavigationStore();
export default function createMobxStores(): Stores {
    return {
        navigationStore,
        emailTemplateStore: new EmailTemplateStore(navigationStore)
    };
}