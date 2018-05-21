import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiFormControlLayout } from '../../form';
import { EuiComboBoxPill } from './combo_box_pill';
import { htmlIdGenerator } from '../../../services';

const makeId = htmlIdGenerator();

export class EuiComboBoxInput extends Component {
  static propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    selectedOptions: PropTypes.array,
    onRemoveOption: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    searchValue: PropTypes.string,
    autoSizeInputRef: PropTypes.func,
    inputRef: PropTypes.func,
    updatePosition: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    hasSelectedOptions: PropTypes.bool.isRequired,
    isListOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    singleSelection: PropTypes.bool,
    isDisabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
    };
  }

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition();
    });
  };

  onFocus = () => {
    this.props.onFocus();
    this.setState({
      hasFocus: true,
    });
  };

  onBlur = () => {
    this.setState({
      hasFocus: false,
    });
  };

  // TODO: React 16.3 - componentDidUpdate
  componentWillUpdate(nextProps) {
    const { searchValue } = nextProps;

    // We need to update the position of everything if the user enters enough input to change
    // the size of the input.
    if (searchValue !== this.props.searchValue) {
      this.updatePosition();
    }
  }

  render() {
    const {
      id,
      placeholder,
      selectedOptions,
      onRemoveOption,
      onClick,
      onChange,
      value,
      searchValue,
      autoSizeInputRef,
      inputRef,
      onClear,
      hasSelectedOptions,
      isListOpen,
      onOpen,
      onClose,
      singleSelection,
      isDisabled,
    } = this.props;

    const pills = selectedOptions.map((option) => {
      const {
        label,
        color,
        ...rest
      } = option;

      return (
        <EuiComboBoxPill
          option={option}
          onClose={(isDisabled || singleSelection) ? null : onRemoveOption}
          key={label.toLowerCase()}
          color={color}
          {...rest}
        >
          {label}
        </EuiComboBoxPill>
      )
    });

    let removeOptionMessage;
    let removeOptionMessageId;

    if (this.state.hasFocus) {
      const removeOptionMessageContent =
        `Combo box. Selected. ` +
        (searchValue ? `${searchValue}. Selected. ` : '') +
        (selectedOptions.length ? `${value}. Unselected. Press Backspace to delete ${selectedOptions[selectedOptions.length - 1].label}. ` : '') +
        `You are currently on a combo box. Type text or, to display a list of choices, press Down Arrow. ` +
        `To exit the list of choices, press Escape.`;

      removeOptionMessageId = makeId();

      // aria-live="assertive" will read this message aloud immediately once it enters the DOM.
      // We'll render to the DOM when the input gains focus and remove it when the input loses focus.
      // We'll use aria-hidden to prevent default aria information from being read by the screen
      // reader.
      removeOptionMessage = (
        <EuiScreenReaderOnly>
          <span aria-live="assertive" id={removeOptionMessageId}>
            {removeOptionMessageContent}
          </span>
        </EuiScreenReaderOnly>
      );
    }

    let placeholderMessage;

    if (placeholder && !selectedOptions.length && !searchValue) {
      placeholderMessage = (
        <p className="euiComboBoxPlaceholder">{placeholder}</p>
      );
    }

    const clickProps = {};

    if (!isDisabled) {
      clickProps.onClear = hasSelectedOptions ? onClear : undefined;
      clickProps.onIconClick = isListOpen ? onClose : onOpen;
    }

    return (
      <EuiFormControlLayout
        icon="arrowDown"
        iconSide="right"
        onFocus={this.onFocus}
        {...clickProps}
      >
        <div
          className="euiComboBox__inputWrap"
          onClick={onClick}
          data-test-subj="comboBoxInput"
        >
          {pills}
          {placeholderMessage}
          <AutosizeInput
            aria-hidden
            id={id}
            style={{ fontSize: 14 }}
            className="euiComboBox__input"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={(e) => onChange(e.target.value)}
            value={searchValue}
            ref={autoSizeInputRef}
            inputRef={inputRef}
            disabled={isDisabled}
          />
          {removeOptionMessage}
        </div>
      </EuiFormControlLayout>
    );
  }
}
