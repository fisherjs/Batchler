# Batchler
Batchler.js is a tool I created to help me manage personal libraries of commonly used client-side functions. The tool allows me to group together sets of queries I need executed synchronously or asynchronously. I can then string these groupings together. For example:

Let's say I'm setting up an application to manage billable hour time logs. Let's look at the unordered list of tasks that might be involved:
<ul>
  <li>Create an application: Billables</li>
  <li>Create a table: Time Logs</li>
  <li>Add a date field to the Time Logs table: Date</li>
  <li>Add a number field to the Time Logs table: Hours</li>
  <li>Add a currency field to the Time Logs table: Rate</li>
  <li>Add a currency field to the Time Logs table: Total</li>
  <li>Add a note field to the Time Logs table: Summary of work</li>
</ul>

I have 7 tasks above. Some are dependent upon one another, and some are not. Let's look at how these might be grouped into an ordered list:
<ol>
  <li>Create an application: Billables</li>
  <li>Create a table: Time Logs</li>
  <li>Add fields to the Time Logs table:
    <ul>
      <li>Add a date field to the Time Logs table: Date</li>
      <li>Add a number field to the Time Logs table: Hours</li>
      <li>Add a currency field to the Time Logs table: Rate</li>
      <li>Add a currency field to the Time Logs table: Total</li>
      <li>Add a note field to the Time Logs table: Summary of work</li>
    </ul>
  </li>
</ol>

Using Batchler.js you can add tasks 1 and 2 to a sync. request executer (exec1), and the remaining tasks from task 3 into an async. request executer (exec2). Then you can set the exec1 executer to execute exec2 when all items are complete. 

This can come in handy if you are commonly developing similar applications using common APIs.
