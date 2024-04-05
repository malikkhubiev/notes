import React from 'react';
import {Modal} from './Modal';
import { render } from '@testing-library/react';
import { ModalPropsType } from '../../../App/App.types';
import { observable } from 'mobx';

describe('Modal component', () => {
  const initialMessage = 'Initial Message';
  let modalProps: ModalPropsType;
  let messageObservable: { message: string };

  beforeEach(() => {
    messageObservable = observable({
      message: initialMessage
    });
    
    modalProps = {
      modalMessage: messageObservable.message
    };
  });

  it('renders modal with initial message', () => {
    const { getByText } = render(<Modal {...modalProps} />);
    const messageElement = getByText(initialMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('updates modal message when MobX state changes', () => {
    const newMessage = 'New Message';
    messageObservable.message = newMessage;
    modalProps = {
      modalMessage: messageObservable.message
    };
    const { getByText } = render(<Modal {...modalProps} />);
    const messageElement = getByText(newMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('re-renders modal when MobX state changes', () => {
    const newMessage = 'New Message';
    messageObservable.message = newMessage;
    modalProps = {
      modalMessage: messageObservable.message
    };
    const { getByText, rerender } = render(<Modal {...modalProps} />);
    rerender(<Modal {...modalProps} />);
    const messageElement = getByText(newMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
