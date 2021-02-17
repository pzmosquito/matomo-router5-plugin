const setTracking = (customUrl, referrerUrl, documentTitle, features) => {
    // track new page view
    if (customUrl) {
        window._paq.push(["setCustomUrl", customUrl]);
    }

    // track referrel page url
    if (referrerUrl) {
        window._paq.push(["setReferrerUrl", referrerUrl]);
    }

    // track state name as document title
    if (documentTitle) {
        window._paq.push(["setDocumentTitle", documentTitle]);
    }

    window._paq.push(
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
};


/**
 * custom tracking
 */
export const track = ({ customUrl = null, referrerUrl = null, documentTitle = null, features = [] }) => {
    if (!window._paq) {
        throw new Error("Matomo has not been initilized as router5 plugin.");
    }

    setTracking(customUrl, referrerUrl, documentTitle, features);
};


/**
 * router5 plugin
 */
export default ({ trackerUrl, siteId, features = [], usePiwik = true }) => () => {
    const svcName = usePiwik ? "piwik" : "matomo";
    
    if (!trackerUrl || !siteId) {
        return {};
    }

    // create piwik.js script elem
    const elem = document.createElement("script");
    elem.async = true;
    elem.defer = true;
    elem.src = `${trackerUrl}/${svcName}.js`;

    // insert piwik script tag before first script tag
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(elem, firstScript);

    // define _paq for matomo to use
    window._paq = window._paq || [];

    // set Matomo setting
    window._paq.push(
        ["setTrackerUrl", `${trackerUrl}/${svcName}.php`],
        ["setSiteId", siteId]
    );

    return {
        onTransitionSuccess: (toState, fromState) => {
            const customUrl = toState.path;
            const referrerUrl = fromState ? fromState.path : "";
            const documentTitle = toState.name;
            
            setTracking(customUrl, referrerUrl, documentTitle, features);
        }
    };
};
