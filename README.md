# matomo-router5-plugin


## Description

[Matomo](https://matomo.org) (formerly Piwik) integration with [router5](https://router5.js.org).


## How does it work?

`matomo-router5-plugin` will send tracking data when router5 triggers `onTransitionSuccess`.


## What does it track?

There are a lot of tracking features in matomo, here are the **default** ones for this package.

- 'from' state path
- 'to' state path
- outlinks and downloads
- page generation time


## Matomo requirements

- matomo >= 3.0.2


## NPM peer dependencies

- router5 ^7.0.0


## Installation

```bash
npm install --save matomo-router5-plugin
```


## Usage

for additional tracking features, see [matomo guide](https://developer.matomo.org/guides/tracking-javascript-guide). These features will be tracked along with default tracking features.
```js
import matomoPlugin from "matomo-router5-plugin";

const router = createRouter();

const matomoOptions = {
  siteUrl: "https://matomo.yoursite.com", // Required.
  siteId: 1, // Required.
  features: [] // Optional. Additional tracking features.
};

router.usePlugin(matomoPlugin(matomoOptions));
```

You can pass in a function as tracking feature (since 0.2.0).

```js
features: [
  ["setUserId", user => user ? user.name : "Anonymous User"]
]
```