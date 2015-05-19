/* Batchler.js, (c) 2015, Michael Fisher, v. 0.0.0.x */
if(!this['console']) {
  this['console'] = function (message) {};
}
var Batchler = {};
Batchler.Operation = function (execute, success, fail) {
  /* Execute function. This function is called by the operation's handler. The success and fail callbacks should include a call to the handler's callback function. */
  this.execute = execute;
  return this;
};
Batchler.Operations = {};
/* Handles operations synchronously. */
Batchler.Operations.SyncHandler = function () {
  var queue = [];
  var queueIndex = 0;
  var running = false;
  this.percentComplete = Math.round(((queueIndex / queue.length) * 100));
  this.add = function (operation) {
    q.push(operation);
    console.log('Synchronous operation added.')
  };
  this.callback = function (result) {
    if (queueIndex < queue.length) {
      queue[queueIndex].execute();
      queueIndex += 1;
      if (queueIndex == queue.length) {
        this.complete();
      }
      if (result) {
        console.log(result);
      }
    }
  };
  this.run = function () {
    if (running === false) {
      running = true;
      this.callback();
      console.log('Sync handler running.');
    }
  };
  this.complete = function () {
    console.log('Sync handler operations complete.')
  };
  return this;
};
/* Handles operations asynchronously. */
Batchler.Operations.AsyncHandler = function () {
  var queue = [];
  var completed = 0;
  var running = false;
  this.add = function (operation) {
    console.log('Asynchronous operation added.');
    queue.push(operation);
  };
  this.callback = function (result) {
    if (completed < queue.length) {
      completed++;
      if (completed == queue.length) {
        this.complete();
      }
      if (result) {
        console.log(result);
      }
    }
  };
  this.run = function () {
    if (running === false) {
      running = true;
      for (var ii in queue) {
        queue[ii].execute();
      }
      console.log('Async handler running.')
    }
  };
  this.complete = function () {
    console.log('Async handler operations complete.')
  };
  return this;
};
