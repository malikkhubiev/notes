import React from 'react';
import {ModalMessage} from './ModalMessage';
import { render } from '@testing-library/react';
import { ModalMessagePropsType } from '../../../App/App.types';
import { observable } from 'mobx';

describe('Modal component', () => {
  const initialMessage = 'Initial Message';
  let modalProps: ModalMessagePropsType;
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
    const { getByText } = render(<ModalMessage {...modalProps} />);
    const messageElement = getByText(initialMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('updates modal message when MobX state changes', () => {
    const newMessage = 'New Message';
    messageObservable.message = newMessage;
    modalProps = {
      modalMessage: messageObservable.message
    };
    const { getByText } = render(<ModalMessage {...modalProps} />);
    const messageElement = getByText(newMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('re-renders modal when MobX state changes', () => {
    const newMessage = 'New Message';
    messageObservable.message = newMessage;
    modalProps = {
      modalMessage: messageObservable.message
    };
    const { getByText, rerender } = render(<ModalMessage {...modalProps} />);
    rerender(<ModalMessage {...modalProps} />);
    const messageElement = getByText(newMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
