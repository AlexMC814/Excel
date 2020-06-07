import dom from '@core/dom';
import { EventEmitter } from '@core/EventEmitter';
import { StoreSubscriber } from '@core/StoreSubscriber';
import { updateDate } from '@/redux/actions';

class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.emitter = new EventEmitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = dom.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map(Component => {
      const $el = dom.create('div', Component.className);

      const component = new Component($el, componentOptions);

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  init() {
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}

export default Excel;
