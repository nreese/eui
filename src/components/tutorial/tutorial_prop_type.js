import PropTypes from 'prop-types';

const instructionPropType = PropTypes.shape({
  title: PropTypes.string,
  textPre: PropTypes.string,
  commands: PropTypes.arrayOf(PropTypes.string),
  textPost: PropTypes.string
});

const instructionVariantPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  instructions: PropTypes.arrayOf(instructionPropType).isRequired
});

const instructionSetPropType = PropTypes.shape({
  title: PropTypes.string,
  instructionVariants: PropTypes.arrayOf(instructionVariantPropType).isRequired
});

const paramPropType = PropTypes.shape({
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

const instructionsPropType = PropTypes.shape({
  instructionSets: PropTypes.arrayOf(instructionSetPropType).isRequired,
  params: PropTypes.arrayOf(paramPropType)
});

export const tutorialPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  iconPath: PropTypes.string,
  longDescription: PropTypes.string.isRequired,
  completionTimeMinutes: PropTypes.number,
  previewImagePath: PropTypes.string,

  // kibana and elastic cluster running on prem
  onPrem: instructionsPropType.isRequired,

  // kibana and elastic cluster running in elastic's cloud
  elasticCloud: instructionsPropType.isRequired,

  // kibana running on prem and elastic cluster running in elastic's cloud
  onPremElasticCloud: instructionsPropType.isRequired
});
