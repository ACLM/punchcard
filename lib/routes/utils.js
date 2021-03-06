'use strict';

const _ = require('lodash');

/**
 * Add identifier to each piece of content in an array of rows.
 * @param  {array} rows array of rows of content as they are saved in the db
 * @param  {object} type content type configuration post-merging with input-plugins
 *
 * @returns {array} rows with identifier added for each row
 */
const identifier = (rows, type) => {
  const attr = _.find(type.attributes, { 'id': type.identifier });
  const input = Object.keys(attr.inputs)[0];

  return rows.map(rw => {
    const row = rw;
    const value = _.get(row, `value[${type.identifier}][${input}].value`, '');

    if (value !== '') {
      row.identifier = value;
    }
    else {
      row.identifier = `Revision: ${row.revision}`;
    }

    return row;
  });
};

module.exports = {
  identifier,
};
