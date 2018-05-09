import Vue from 'vue';
import Vuex from 'vuex';
import uuidv4 from 'uuid/v4';

Vue.use(Vuex);

const ruleIndex = function(state, id) {
  return state.rules.findIndex(el => {
    return el.id === id;
  });
};

export default new Vuex.Store({
  state: {
    rules: [
      {
        id: 'b9f368db-2b11-4de5-9a9f-7914a11bfd98',
        enabled: true,
        name: 'nom1',
        pattern: 'pattern1',
        methods: ['GET'],
        banner: {
          name: 'Banner',
          type: 'macaron',
          position: 'top right',
          color: '#FF0000',
        },
      },
      {
        id: '0c01832c-eb7e-48fe-834f-0ddc50d11486',
        enabled: false,
        name: 'nom444441',
        pattern: 'pattern1444444444',
        methods: ['POST'],
        banner: {
          name: 'Banner',
          type: 'macaron',
          position: 'top right',
          color: '#FF0000',
        },
      },
    ],
    settings: {
      langsAvailable: ['fr_FR', 'en_US', 'pt_BR'],
      langChosen: 'en_US',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      defaultRule: {
        enabled: true,
        name: '',
        pattern: '',
        methods: ['POST', 'PUT', 'DELETE', 'PATCH'],
        banner: {
          name: 'Banner',
          type: 'macaron',
          position: 'top right',
          color: '#FF0000',
        },
      },
    },
    banner: [
      {
        type: 'bar',
        position: ['top', 'bottom', 'right', 'left'],
      },
      {
        type: 'macaron',
        position: ['top right', 'top left', 'bottom right', 'bottom left'],
      },
    ],
  },
  mutations: {
    UPDATE_LANGUAGE(state, lang) {
      state.settings.langChosen = lang;
    },
    TOGGLE_RULE(state, id) {
      state.rules[ruleIndex(state, id)].enabled = !state.rules[
        ruleIndex(state, id)
      ].enabled;
    },
    REMOVE_RULE(state, id) {
      state.rules.splice(ruleIndex(state, id), 1);
    },
    UPDATE_RULE(state, rule) {
      const index = ruleIndex(state, rule.id);
      if (index === -1) state.rules.push(rule);
      else state.rules[ruleIndex(state, rule.id)] = rule;
    },
    CREATE_RULE(state, rule) {
      state.rules.push(rule);
    },
  },
  actions: {
    changeLanguage(context, lang) {
      context.commit('UPDATE_LANGUAGE', lang);
    },
    toggleRule(context, id) {
      context.commit('TOGGLE_RULE', id);
      this.dispatch('updateBackend', id);
    },
    removeRule(context, id) {
      context.commit('REMOVE_RULE', id);
      this.dispatch('updateBackend', id);
    },
    saveRule(context, rule) {
      context.commit('UPDATE_RULE', rule);
      this.dispatch('updateBackend', rule.id);
    },
    updateBackend(context, id) {
      return id; // to not create error on serve run TO remove later
    },
  },
  getters: {
    langChosen: state => {
      return state.settings.langChosen;
    },
    langsAvailable: state => {
      return state.settings.langsAvailable;
    },
    rule: state => {
      return id => {
        const index = ruleIndex(state, id);
        if (index === -1)
          return {
            ...state.settings.defaultRule,
            id: uuidv4(),
            new: true,
            banner: { ...state.settings.defaultRule.banner },
          };
        else return state.rules[index];
      };
    },
    rulesLength: state => {
      return state.rules.length;
    },
    banner: state => {
      return state.banner;
    },
    methodsList: state => {
      return state.settings.methods;
    },
  },
});
