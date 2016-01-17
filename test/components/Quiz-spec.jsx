import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { List, Map } from 'immutable';
import { expect } from 'chai';

import Quiz from '../../src/components/Quizzes/Quiz';

// const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = ReactTestUtils;

const testNames = ["wayne-rooney", "daniel-sturridge", "luitzen-brouwer", "andrew wiles"];

describe('quiz logic', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Quiz names={testNames} type="text" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('wayne-rooney');
    expect(buttons[1].textContent).to.equal('daniel-sturridge');
  });

});
