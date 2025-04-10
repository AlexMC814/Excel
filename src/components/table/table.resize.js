import dom from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = dom(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    if (type === 'col') {
      document.onmousemove = e => {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({ right: -delta + 'px' });
      };
    } else {
      document.onmousemove = e => {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({ bottom: -delta + 'px' });
      };
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({ width: value + 'px' });
        cells.forEach(el => (el.style.width = value + 'px'));
      } else {
        $parent.css({ height: value + 'px' });
      }

      resolve({
        value,
        type,
        // id: type === 'col' ? $parent.data.col : $parent.data.row,
        id: $parent.data[type],
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
