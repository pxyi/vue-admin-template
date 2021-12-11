export type TMenuType = 'undo' |
  'title' |
  'fontFamily' |
  'fontSize' |
  'foreColor' |
  'backColor' |
  'lineHeight' |
  'orderedList' |
  'unorderedList' |
  'bold' |
  'italic' |
  'underline' |
  'strikethrough' |
  'textAlign' |
  'superscript' |
  'subscript' |
  'link' |
  'table' |
  'image' |
  'indent' |
  'outdent' |
  'text-indent';


interface IMenu {
  icon: string;
  desc: string;
  dropdown?: () => Promise<any>
}
export const toolbarList: { [key in TMenuType]: IMenu } = {
  'undo': {
    icon: 'chexiao',
    desc: '撤销'
  },
  'fontFamily': {
    icon: 'text',
    desc: '字体',
    dropdown: () => import('@/components/editor/toolbar/font-family.vue')
  },
  'title': {
    icon: 'heading',
    desc: '标题',
    dropdown: () => import('@/components/editor/toolbar/title.vue')
  },
  'fontSize': {
    icon: 'font-size',
    desc: '字号',
    dropdown: () => import('@/components/editor/toolbar/font-size.vue')
  },
  'foreColor': {
    icon: 'font-color',
    desc: '文字颜色',
    dropdown: () => import('@/components/editor/toolbar/color.vue')
  },
  'backColor': {
    icon: 'background-color',
    desc: '背景色',
    dropdown: () => import('@/components/editor/toolbar/color.vue')
  },
  'lineHeight': {
    icon: 'line-height',
    desc: '行高',
    dropdown: () => import('@/components/editor/toolbar/line-height.vue')
  },
  'bold': {
    icon: 'bold',
    desc: '加粗'
  },
  'italic': {
    icon: 'italic',
    desc: '斜体'
  },
  'underline': {
    icon: 'underline',
    desc: '下划线'
  },
  'strikethrough': {
    icon: 'strikethrough',
    desc: '删除线'
  },
  'orderedList': {
    icon: 'list-ordered',
    desc: '有序列表'
  },
  'unorderedList': {
    icon: 'list-unordered',
    desc: '无序列表'
  },
  'indent': {
    icon: 'indent-increase',
    desc: '增加缩进'
  },
  'outdent': {
    icon: 'indent-decrease',
    desc: '减少缩进'
  },
  'text-indent': {
    icon: 'shouhangsuojin',
    desc: '首行缩进'
  },
  'textAlign': {
    icon: 'align-left',
    desc: '对齐方式',
    dropdown: () => import('@/components/editor/toolbar/text-align.vue')
  },
  'superscript': {
    icon: 'superscript',
    desc: '上标'
  },
  'subscript': {
    icon: 'subscript',
    desc: '下标'
  },
  'link': {
    icon: 'link',
    desc: '链接',
    dropdown: () => import('@/components/editor/toolbar/link.vue')
  },
  'table': {
    icon: 'table',
    desc: '表格',
    dropdown: () => import('@/components/editor/toolbar/table.vue')
  },
  'image': {
    icon: 'image',
    desc: '上传图片'
  }
}

export const toolbarDefault = [['undo'], ['fontFamily', 'fontSize', 'foreColor', 'backColor'], ['bold', 'italic', 'underline', 'strikethrough'], ['orderedList', 'unorderedList'], ['lineHeight', 'superscript', 'subscript'], 'indent', 'outdent', 'text-indent', 'textAlign', ['table', 'image']]