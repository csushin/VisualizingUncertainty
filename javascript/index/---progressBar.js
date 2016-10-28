var progressVal = 0;
var progressBar = new ProgressBar.Line('#progressBar', {
  strokeWidth: 0.5,
  //duration: 1000,
  // color: '#31a354',
  trailColor: '#e5f5e0',
  from: {color: '#31a354'},
  to: {color: '#31a354'},
  easing: "easeOut",
  step: function(state, line) {
    line.path.setAttribute('stroke', state.color);
  }
});

