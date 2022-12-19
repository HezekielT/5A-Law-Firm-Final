const express = require('express');
const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  year: {
    type: Number,
  },
  month: {
    type: String,
  },
  day: {
    type: Number,
  },
  title: {
    type: String,
  },
  time: {
    type: String
  },
  detail: {
    type: String
  },
  schedule: {
    type: String
  },
  privilege: {
    type: Boolean,
  }
});

module.exports = mongoose.model("Schedule", scheduleSchema);