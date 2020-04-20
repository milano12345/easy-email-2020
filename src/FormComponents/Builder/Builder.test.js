import React from 'react';
import { Builder } from './Builder';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';
import '@testing-library/jest-dom/extend-expect';
import { DefaultTemplate } from '../../Templates/DefaultTemplate';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("Builder", () => {
  const store = createStore(rootReducer);
  let utils;

  beforeEach(() => {
    utils = render(
      <Provider store={store}>
        <Router>
          <Builder menus={DefaultTemplate} />
        </Router>
      </Provider>
    );
  })

  it("should render the correct menu items", () => {
    const { getByText, debug } = utils;

    const headerMenu = getByText("Header");
    const imageMenu = getByText("Main Image");
    const taglineMenu = getByText("Image Tagline");
    const contentMenu = getByText("Main Content");
    const footerMenu = getByText("Footer");

    expect(headerMenu).toBeInTheDocument();
    expect(imageMenu).toBeInTheDocument();
    expect(taglineMenu).toBeInTheDocument();
    expect(contentMenu).toBeInTheDocument();
    expect(footerMenu).toBeInTheDocument();
  })
});
