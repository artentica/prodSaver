const bannerTypes = [
  {
    type: 'bar',
    positionsAvailable: ['top', 'bottom', 'right', 'left'],
  },
  {
    type: 'macaron',
    positionsAvailable: [
      'top right',
      'top left',
      'bottom right',
      'bottom left',
    ],
  },
];

const defaultRule = {
  enabled: true,
  name: '',
  pattern: '',
  methods: ['POST', 'PUT', 'DELETE', 'PATCH'],
  banner: {
    label: '',
    type: 'macaron',
    position: 'top right',
    color: '#932FE8',
  },
};

const config = {
  langsAvailable: ['fr_FR', 'en_US', 'pt_BR'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  bannerTypes,
  defaultRule,
};

export default config;
