import { App } from 'vue';
import AxForm from './form/index.vue';
import AxEmpty from './empty/index.vue';
import AxButton from './button/index.vue';
import AxTable from './table/index.vue';
import AxUpload from './upload/index.vue';
import AxEditor from './editor/index.vue'
import AxEditorItem from './editor/item.vue';
import AxEditorToolbar from './editor/toolbar.vue';
import * as ElementIcon from '@element-plus/icons';

export const components = Object.assign({
  AxForm,
  AxEmpty,
  AxButton,
  AxTable,
  AxUpload,
  AxEditor,
  AxEditorItem,
  AxEditorToolbar
}, ElementIcon);

const install = (Vue: App) => {
  Object.keys(components).map(key => Vue.component(components[key].name, components[key]));
};

export default {
  version: '0.0.1',
  install,
  ...components
}
