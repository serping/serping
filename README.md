# SERPING SDK

[serp.ing][1] api SDK, easy to use.

## Install

```bash
npm install serping
```

### Install for typescript

tsconfig.json

```json
{
  "paths":{
    "@serping/*": ["./node_modules/serping/src/*"]
  }
}
```

## Usage

```typescript
import Serping from '@serping';

serping = new Serping(apiKey: 'your_api_key');
const data = await serping.googleSerp({q: "serping"});

console.log(data);
```


[1]:https://www.serp.ing