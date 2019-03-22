export default ({siteUrl, siteId, features = []}) => () => {
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

    const enableTracking = [
        // log a visit to this page
        ["trackPageView"],

        // measure outlinks and downloads
        ["enableLinkTracking"]
    ];

    return {
        onTransitionSuccess: (toState, fromState) => {
            const defaultFeatures = [
                // track new page view
                ["setCustomUrl", toState.path],

                // track referrel page url
                ["setReferrerUrl", fromState ? fromState.path : ""],

                // remove all previously assigned custom variables
                ["deleteCustomVariables", "page"],

                // ppdating the page generation time
                ["setGenerationTimeMs", 0]
            ];

            const customFeatures = features.map(([key, val]) => {
                return [key, typeof val === "function" ? val() : val];
            });

            const tracked = defaultFeatures.concat(customFeatures).concat(enableTracking);

            window._paq.push(...tracked);
        }
    };
};
