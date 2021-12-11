interface IMenu {
  label: string;
  key: string;
  icon?: string;
  isLeaf?: boolean;
  children?: IMenu[]
}

export const RESEARCH_MENU: IMenu[] = [
  {
    label: 'Home',
    key: '/research/home',
    icon: 'home-filled',
    isLeaf: true
  },
  {
    label: 'Course',
    key: '/research/course',
    icon: 'reading',
    isLeaf: true
  },
  {
    label: 'Data Bank',
    key: '/research/databank',
    icon: 'location',
    children: [
      {
        label: 'Materia',
        key: '/research/databank/materia',
        isLeaf: true
      },
      {
        label: 'Vocabulary',
        key: '/research/databank/vocabulary',
        isLeaf: true
      },
      {
        label: 'Measures',
        key: '/research/databank/measures',
        isLeaf: true
      },
    ]
  },
]

export const TEACHING_MENU: IMenu[] = [
  {
    label: 'Home',
    key: '/teaching/home',
    icon: 'home-filled',
    isLeaf: true
  },
  {
    label: 'Course Theme',
    key: '/teaching/course',
    icon: 'reading',
    isLeaf: true
  },
  {
    label: 'Lesson Statistics',
    key: '/teaching/statistics',
    icon: 'reading',
    isLeaf: true
  },
  
]
