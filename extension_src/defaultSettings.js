const predefinedRules = [
  {
    id: 'f101832c-eb7e-48fe-834f-0ddc50d11432',
    enabled: true,
    name: 'Example rule',
    pattern: 'https?:\\/\\/(www\\.)?example.com\\/.*',
    methods: ['POST'],
    banner: {
      label: 'ProdSaver',
      type: 'bar',
      position: 'top',
      color: '#9B24FF',
    },
  },
];

const defaultSettings = {
  langChosen: 'en_US',
  rules: predefinedRules,
};

export default defaultSettings;
