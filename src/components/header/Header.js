import dom from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constants';
import { debounce } from '@core/utils';
import { ActiveRoute } from '@core/routes/ActiveRoute';

class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}">
        <div>
            <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
            </div>
            <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
        </div>
    `;
  }

  onInput(event) {
    const $target = dom(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = dom(event.target);
    const $button = $target.data.button;

    if ($button === 'remove') {
      const decision = confirm('Удалить эту таблицу?');

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}

export default Header;
