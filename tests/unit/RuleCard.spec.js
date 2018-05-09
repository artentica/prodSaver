import { shallow } from '@vue/test-utils';
import RuleForm from '@/components/RuleForm.vue';

describe('RuleForm.vue', () => {
  it('renders props.name when passed', () => {
    const obj = {
      id: 'b9f368db-2b11-4de5-9a9f-7914a11bfd98',
      name: 'nom1',
      pattern: 'pattern1',
      methods: ['GET'],
      enabled: true,
    };
    const wrapper = shallow(RuleForm, {
      propsData: obj,
    });
    expect(wrapper.text()).toMatch(obj.name);
  });
});
