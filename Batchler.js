/* Batchler.js, (c) 2015, Michael Fisher, v. 1.0.0 */
/* If the browser is an old browser like IE-9 and does not support console logging then this will prevent js errors */
if(!this['console']) {
  this['console'] = function (message) {};
}
/* Create the Batchler object */
var Batchler = Batchler || {};
/* This is a sample request object. */
Batchler.Request = function () {
  /* A request object must contain an execute method that the request executer will call. Optionally, you may call this function manually as well.  */
  this.execute = function(executer) {
    /* This is where your request code should go. */
    function success() {
      /* This is where your success code should go. */
      if(executer) {
        /* If you are using a request executer then that executer's callback function will be executed and log Success to the console. */
        executer.callback('Success');
      }
    }
    function fail() {
      /* This is where your fail code should go. */
      if(executer) {
        /* If you are using a request executer then that executer's callback function will be executed and log Fail to the console. */
        executer.callback('Fail');
      }
    }
  };
  /* Return your request object. */
  return this;
};
/* The Batchler.Requests object is intended to house your request objects. */
Batchler.Requests = {};
/* Executes requests synchronously. */
Batchler.SyncExecuter = function () {
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
      running = false;
      this.complete();
    }
    if (queueIndex < queue.length) {
      queue[queueIndex].execute(this);
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
Batchler.AsyncExecuter = function () {
  var queue = [];
  var completed = 0;
  var running = false;
  this.percentComplete = Math.round(((completed / queue.length) * 100));
  this.add = function (request) {
    console.log('Asynchronous request added.');
    queue.push(request);
  };
  this.callback = function (result) {
    if (result) {
      console.log(result);
    }
    if (completed == queue.length) {
      running = false;
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
        queue[ii].execute(this);
      }
      console.log('Async executer running.')
    }
  };
  this.complete = function () {
    console.log('Async executer requests complete.')
  };
  return this;
};
