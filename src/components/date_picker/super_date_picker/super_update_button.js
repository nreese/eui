import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { EuiButton } from '../../button';
import { EuiToolTip } from '../../tool_tip';

export class EuiSuperUpdateButton extends Component {
  static propTypes = {
    isRefresh: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    /**
     * Passes props to `EuiToolTip`
     */
    toolTipProps: PropTypes.object,
  }

  static defaultProps = {
    isRefresh: false,
    isLoading: false,
    isDisabled: false,
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (this.props.isRefresh && !this.props.isDisabled && !this.props.isLoading) {
      this.showTooltip();
      this.tooltipTimeout = setTimeout(() => {
        this.hideTooltip();
      }, 2000);
    }
  }

  setTootipRef = node => (this.tooltip = node);

  showTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.showToolTip();
  }

  hideTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.hideToolTip();
  }

  render() {
    const {
      isRefresh,
      isLoading,
      isDisabled,
      onClick,
      ...rest
    } = this.props;

    let buttonText = 'Refresh';
    if (isRefresh || isLoading) {
      buttonText = isLoading ? 'Updating' : 'Update';
    }

    let tooltipContent;
    if (isDisabled) {
      tooltipContent = 'Cannot update';
    } else if (isRefresh && !isLoading) {
      tooltipContent = 'Click to apply';
    }

    return (
      <EuiToolTip
        ref={this.setTootipRef}
        content={tooltipContent}
        position="bottom"
      >
        <EuiButton
          className="euiSuperDatePicker__updateButton"
          color={isRefresh || isLoading ? 'secondary' : 'primary'}
          fill
          iconType={isRefresh || isLoading ? 'kqlFunction' : 'refresh'}
          textProps={{ className: 'euiSuperDatePicker__updateButtonText' }}
          isDisabled={isDisabled}
          onClick={onClick}
          isLoading={isLoading}
          {...rest}
        >
          {buttonText}
        </EuiButton>
      </EuiToolTip>
    );
  }
}
