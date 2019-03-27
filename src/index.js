export default ({trackerUrl, siteId, features = []}) => () => {
    if (!trackerUrl || !siteId) {
        return {};
    }

    // create piwik.js script elem
    const elem = document.createElement("script");
    elem.async = true;
    elem.defer = true;
    elem.src = `${trackerUrl}/piwik.js`;

    // insert piwik script tag before first script tag
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(elem, firstScript);

    // define _paq for matomo to use
    window._paq = window._paq || [];

    // set Matomo setting
    window._paq.push(
        ["setTrackerUrl", `${trackerUrl}/piwik.php`],
        ["setSiteId", siteId]
    );

    return {
        onTransitionSuccess: (toState, fromState) => {
            // default features
            window._paq.push(
                // track new page view
                ["setCustomUrl", toState.path],

                // track referrel page url
                ["setReferrerUrl", fromState ? fromState.path : ""],

                // track state name as document title
                ["setDocumentTitle", toState.name],

                // remove all previously assigned custom variables
                ["deleteCustomVariables", "page"],

                // ppdating the page generation time
                ["setGenerationTimeMs", 0],
            );

            // optional features
            features.forEach(([key, val]) => {
                window._paq.push([key, typeof val === "function" ? val() : val]);
            });

            // start tracking
            window._paq.push(
                // log a visit to this page
                ["trackPageView"],

                // measure outlinks and downloads
                ["enableLinkTracking"],
            );
        }
    };
};
