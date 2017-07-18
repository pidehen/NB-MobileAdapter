'use strict';

;(function () {
  var device = window.navigator.appVersion;
  var androidRE = /android/i;
  var iphoneRE = /iphone/i;

  var NBMobileAdapter = NBClass({
    initialize: function initialize(forecast) {
      this.forecast = forecast;
      this.isAndroid = androidRE.test(device);
      this.isIPhone = iphoneRE.test(device);
      this.scale = this.getScale();

      this.setMetaEle();
      this.adapter();
    },
    getScale: function getScale() {
      return this.isIPhone ? 1 / window.devicePixelRatio : 1;
    },
    setMetaEle: function setMetaEle() {
      var metaEl = document.createElement('meta');
      var content = 'initial-scale=' + this.scale + ', maximum-scale=' + this.scale + ', minimum-scale=' + this.scale + ', user-scalable=no';
      metaEl.setAttribute('name', 'viewport');
      metaEl.setAttribute('content', content);

      document.documentElement.firstElementChild.appendChild(metaEl);
    },
    adapter: function adapter() {
      var actual = window.innerWidth;
      var rem = (actual / this.forecast).toFixed(2) * 100;
      document.documentElement.style.fontSize = rem + 'px';
    }
  });

  window.NBMobileAdapter = function (forecast) {
    return new NBMobileAdapter(forecast);
  };
})();