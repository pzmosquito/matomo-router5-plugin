# matomo-router5-plugin
[Matomo](https://matomo.org) (formerly Piwik) integration with [router5](https://router5.js.org).


## How does it work

`matomo-router5-plugin` will send tracking data when router5 triggers `onTransitionSuccess`.


## What does it track?

There are a lot of options in matomo, here are the default tracking options.

- 'from' state path
- 'to' state path
- outlinks and downloads
- page generation time


## Peer Dependencies

- router5 ^7.0.0


## Installation

```bash
npm install --save matomo-router5-plugin
```


## Usage

for optional tracking features `trackingOptions`, see [matomo guide](https://developer.matomo.org/guides/tracking-javascript-guide). These features will be tracked when router5 triggers `onTransitionSuccess`.
```js
import matomoPlugin from "matomo-router5-plugin";

const router = createRouter();

const matomoSiteUrl = "https://matomo.yoursite.com";
const matomoSiteId = 1;
const trackingOptions = []; // optional tracking features

router.usePlugin(matomoPlugin(matomoSiteUrl, matomoSiteId, trackingOptions));
```
