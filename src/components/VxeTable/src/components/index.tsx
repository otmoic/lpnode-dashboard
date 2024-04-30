import { VXETableCore, VxeGlobalInterceptorHandles } from 'vxe-table';
import AAutoComplete from './AAutoComplete';
import AInput from './AInput';
import AInputNumber from './AInputNumber';
import ASelect from './ASelect';
import ACascader from './ACascader';
import ADatePicker from './ADatePicker';
import AMonthPicker from './AMonthPicker';
import ARangePicker from './ARangePicker';
import AWeekPicker from './AWeekPicker';
import ATreeSelect from './ATreeSelect';
import ATimePicker from './ATimePicker';
import ARate from './ARate';
import ASwitch from './ASwitch';
import ARadioGroup from './ARadioGroup';
import ACheckboxGroup from './ACheckboxGroup';
import AButton from './AButton';
import AButtonGroup from './AButtonGroup';
import AApiSelect from './AApiSelect';
import AEmpty from './AEmpty';
import AInputSearch from './AInputSearch';
import AYearPicker from './AYearPicker';


function getEventTargetNode(evnt: any, container: HTMLElement, className: string) {
  let targetElem;
  let target = evnt.target;
  while (target && target.nodeType && target !== document) {
    if (
      className &&
      target.className &&
      target.className.split &&
      target.className.split(' ').indexOf(className) > -1
    ) {
      targetElem = target;
    } else if (target === container) {
      return { flag: className ? !!targetElem : true, container, targetElem: targetElem };
    }
    target = target.parentNode;
  }
  return { flag: false };
}

function handleClearEvent(
  params:
    | VxeGlobalInterceptorHandles.InterceptorClearFilterParams
    | VxeGlobalInterceptorHandles.InterceptorClearActivedParams
    | VxeGlobalInterceptorHandles.InterceptorClearAreasParams,
) {
  const { $event } = params;
  const bodyElem = document.body;
  if (

    getEventTargetNode($event, bodyElem, 'ant-select-dropdown').flag ||

    getEventTargetNode($event, bodyElem, 'ant-cascader-menus').flag ||

    getEventTargetNode($event, bodyElem, 'ant-calendar-picker-container').flag ||

    getEventTargetNode($event, bodyElem, 'ant-time-picker-panel').flag
  ) {
    return false;
  }
}

export const VXETablePluginAntd = {
  install(vxetablecore: VXETableCore) {
    const { interceptor, renderer } = vxetablecore;

    renderer.mixin({
      AAutoComplete,
      AInput,
      AInputNumber,
      ASelect,
      ACascader,
      ADatePicker,
      AMonthPicker,
      ARangePicker,
      AWeekPicker,
      ATimePicker,
      ATreeSelect,
      ARate,
      ASwitch,
      ARadioGroup,
      ACheckboxGroup,
      AButton,
      AButtonGroup,
      AApiSelect,
      AEmpty,
      AInputSearch,
      AYearPicker,
    });

    interceptor.add('event.clearFilter', handleClearEvent);
    interceptor.add('event.clearActived', handleClearEvent);
    interceptor.add('event.clearAreas', handleClearEvent);
  },
};

if (typeof window !== 'undefined' && window.VXETable && window.VXETable.use) {
  window.VXETable.use(VXETablePluginAntd);
}

export default VXETablePluginAntd;
