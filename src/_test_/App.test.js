import React from 'react';
import App from '../App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const enzymeWrapper = shallow(<App />);

describe('<App />', () => {
  test('should render sucessfully', () => {
    expect(enzymeWrapper).toBeDefined();
  });
});
