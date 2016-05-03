/**
 * Traduction model events
 */

'use strict';

import {EventEmitter} from 'events';
import Traduction from './traduction.model';
var TraductionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TraductionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Traduction.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TraductionEvents.emit(event + ':' + doc._id, doc);
    TraductionEvents.emit(event, doc);
  }
}

export default TraductionEvents;
