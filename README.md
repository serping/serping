# SERPING SDK

serp.ing api SDK, easy to use.

## Install

```bash
npm i serping
```

## Usage

```typescript
import Serping from 'serping';

serping = new Serping(apiKey: 'your_api_key');
const data = await serping.googleSerp({q});
console.log(data);
```

