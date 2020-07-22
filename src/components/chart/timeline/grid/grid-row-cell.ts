/**
 * ChartTimelineGridRowCell component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   AGPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */

import { Row, ChartTimeDate, Rows, Vido } from '../../../../gstc';
import { ListenerFunctionEventInfo } from 'deep-state-observer';

/**
 * Bind element action
 * @param {Element} element
 * @param {any} data
 * @returns {object} with update and destroy
 */

class BindElementAction {
  constructor(element, data) {
    let shouldUpdate = false;
    let cells = data.state.get('$data.elements.chart-timeline-grid-row-cells');
    if (typeof cells === 'undefined') {
      cells = [];
      shouldUpdate = true;
    }
    if (!cells.includes(element)) {
      cells.push(element);
      shouldUpdate = true;
    }
    if (shouldUpdate) data.state.update('$data.elements.chart-timeline-grid-row-cells', cells, { only: null });
  }

  public destroy(element, data) {
    data.state.update(
      '$data.elements.chart-timeline-grid-row-cells',
      (cells) => {
        return cells.filter((el) => el !== element);
      },
      { only: [''] }
    );
  }
}

interface Props {
  id: string;
  row: Row;
  time: ChartTimeDate;
}

function ChartTimelineGridRowCell(vido: Vido, props: Props) {
  const { api, state, onDestroy, Detach, Actions, update, html, onChange, StyleMap } = vido;
  const componentName = 'chart-timeline-grid-row-cell';
  const actionProps = {
    ...props,
    api,
    state,
  };

  let shouldDetach = false;
  const detach = new Detach(() => shouldDetach);

  const componentActions = api.getActions(componentName);
  let wrapper;
  onDestroy(
    state.subscribe('config.wrappers.ChartTimelineGridRowCell', (value) => {
      wrapper = value;
      update();
    })
  );

  const slots = api.generateSlots(componentName, vido, props);

  let className;
  function updateClassName(time: ChartTimeDate) {
    className = api.getClass(componentName, props.id);
    if (time.current) {
      className += ' current';
    }
  }
  updateClassName(props.time);
  const styleMap = new StyleMap({ width: '', height: '' });

  function onPropsChange(changedProps: Props, options) {
    if (options.leave || changedProps.row === undefined) {
      shouldDetach = true;
      slots.change(changedProps, options);
      return update();
    }
    shouldDetach = false;
    props = changedProps;
    for (const prop in props) {
      actionProps[prop] = props[prop];
    }
    updateClassName(props.time);
    styleMap.setStyle({});
    styleMap.style.width = (props?.time?.width || 0) + 'px';
    styleMap.style.height = (props?.row?.$data?.outerHeight || 0) + 'px';
    const rows: Rows = api.getAllRows();
    for (const parentId of props.row.$data.parents) {
      const parent = rows[parentId];
      const childrenStyle = parent?.style?.grid?.cell?.children;
      if (childrenStyle) styleMap.setStyle({ ...styleMap.style, ...childrenStyle });
    }
    const currentStyle = props?.row?.style?.grid?.cell?.current;
    if (currentStyle) styleMap.setStyle({ ...styleMap.style, ...currentStyle });
    slots.change(props, options);
    update();
  }
  onChange(onPropsChange);

  componentActions.push(BindElementAction);
  const actions = Actions.create(componentActions, actionProps);

  return (templateProps) => {
    return wrapper(
      html`
        ${slots.html('before', templateProps)}
        <div detach=${detach} class=${className} data-actions=${actions} style=${styleMap}>
          ${slots.html('inside', templateProps)}
        </div>
        ${slots.html('after', templateProps)}
      `,
      {
        props,
        vido,
        templateProps,
      }
    );
  };
}
export default ChartTimelineGridRowCell;
