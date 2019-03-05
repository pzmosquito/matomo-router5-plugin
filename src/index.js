export default ({siteUrl, siteId, features}) => () => {
    if (!siteUrl || !siteId) {
        return {};
    }

    // create piwik.js script elem
    const elem = document.createElement("script");
    elem.async = true;
    elem.defer = true;
    elem.src = `${siteUrl}/piwik.js`;

    // insert piwik script tag before first script tag
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(elem, firstScript);

    // define _paq for matomo to use
    window._paq = window._paq || [];
    
    // set Matomo setting
    window._paq.push(
        ["setTrackerUrl", `${siteUrl}/piwik.php`],
        ["setSiteId", siteId]
    );

    return {
        onTransitionSuccess: (toState, fromState) => {
            window._paq.push(...[
                // track new page view
                ["setCustomUrl", toState.path],

                // track referrel page url
                ["setReferrerUrl", fromState ? fromState.path : ""],

                // remove all previously assigned custom variables
                ["deleteCustomVariables", "page"],
                
                // ppdating the page generation time
                ["setGenerationTimeMs", 0],
            ].concat(features || []).concat([
                ["trackPageView"],

                // measure outlinks and downloads
                ["enableLinkTracking"]
            ]));
        }
    };
};
