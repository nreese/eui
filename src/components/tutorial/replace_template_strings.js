import Mustache from 'mustache';

const TEMPLATE_TAGS = ['{', '}'];

export function replaceTemplateStrings(text, configValues, paramsValues = {}) {
  const variables = {
    config: configValues,
    params: params
  };
  Mustache.parse(text, TEMPLATE_TAGS);
  return Mustache.render(text, variables);
}
