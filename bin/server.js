#!/usr/bin/env node
// -*- javascript -*-

/******************************************************************************/
/*
 * This file is part of the package mockapie. It is subject to the
 * license terms in the LICENSE file found in the top-level directory
 * of this distribution and at git://pmade.com/mockapie/LICENSE. No
 * part of the mockapie package, including this file, may be copied,
 * modified, propagated, or distributed except according to the terms
 * contained in the LICENSE file.
*/

/******************************************************************************/
// Main entry point.
(function() {
  "use strict";

  var port = 3000,
      www  = "./www",
      data = "./data";

  var mockapie = require('../node_modules/mockapie/lib/mockapie');
  mockapie.createServer(port, www, data);
})();
