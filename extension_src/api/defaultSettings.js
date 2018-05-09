const bannerTypes = [
  {
    type: 'bar',
    position: ['top', 'bottom', 'right', 'left'],
  },
  {
    type: 'macaron',
    position: ['top right', 'top left', 'bottom right', 'bottom left'],
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
    color: '#fff',
  },
};

const predefinedRules = [
  {
    id: 'b9f368db-2b11-4de5-9a9f-7914a11bfd98',
    enabled: true,
    name: 'nom1',
    pattern: 'pattern1',
    methods: ['GET'],
    banner: {
      label: '',
      type: 'macaron',
      position: 'top right',
      color: '#194d33',
    },
  },
  {
    id: '0c01832c-eb7e-48fe-834f-0ddc50d11486',
    enabled: false,
    name: 'nom444441',
    pattern: 'pattern1444444444',
    methods: ['POST'],
    banner: {
      label: '',
      type: 'macaron',
      position: 'top right',
      color: '#194d33',
    },
  },
  {
    id: 'f101832c-eb7e-48fe-834f-0ddc50d11432',
    enabled: true,
    name: 'Shrt',
    pattern: 'https?:\\/\\/(www\\.)?example.com\\/.*',
    methods: ['POST'],
    banner: {
      label: 'ProdSaver - predefined banner',
      type: 'bar',
      position: 'top',
      color: '#ff7524',
    },
  },
];

const defaultSettings = {
  langsAvailable: ['fr_FR', 'en_US', 'pt_BR'],
  langChosen: 'en_US',
  bannerTypes,
  defaultRule,
  rules: predefinedRules,
};

export default defaultSettings;
