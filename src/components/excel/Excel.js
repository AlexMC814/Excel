import dom from '@core/dom';
import { EventEmitter } from '@core/EventEmitter';

class Excel {
  constructor(selector, options) {
    this.$el = dom(selector);
    this.components = options.components || [];
    this.emitter = new EventEmitter();
  }

  getRoot() {
    const $root = dom.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
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

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}

export default Excel;
