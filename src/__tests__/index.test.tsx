import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyButton } from '../index';

// https://testing-library.com/docs/react-testing-library/intro
describe('as children', () => {
  it('renders correct', () => {
    render(
      <div data-testid="content">
        <MyButton title="Hello World" />
      </div>,
    );
    const content = screen.getByTestId('content');
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // 测试元素内容
    const els = content.getElementsByClassName('title');
    expect(els.length).toBe(1);
    expect(els[0].textContent).toBe('Hello World');
  });
});
