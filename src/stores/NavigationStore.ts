import { observable, action } from 'mobx'
import { history } from '../history';

export default class NavigationStore {
  @observable
    location!: string;

  @action push(location: string) {
    history.push(location);
  }
}
