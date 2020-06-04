import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настройка компонента до init()
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей о событии event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписка на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  /*
    Сюда приходят только изменения по тем полям, на которые подписаны компоненты
  */
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализация компонента, добавление DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаление компонент, чистка DOM слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
