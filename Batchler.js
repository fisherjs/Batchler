/* Batchler.js, (c) 2015, Michael Fisher, v. 0.0.0 */
if(!this['console']) {
  this['console'] = function (message) {};
}
var Batchler = {};
Batchler.Request = function () {
  /* Execute function. This function is called by the request's executer. The success and fail callbacks should include a call to the executer's callback function. */
  this.execute = null;
  return this;
};
Batchler.Requests = {};
/* Executes requests synchronously. */
Batchler.Requests.SyncExecuter = function () {
  var queue = [];
  var queueIndex = 0;
  var running = false;
  this.percentComplete = Math.round(((queueIndex / queue.length) * 100));
  this.add = function (request) {
    queue.push(request);
    console.log('Synchronous request added.')
  };
  this.callback = function (result) {
    if (result) {
      console.log(result);
    }
	if (queueIndex == queue.length) {
      this.complete();
    }
	if (queueIndex < queue.length) {
      queue[queueIndex].execute();
      queueIndex += 1;
    }
  };
  this.run = function () {
    if (running === false) {
      running = true;
	  console.log('Sync executer running.');
      this.callback();
    }
  };
  this.complete = function () {
    console.log('Sync executer requests complete.')
  };
  return this;
};
/* Executes requests asynchronously. */
Batchler.Requests.AsyncExecuter = function () {
  var queue = [];
  var completed = 0;
  var running = false;
  this.add = function (request) {
    console.log('Asynchronous request added.');
    queue.push(request);
  };
  this.callback = function (result) {
	if (result) {
      console.log(result);
    }
	if (completed == queue.length) {
      this.complete();
    }
    if (completed < queue.length) {
      completed++;
    }
  };
  this.run = function () {
    if (running === false) {
      running = true;
      for (var ii in queue) {
        queue[ii].execute();
      }
      console.log('Async executer running.')
    }
  };
  this.complete = function () {
    console.log('Async executer requests complete.')
  };
  return this;
};
