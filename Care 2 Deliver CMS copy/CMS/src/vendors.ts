"use strict";
import "core-js/es7/reflect";
require("zone.js/dist/zone");


if (process.env.ENV === "production") {
  // Production
} else {
  // Development
  Error["stackTraceLimit"] = Infinity;
  require("zone.js/dist/long-stack-trace-zone");
}
// Angular
import "@angular/platform-browser";
import "@angular/platform-browser-dynamic";
import "@angular/core";
import "@angular/common";
import "@angular/http";
import "@angular/router";
import "@angular/forms";

// angular extras
import "angular-in-memory-web-api";

// RxJS
import "rxjs";
// other libraries
import "ng2-ckeditor";