import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import api from '../extension_src/api';
import config from '../extension_src/config.js';
import defaultSettings from '../extension_src/defaultSettings.js';

Vue.use(Vuex);

const ruleIndex = function(state, id) {
  return state.settings.rules.findIndex(el => {
    return el.id === id;
  });
};

export default new Vuex.Store({
  state: {
    settings: defaultSettings,
    config,
    unsavedRuleDialog: {
      visible: false,
      callbacks: {},
    },
    currentPage: {},
  },
  mutations: {
    UPDATE_LANGUAGE(state, lang) {
      state.settings.langChosen = lang;
    },
    TOGGLE_RULE(state, id) {
      const rule = this.getters.rule(id);
      rule.enabled = !rule.enabled;
    },
    REMOVE_RULE(state, id) {
      state.settings.rules.splice(ruleIndex(state, id), 1);
    },
    PAGEINFO(state, pageInfo) {
      state.currentPage = pageInfo;
    },
    UPDATE_RULE(state, rule) {
      const index = ruleIndex(state, rule.id);
      if (index === -1) state.settings.rules.push(rule);
      else state.settings.rules[index] = rule;
    },
    CREATE_RULE(state, rule) {
      state.settings.rules.push(rule);
    },
    LOAD_SETTINGS(state, settings) {
      state.settings = settings;
    },
    UPDATE_UNSAVED_DIALOG(state, data) {
      state.unsavedRuleDialog = data;
    },
    UPDATE_PENDING_MODIFICATIONS(state, data) {
      state.settings.pendingModifications = data;
    },
  },
  actions: {
    /*
     * Changes the language setting
     */
    changeLanguage(context, lang) {
      context.commit('UPDATE_LANGUAGE', lang);
      this.dispatch('updateBackend');
    },
    /*
     * Enables or disables the rule with the given ID
     */
    toggleRule(context, id) {
      context.commit('TOGGLE_RULE', id);
      this.dispatch('updateBackend');
    },
    /*
     * Removes the rule with the given ID
     */
    removeRule(context, id) {
      context.commit('REMOVE_RULE', id);
      this.dispatch('updateBackend');
    },
    /*
     * Saves the given rule
     */
    saveRule(context, rule) {
      context.commit('UPDATE_RULE', rule);
      this.dispatch('updateBackend');
    },
    /*
     * Returns current page info from the API
     */
    getCurrentPage: () => {
      return api.settings.getCurrentPage().then(pageInfo => {
        this.dispatch('PAGEINFO', pageInfo);
      });
    },
    /*
     * Sends the new state to the API
     */
    updateBackend(context) {
      api.settings.set(context.state.settings).then(() => {
        this.dispatch('loadSettings');
      });
    },
    /*
     * Loads the settings from the API
     * and applies them to the store
     */
    loadSettings(context, callback = null) {
      api.settings.get().then(res => {
        context.commit('LOAD_SETTINGS', res);
        if (callback !== null) {
          callback(res);
        }
      });
    },
    /*
     * Shows the unsaved rule dialog
     * and sets its callbacks (cancel and save)
     */
    showUnsavedRuleDialog(context, callbacks) {
      const data = {
        visible: true,
        callbacks,
      };
      context.commit('UPDATE_UNSAVED_DIALOG', data);
    },
    /*
     * Hides the unsaved rule dialog
     */
    hideUnsavedRuleDialog(context) {
      const data = {
        visible: false,
        callbacks: {},
      };
      context.commit('UPDATE_UNSAVED_DIALOG', data);
    },
    /*
     * Executes the "cancel" callbak of the unsaved rule dialog
     */
    discardUnsavedRule(context) {
      const callback = context.state.unsavedRuleDialog.callbacks.cancel;
      if (callback !== undefined) callback();
      context.dispatch('hideUnsavedRuleDialog');
    },
    /*
     * Executes the "save" callbak of the unsaved rule dialog
     */
    saveUnsavedRule(context) {
      const callback = context.state.unsavedRuleDialog.callbacks.save;
      if (callback !== undefined) callback();
      context.dispatch('hideUnsavedRuleDialog');
    },
    /*
     * Saves the given pending rule modifications
     */
    updatePendingModifications(context, data) {
      context.commit('UPDATE_PENDING_MODIFICATIONS', data);
      this.dispatch('updateBackend');
    },
  },
  getters: {
    /*
     * Returns the current settings
     */
    settings: state => {
      return state.settings;
    },
    /*
     * Returns the configuration
     */
    config: state => {
      return state.config;
    },
    /*
     * Returns the current language setting
     */
    langChosen: state => {
      return state.settings.langChosen;
    },
    /*
     * Returns all languages available
     */
    langsAvailable: state => {
      return state.config.langsAvailable;
    },
    /*
     * Returns the default rule
     */
    defaultRule: state => {
      return state.config.defaultRule;
    },
    /*
     * Returns all rules
     */
    rules: state => {
      return state.settings.rules;
    },
    /*
     * Returns a rule given its ID
     */
    rule: state => {
      return id => {
        const rule = state.settings.rules.find(r => r.id === id);
        if (_.isEmpty(rule)) {
          return {
            ..._.cloneDeep(state.config.defaultRule),
            id: uuidv4(),
            new: true,
          };
        } else return rule;
      };
    },
    /*
     * Returns the number of rules
     */
    rulesLength: state => {
      return state.settings.rules.length;
    },
    /*
     * Returns all banner types
     */
    bannerTypes: state => {
      return state.config.bannerTypes;
    },
    /*
     * Returns the banner with the given type
     */
    bannerType: state => {
      return type => {
        return state.config.bannerTypes.find(el => {
          return type == el.type;
        });
      };
    },
    /*
     * Returns all allowed methods
     */
    methodsList: state => {
      return state.config.methods;
    },
    /*
     * Returns the unsaved rule dialog's state
     */
    unsavedRuleDialog: state => {
      return state.unsavedRuleDialog;
    },
    /*
     * Returns pending rule modifications
     */
    pendingModifications: state => {
      return state.settings.pendingModifications;
    },
  },
});
