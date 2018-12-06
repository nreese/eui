import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import { EuiPopover } from '../../../popover';

import { formatTimeString } from '../pretty_duration';
import { DatePopoverContent } from './date_popover_content';

export class DatePopoverButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(['start', 'end']),
    isInvalid: PropTypes.bool,
    needsUpdating: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    dateFormat: PropTypes.string.isRequired,
    roundUp: PropTypes.bool,
  }

  state = {
    isOpen: false,
  }

  togglePopover = () => {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen };
    });
  }

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const {
      position,
      isInvalid,
      needsUpdating,
      value,
      buttonProps,
      roundUp,
      onChange,
      dateFormat,
      ...rest
    } = this.props;

    const classes = classNames([
      'euiSuperDatePicker__dateText',
      'euiSuperDatePicker__dateButton',
      `euiSuperDatePicker__dateButton--${position}`,
      {
        'euiSuperDatePicker__dateButton-isSelected': this.state.isOpen,
        'euiSuperDatePicker__dateButton-isInvalid': isInvalid,
        'euiSuperDatePicker__dateButton-needsUpdating': needsUpdating
      }
    ]);

    let title = value;
    if (isInvalid) {
      title = `Invalid date: ${title}`;
    } else if (needsUpdating) {
      title = `Update needed: ${title}`;
    }

    const button = (
      <button
        onClick={this.togglePopover}
        className={classes}
        title={title}
        data-test-subj={`superDatePicker${this.props.position}DatePopoverButton`}
        {...buttonProps}
      >
        {formatTimeString(value, dateFormat)}
      </button>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={this.state.isOpen}
        closePopover={this.closePopover}
        anchorPosition="downRight"
        panelPaddingSize="none"
        ownFocus
        {...rest}
      >
        <DatePopoverContent
          value={value}
          roundUp={roundUp}
          onChange={onChange}
          dateFormat={dateFormat}
        />
      </EuiPopover>
    );
  }
}
