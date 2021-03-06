import 'core-js';

const runCheck = ({ rtype, onError, options }) => {
  return (...args) => {
    if (!rtype(...args) && typeof onError === 'function') {
      onError({ args, options });
    }
  };
};

const buildCheck = ({ shouldCheck, rtype, onError, options }) => {
  return shouldCheck ?
    typeof rtype === 'function' ?
      runCheck({ rtype, onError, options }) :
      null :
    null;
};

const rfx = (options = {}) => {
  const { type, onError } = options;

  const shouldCheck = process &&
    process.env.NODE_ENV !== 'production';

  const check = buildCheck({ shouldCheck, rtype: type, onError, options });

  return Object.assign(function fx (...args) {
    const { fn } = options;
    if (typeof check === 'function') check(...args);
    return fn(...args);
  }, options.fn);
};

export default rfx;
