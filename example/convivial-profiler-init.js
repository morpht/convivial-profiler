(function (window, ConvivialProfiler, config) {
  window.convivialProfiler = new ConvivialProfiler(config.config, config.site, config.license_key);
  window.convivialProfiler.collect();
})(window, window.ConvivialProfiler.default, drupalSettings.convivialProfiler);
