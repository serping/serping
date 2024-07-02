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
const data = await serping.googleSerp({q: "serping"});
console.log(data);
```

git commit -m "first commit"
git branch -M main
git remote add origin git:github-serping:serping/serping
git push -u origin main