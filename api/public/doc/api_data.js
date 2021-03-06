define({ api: [
  {
    "type": "all",
    "url": "/v1",
    "title": "all controllers options",
    "version": "0.0.1",
    "name": "allOptions",
    "group": "all",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "controller",
            "optional": false,
            "description": "<p>specific controller to query</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>specific action to query</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/index.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/forgot",
    "title": "sends reset password link to users email",
    "version": "0.0.1",
    "name": "forgot",
    "group": "auth",
    "permission": "none",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>forgot object to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.email",
            "optional": false,
            "description": "<p>users email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "field": "data",
            "optional": false,
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/login",
    "title": "log in as an user",
    "version": "0.0.1",
    "name": "login",
    "group": "auth",
    "permission": "none",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>login object to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.usrnm",
            "optional": false,
            "description": "<p>users username or email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.passwd",
            "optional": false,
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.device",
            "optional": false,
            "description": "<p>users device unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>created user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/logout",
    "title": "log out and delete tokens",
    "version": "0.0.1",
    "name": "logout",
    "group": "auth",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>info object to process</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.device",
            "optional": false,
            "description": "<p>users device to logout from</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "field": "data",
            "optional": false,
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "get",
    "url": "/v1/auth/reset",
    "title": "resets password and send it to email",
    "version": "0.0.1",
    "name": "reset",
    "group": "auth",
    "permission": "none",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "token",
            "optional": false,
            "description": "<p>token to reset password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "field": "data",
            "optional": false,
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/signup",
    "title": "sign up and create an user",
    "version": "0.0.1",
    "name": "signup",
    "group": "auth",
    "permission": "none",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>user object to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.usrnm",
            "optional": false,
            "description": "<p>users username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.passwd",
            "optional": false,
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.email",
            "optional": false,
            "description": "<p>users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.device",
            "optional": false,
            "description": "<p>users device unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>created user object</p>"
          },
          {
            "group": "Success 201",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "get",
    "url": "/v1/auth/verify",
    "title": "resets password and send it to email",
    "version": "0.0.1",
    "name": "verify",
    "group": "auth",
    "permission": "none",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "token",
            "optional": false,
            "description": "<p>token to verify email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "field": "data",
            "optional": false,
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "delete",
    "url": "/v1/users/:user_id/reports/:report_id",
    "title": "delete a report",
    "version": "0.0.1",
    "name": "deleteReprtById",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "report_id",
            "optional": false,
            "description": "<p>post unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "field": "data",
            "optional": false,
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id/reports/:report_id",
    "title": "retrieve a report",
    "version": "0.0.1",
    "name": "findReprtById",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "report_id",
            "optional": false,
            "description": "<p>report unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>report object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id/reports",
    "title": "list reports from user",
    "version": "0.0.1",
    "name": "findReprts",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>number of page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data",
            "optional": false,
            "description": "<p>array of report objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "post",
    "url": "/v1/users/:user_id/reports",
    "title": "create a share report",
    "version": "0.0.1",
    "name": "insertReprt",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>request body</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.date",
            "optional": false,
            "description": "<p>date of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.time",
            "optional": false,
            "description": "<p>how many hours are being reported</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.description",
            "optional": false,
            "description": "<p>report description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>report object</p>"
          },
          {
            "group": "Success 201",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "patch",
    "url": "/v1/users/:user_id/reports/:report_id",
    "title": "partially update a report",
    "version": "0.0.1",
    "name": "patchReprt",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "report_id",
            "optional": false,
            "description": "<p>reports unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>request body</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.date",
            "optional": false,
            "description": "<p>date of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.time",
            "optional": false,
            "description": "<p>how many hours are being reported</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.description",
            "optional": false,
            "description": "<p>report description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>report object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "options",
    "url": "/v1/users/:user_id/reports/:report_id",
    "title": "specific report options",
    "version": "0.0.1",
    "name": "reportOptions",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "report_id",
            "optional": false,
            "description": "<p>report unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "options",
    "url": "/v1/users/:user_id/reports",
    "title": "report options",
    "version": "0.0.1",
    "name": "reportsOptions",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "put",
    "url": "/v1/users/:user_id/reports/:report_id",
    "title": "update a report",
    "version": "0.0.1",
    "name": "updateReprt",
    "group": "reports",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "report_id",
            "optional": false,
            "description": "<p>reports unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>request body</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.date",
            "optional": false,
            "description": "<p>date of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.time",
            "optional": false,
            "description": "<p>how many hours are being reported</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "body.description",
            "optional": false,
            "description": "<p>report description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>report object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/reports.js"
  },
  {
    "type": "delete",
    "url": "/v1/users/:user_id",
    "title": "delete an user",
    "version": "0.0.1",
    "name": "deleteUsrById",
    "group": "users",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "field": "data",
            "optional": false,
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js"
  },
  {
    "type": "patch",
    "url": "/v1/users/:user_id",
    "title": "partially update an user",
    "version": "0.0.1",
    "name": "patchUsr",
    "group": "users",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>user object to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.usrnm",
            "optional": false,
            "description": "<p>users username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.old_passwd",
            "optional": false,
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.new_passwd",
            "optional": false,
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.email",
            "optional": false,
            "description": "<p>users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.name",
            "optional": false,
            "description": "<p>users name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.img",
            "optional": false,
            "description": "<p>base64 encoded image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.avatar_url",
            "optional": false,
            "description": "<p>external url or no_avatar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js"
  },
  {
    "type": "put",
    "url": "/v1/users/:user_id",
    "title": "update an user",
    "version": "0.0.1",
    "name": "updateUsr",
    "group": "users",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "body",
            "optional": false,
            "description": "<p>user object to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.usrnm",
            "optional": false,
            "description": "<p>users username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.old_passwd",
            "optional": false,
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.new_passwd",
            "optional": false,
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.email",
            "optional": false,
            "description": "<p>users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.name",
            "optional": false,
            "description": "<p>users name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.img",
            "optional": false,
            "description": "<p>base64 encoded image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "body.avatar_url",
            "optional": false,
            "description": "<p>external url or no_avatar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js"
  },
  {
    "type": "options",
    "url": "/v1/users/:user_id",
    "title": "specific user options",
    "version": "0.0.1",
    "name": "userOptions",
    "group": "users",
    "permission": "user has to have a token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "field": "user_id",
            "optional": false,
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js"
  },
  {
    "type": "options",
    "url": "/v1/users",
    "title": "user options",
    "version": "0.0.1",
    "name": "usersOptions",
    "group": "users",
    "permission": "user has to have a token",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "action",
            "optional": false,
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "links",
            "optional": false,
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "auth",
            "optional": false,
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js"
  }
] });