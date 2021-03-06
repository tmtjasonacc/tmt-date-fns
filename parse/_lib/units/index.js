'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/setUTCDay/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/setUTCISODay/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../../../_lib/setUTCISOWeek/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../../../_lib/setUTCISOWeekYear/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('../../../_lib/startOfUTCISOWeek/index.js');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('../../../_lib/startOfUTCISOWeekYear/index.js');

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;

function setTimeOfDay(hours, timeOfDay) {
  var isAM = timeOfDay === 0;

  if (isAM) {
    if (hours === 12) {
      return 0;
    }
  } else {
    if (hours !== 12) {
      return 12 + hours;
    }
  }

  return hours;
}

var units = {
  twoDigitYear: {
    priority: 10,
    set: function set(dateValues, value) {
      var century = Math.floor(dateValues.date.getUTCFullYear() / 100);
      var year = century * 100 + value;
      dateValues.date.setUTCFullYear(year, 0, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  year: {
    priority: 10,
    set: function set(dateValues, value) {
      dateValues.date.setUTCFullYear(value, 0, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  isoYear: {
    priority: 10,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index12.default)((0, _index8.default)(dateValues.date, value, options), options);
      return dateValues;
    }
  },

  quarter: {
    priority: 20,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMonth((value - 1) * 3, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  month: {
    priority: 30,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMonth(value, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  isoWeek: {
    priority: 40,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index10.default)((0, _index6.default)(dateValues.date, value, options), options);
      return dateValues;
    }
  },

  dayOfWeek: {
    priority: 50,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index2.default)(dateValues.date, value, options);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  dayOfISOWeek: {
    priority: 50,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index4.default)(dateValues.date, value, options);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  dayOfMonth: {
    priority: 50,
    set: function set(dateValues, value) {
      dateValues.date.setUTCDate(value);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  dayOfYear: {
    priority: 50,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMonth(0, value);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  timeOfDay: {
    priority: 60,
    set: function set(dateValues, value, options) {
      dateValues.timeOfDay = value;
      return dateValues;
    }
  },

  hours: {
    priority: 70,
    set: function set(dateValues, value, options) {
      dateValues.date.setUTCHours(value, 0, 0, 0);
      return dateValues;
    }
  },

  timeOfDayHours: {
    priority: 70,
    set: function set(dateValues, value, options) {
      var timeOfDay = dateValues.timeOfDay;
      if (timeOfDay != null) {
        value = setTimeOfDay(value, timeOfDay);
      }
      dateValues.date.setUTCHours(value, 0, 0, 0);
      return dateValues;
    }
  },

  minutes: {
    priority: 80,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMinutes(value, 0, 0);
      return dateValues;
    }
  },

  seconds: {
    priority: 90,
    set: function set(dateValues, value) {
      dateValues.date.setUTCSeconds(value, 0);
      return dateValues;
    }
  },

  milliseconds: {
    priority: 100,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMilliseconds(value);
      return dateValues;
    }
  },

  timezone: {
    priority: 110,
    set: function set(dateValues, value) {
      dateValues.date = new Date(dateValues.date.getTime() - value * MILLISECONDS_IN_MINUTE);
      return dateValues;
    }
  },

  timestamp: {
    priority: 120,
    set: function set(dateValues, value) {
      dateValues.date = new Date(value);
      return dateValues;
    }
  }
};

exports.default = units;
module.exports = exports['default'];