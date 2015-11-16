var React = require('React');

// ignore required .scss modules
require.extensions['.scss'] = function(module, filename) {};

var Layout = require('./layout.jsx');

module.exports = function(config) {

    var renderLayout = function(markup, includeClientScript, clientState) {
        var html = React.renderToStaticMarkup(React.createElement(Layout, {
            serverMarkup: markup,
            includeClientScript: includeClientScript,
            clientState: clientState,
            assetsPath: config.assetsPath,
            gtmId: config.gtmId
        }));
        return '<!DOCTYPE html>' + html;
    }

    return function (req, res, next) {

        routeServerSide(req.url, renderServerSide, renderClientSide, config, function(err, status, redirectTo, markup, clientState) {
            req.logger.debug({
                payload: {
                    status: status,
                    redirectTo: redirectTo,
                    markup: (markup ? markup.substring(0, 40) + '...' : markup)
                }
            }, 'react router');

            switch (status) {
                case 500:
                    next(err); // step out of this middle ware.
                    break;
                case 302:
                    res.redirect(status, redirectTo)
                    break;
                case 404: // fall through
                case 200:
                    var html = renderLayout(renderServerSide ? markup : '', renderClientSide, clientState);
                    res.status(status).send(html);
                    break;
            }
        });
    };

};
