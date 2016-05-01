/**
 * Prono model events
 */

'use strict';

import {EventEmitter} from 'events';
import Prono from './prono.model';
var PronoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PronoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Prono.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PronoEvents.emit(event + ':' + doc._id, doc);
    PronoEvents.emit(event, doc);
  }
}

export default PronoEvents;
