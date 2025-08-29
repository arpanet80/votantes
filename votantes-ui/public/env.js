(function(window) {
    window["env"] = window["env"] || {};

    /////////////////////////////////////////////////////////////////////////
    // https://pumpingco.de/blog/environment-variables-angular-docker/
    /////////////////////////////////////////////////////////////////////////
    // Environment variables

    /* Local */
    window["env"]["apiUrl"] = "http://10.51.15.41:3002/";
    window["env"]["apiUsuarios"] = "http://10.51.15.41:3001/";
    window["env"]["reportsUrl"] = "http://10.51.15.110:8123/api/reports/";
    window["env"]["filesUrl"] = "http://10.51.15.41:8123/";
    window["env"]["debug"] = true;

  })(this);
