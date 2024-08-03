# SERPING SDK

[serp.ing][1] api SDK, easy to use.

## Install

```bash
npm install serping
```

## Usage

```typescript
import Serping from 'serping';

// Get your free API key at https://www.serp.ing
serping = new Serping( { region: 'us-east-1', apiKey: 'your api key' } );
const data = await serping.googleSerp({q: "serping"});

console.log(data);

// Google search videos
const videos = await serping.googleSerp({q: "SEO", tbm: "vid"});

console.log(videos);
```

## TODO

- Google Search Videos **Zod Schema**

[1]:https://www.serp.ing