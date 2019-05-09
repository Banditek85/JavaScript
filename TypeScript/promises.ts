"use strict";

// Promises

// Pending
// Completing long running process -> Resolve
// Not completing long running process -> Reject


let performUpload = function(imgStatus: string): Promise<{imgStatus: string}> {
  
  return new Promise(resolve => {
    console.log(`Status: ${imgStatus}`);
  });
}