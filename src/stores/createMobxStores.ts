import { Stores } from '../types';
import EmailTemplateStore from './EmailTemplateStore';
import NavigationStore from './NavigationStore';

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