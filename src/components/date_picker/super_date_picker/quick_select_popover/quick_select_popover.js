
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { commonlyUsedRangeShape, recentlyUsedRangeShape } from '../types';

import {
  EuiButtonEmpty,
} from '../../../button';

import {
  EuiIcon,
} from '../../../icon';

import {
  EuiPopover,
} from '../../../popover';

import { QuickSelect } from './quick_select';
import { CommonlyUsed } from './commonly_used';
import { RecentlyUsed } from './recently_used';

export class QuickSelectPopover extends Component {

  state = {
    isOpen: false,
  }

  closePopover = () => {
    this.setState({ isOpen: false });
  }

  togglePopover = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  applyTime = ({ from, to }) => {
    this.props.applyTime({
      from,
      to,
    });
    this.closePopover();
  }

  render() {
    const quickSelectButton = (
      <EuiButtonEmpty
        className="euiFormControlLayout__prepend euiSuperDatePicker__quickSelectButton"
        textProps={{ className: 'euiSuperDatePicker__quickSelectButtonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
      >
        <EuiIcon type={this.props.isPaused ? 'calendar' : 'clock'} />
      </EuiButtonEmpty>
    );

    return (
      <EuiPopover
        id="QuickSelectPopover"
        button={quickSelectButton}
        isOpen={this.state.isOpen}
        closePopover={this.closePopover}
        anchorPosition="downLeft"
        ownFocus
      >
        <div style={{ width: 400, maxWidth: '100%' }}>
          <QuickSelect
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
          />
          <CommonlyUsed
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
          />
          <RecentlyUsed
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
            dateFormat={this.props.dateFormat}
            recentlyUsedRanges={this.props.recentlyUsedRanges}
          />
        </div>
      </EuiPopover>
    );
  }
}

QuickSelectPopover.propTypes = {
  applyTime: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  refreshInterval: PropTypes.number,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
  dateFormat: PropTypes.string.isRequired,
  recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape).isRequired,
};
