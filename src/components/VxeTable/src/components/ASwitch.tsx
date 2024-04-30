import { h } from 'vue';
import XEUtils from 'xe-utils';
import {
  createEditRender,
  createDefaultRender,
  createProps,
  createEvents,
  createDefaultFilterRender,
  createFormItemRender,
  getComponent,
} from './common';

export default {
  renderDefault: createDefaultRender(),
  renderEdit: createEditRender(),
  renderFilter(renderOpts, params) {
    const { column } = params;
    const { name, attrs } = renderOpts;
    const Component = getComponent(name);

    return [
      h(
        'div',
        {
          class: 'vxe-table--filter-antd-wrapper',
        },
        column.filters.map((option, oIndex) => {
          const optionValue = option.data;
          return h(Component, {
            key: oIndex,
            ...attrs,
            ...createProps(renderOpts, optionValue),
            ...createEvents(
              renderOpts,
              params,
              (value: any) => {

                option.data = value;
              },
              () => {

                const { $panel } = params;
                $panel.changeOption(null, XEUtils.isBoolean(option.data), option);
              },
            ),
          });
        }),
      ),
    ];
  },
  defaultFilterMethod: createDefaultFilterRender(),
  renderItemContent: createFormItemRender(),
};
