import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tutorialPropType from './tutorial_prop_type';
import { Introduction } from './introduction';

const INSTRUCTIONS_TYPE = {
  ELASTIC_CLOUD: 'elasticCloud',
  ON_PREM: 'onPrem',
  ON_PREM_ELASTIC_CLOUD: 'onPremElasticCloud'
};

export class EuiTutorial extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    description: PropTypes.string.isRequired,
    previewUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      paramValues: {},
      visibleInstructions: INSTRUCTIONS_TYPE.ON_PREM
    };
  }

  getInstructions = () => {
    switch(this.state.visibleInstructions) {
      case INSTRUCTIONS_TYPE.ELASTIC_CLOUD:
        return this.props.tutorial.elasticCloud;
      case INSTRUCTIONS_TYPE.ON_PREM:
        return this.props.tutorial.onPrem;
      case INSTRUCTIONS_TYPE.ON_PREM_ELASTIC_CLOUD:
        return this.props.tutorial.onPremElasticCloud;
      default:
        throw new Error(`Unhandled instruction type ${this.state.visibleInstructions}`);
    }
  }

  setParamDefaults = () => {
    const instructions = this.getInstructions();
    const paramValues = {};
    if (instructions.params) {
      instructions.params.forEach((param => {
        paramValues[param.id] = param.defaultValue;
      }));
    }
    this.setState({
      paramValues: paramValues
    });
  }

  setVisibleInstructions = (instructionsType) => {
    this.setState({
      visibleInstructions: instructionsType
    }, this.setParamDefaults);
  }

  setParameter = (paramId, newValue) => {
    this.setState(previousState => {
      const paramValues = _.cloneDeep(previousState.paramValues);
      paramValues[paramId] = newValue;
      return { paramValues: paramValues };
    });
  }

  onPrem = () => {
    this.setVisibleInstructions(INSTRUCTIONS_TYPE.ON_PREM);
  }

  onPremElasticCloud = () => {
    this.setVisibleInstructions(INSTRUCTIONS_TYPE.ON_PREM_ELASTIC_CLOUD);
  }

  renderInstructionSets = (instructions) => {
    let offset = 1;
    return instructions.instructionSets.map((instructionSet, index) => {
      const currentOffset = offset;
      offset += instructionSet.instructionVariants[0].instructions.length;
      return (
        <InstructionSet
          title={instructionSet.title}
          instructionVariants={instructionSet.instructionVariants}
          offset={currentOffset}
          paramValues={this.state.paramValues}
          key={index}
        />
      );
    });
  }

  render() {
    const {
      children,
      className,
      description,
      previewUrl,
      title,
      ...rest,
    } = this.props;

    const classes = classNames(
      'euiTutorial',
      className
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        <Introduction
          description={description}
          previewUrl={previewUrl}
          title={title}
        />
      </div>
    );
  }
}
