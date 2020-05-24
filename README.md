# matomo-router5-plugin &nbsp; [![npm version](https://img.shields.io/npm/v/matomo-router5-plugin)](https://www.npmjs.com/package/matomo-router5-plugin) [![npm bundle size](https://img.shields.io/bundlephobia/min/matomo-router5-plugin)](https://bundlephobia.com/result?p=matomo-router5-plugin)

## Description

[Matomo](https://matomo.org) (formerly Piwik) integration with [router5](https://router5.js.org).


## How does it work?

`matomo-router5-plugin` will send tracking data when router5 triggers `onTransitionSuccess`. Custom tracking is also available when needed.


## What does it track?

There are a lot of tracking features in matomo, here are the **default** ones for this package.

- `setDocumentTitle` - 'from' state name as document title
- `setReferrerUrl` - 'from' state path
- `setCustomUrl` - 'to' state path
- outlinks and downloads
- page generation time


## Matomo requirements

- matomo >= 3.0.2


## NPM peer dependencies

- router5 ^7.0.0 || ^8.0.0


## Installation

```bash
npm install --save matomo-router5-plugin
```


## Usage

### initialize as router5 plugin

for additional tracking features, see [matomo guide](https://developer.matomo.org/guides/tracking-javascript-guide). These features will be tracked along with default tracking features.
```js
import matomoPlugin from "matomo-router5-plugin";

const router = createRouter();

const matomoOptions = {
  trackerUrl: "https://matomo.siteurl.com", // Required.
  siteId: 1, // Required.
  features: [], // Optional. Additional tracking features.
};

router.usePlugin(matomoPlugin(matomoOptions));
```

You can pass in a function as tracking feature. The function will be evaluated at time of tracking.

```js
features: [
  ["setUserId", () => user ? user.name : "Anonymous User"]
]
```

### custom tracking

```js
import { track } from "matomo-router5-plugin";

track({
  customUrl: "custom url", // Optional.
  referrerUrl: "custom referrer url", // Optional.
  documentTitle: "custom doc title", // Optional.
  features: [], // Optional. Additional tracking features.
});
```