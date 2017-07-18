;(() => {
  const device = window.navigator.appVersion;
  const androidRE = /android/i;
  const iphoneRE = /iphone/i;

  const NBMobileAdapter = NBClass({
    initialize(forecast) {
      this.forecast = forecast;
      this.isAndroid = androidRE.test(device);
      this.isIPhone = iphoneRE.test(device);
      this.scale = this.getScale();

      this.setMetaEle();
      this.adapter();
    },

    getScale() {
      return this.isIPhone ? 1 / window.devicePixelRatio : 1;
    },

    setMetaEle() {
      const metaEl = document.createElement('meta');
      const content = `initial-scale=${ this.scale }, maximum-scale=${ this.scale }, minimum-scale=${ this.scale }, user-scalable=no`;
      metaEl.setAttribute('name', 'viewport');
      metaEl.setAttribute('content', content);

      document.documentElement.firstElementChild.appendChild(metaEl);
    },

    adapter() {
      const actual = window.innerWidth;
      const rem = (actual / this.forecast).toFixed(2) * 100;
      document.documentElement.style.fontSize = `${ rem }px`;
    }
  });

  window.NBMobileAdapter = (forecast) => new NBMobileAdapter(forecast);
})();
